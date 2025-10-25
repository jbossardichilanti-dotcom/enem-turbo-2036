import { Handler } from '@netlify/functions';
import { z } from 'zod';
import { getInvictusCheckoutLink } from '../../shared/invictus-config';
import { storage } from '../../server/storage';

const createInvictusCheckoutSchema = z.object({
  plan: z.string().min(1),
  amount: z.string().regex(/^\d+\.?\d*$/),
  addRedacao: z.boolean().optional().default(false),
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const validatedData = createInvictusCheckoutSchema.parse(body);
    const { plan, amount, addRedacao } = validatedData;
    
    const downloadToken = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    
    const finalPlan = addRedacao ? `${plan}+redacao` : plan;
    const checkoutLink = getInvictusCheckoutLink(finalPlan);
    
    if (!checkoutLink || checkoutLink.includes('SEU_LINK')) {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: `Link de checkout não configurado para ${finalPlan}. Configure os links da Invictus Pay nas variáveis de ambiente.` 
        }),
      };
    }
    
    const checkoutUrl = `${checkoutLink}?metadata=${encodeURIComponent(downloadToken)}`;
    
    const payment = await storage.createPayment({
      status: 'pending',
      plan: finalPlan,
      amount,
      downloadToken,
      invictusPayTransactionId: null,
      paymentMethod: null,
      customerEmail: null,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        paymentId: payment.id,
        checkoutUrl,
        downloadToken: payment.downloadToken,
      }),
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Dados inválidos', details: error.errors }),
      };
    }
    console.error('Erro ao criar checkout:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao criar checkout' }),
    };
  }
};
