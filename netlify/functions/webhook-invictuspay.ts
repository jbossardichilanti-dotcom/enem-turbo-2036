import { Handler } from '@netlify/functions';
import { z } from 'zod';
import { storage } from '../../server/storage';

const invictusWebhookSchema = z.object({
  transaction: z.object({
    id: z.string(),
    status: z.string(),
    method: z.string().optional(),
    amount: z.string().optional(),
  }),
  customer: z.object({
    email: z.string().optional(),
    name: z.string().optional(),
  }).optional(),
  token: z.string().optional(),
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const notification = JSON.parse(event.body || '{}');
    console.log('Webhook Invictus Pay recebido:', JSON.stringify(notification, null, 2));

    const validatedWebhook = invictusWebhookSchema.safeParse(notification);
    
    if (!validatedWebhook.success) {
      console.error('Webhook inválido:', validatedWebhook.error);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Payload inválido' }),
      };
    }

    const { transaction, customer, token } = validatedWebhook.data;
    const transaction_id = transaction.id;
    const status = transaction.status;
    
    let payment = await storage.getPaymentByInvictusTransactionId(transaction_id);
    
    if (!payment && token) {
      payment = await storage.getPaymentByToken(token);
    }
    
    if (payment) {
      if (payment.invictusPayTransactionId !== transaction_id) {
        await storage.updatePaymentTransactionId(payment.id, transaction_id);
        console.log(`🔄 Atualizado transactionId: ${transaction_id}`);
      }

      const statusMap: { [key: string]: string } = {
        'paid': 'approved',
        'waiting_payment': 'pending',
        'refused': 'rejected',
        'canceled': 'canceled',
        'refunded': 'refunded',
        'chargeback': 'charged_back',
      };

      const mappedStatus = statusMap[status] || status.toLowerCase();
      
      await storage.updatePaymentStatus(payment.id, mappedStatus);
      console.log(`✅ Pagamento ${payment.id} atualizado para: ${mappedStatus}`);
    } else {
      console.log(`⚠️ Pagamento não encontrado para transaction_id: ${transaction_id}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'ok' }),
    };
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'error', message: 'Processed with errors' }),
    };
  }
};
