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
    const token = event.queryStringParameters?.token;
    
    if (!token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ valid: false, error: 'Token não fornecido' }),
      };
    }

    const payment = await storage.getPaymentByToken(token);
    
    if (!payment) {
      return {
        statusCode: 404,
        body: JSON.stringify({ valid: false, error: 'Token inválido' }),
      };
    }

    if (payment.status !== 'approved') {
      return {
        statusCode: 403,
        body: JSON.stringify({ valid: false, error: 'Pagamento não aprovado' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ valid: true, plan: payment.plan }),
    };
  } catch (error) {
    console.error('Erro ao validar token:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ valid: false, error: 'Erro ao validar token' }),
    };
  }
};
