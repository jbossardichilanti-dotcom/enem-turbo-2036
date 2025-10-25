import { Handler } from '@netlify/functions';
import { storage } from '../../server/storage';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const downloadToken = `demo-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    
    const payment = await storage.createPayment({
      status: 'approved',
      plan: 'demo',
      amount: '0.00',
      downloadToken,
      invictusPayTransactionId: null,
      paymentMethod: null,
      customerEmail: null,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        downloadToken: payment.downloadToken,
        downloadUrl: `/download?token=${payment.downloadToken}`,
        directPdfUrl: `/.netlify/functions/download-synopsis?token=${payment.downloadToken}`
      }),
    };
  } catch (error) {
    console.error('Erro ao criar token demo:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao criar token demo' }),
    };
  }
};
