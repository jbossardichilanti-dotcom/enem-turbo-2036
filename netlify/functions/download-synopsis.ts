import { Handler, HandlerResponse } from '@netlify/functions';
import { storage } from '../../server/storage';
import PDFDocument from 'pdfkit';
import { getFullSynopsis } from '../../shared/content';

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
        statusCode: 401,
        body: JSON.stringify({ error: 'Token de download não fornecido' }),
      };
    }

    const payment = await storage.getPaymentByToken(token);
    
    if (!payment || payment.status !== 'approved') {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'Acesso negado. Pagamento não aprovado.' }),
      };
    }

    return new Promise<HandlerResponse>((resolve) => {
      const doc = new PDFDocument({ 
        size: 'A4',
        margins: { top: 50, bottom: 50, left: 50, right: 50 }
      });

      const chunks: Buffer[] = [];
      
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(chunks);
        resolve({
          statusCode: 200,
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=enem-turbo-sinopses.pdf',
          },
          body: pdfBuffer.toString('base64'),
          isBase64Encoded: true,
        });
      });

      doc.fontSize(24)
         .font('Helvetica-Bold')
         .text('ENEM Turbo - Sinopses Completas', { align: 'center' });
      
      doc.moveDown();
      doc.fontSize(12)
         .font('Helvetica')
         .text('Material de Estudo para o ENEM', { align: 'center' });
      
      doc.moveDown(2);

      const synopsis = getFullSynopsis();

      const groupedBySubject: { [key: string]: typeof synopsis } = {};
      synopsis.forEach(item => {
        if (!groupedBySubject[item.subject]) {
          groupedBySubject[item.subject] = [];
        }
        groupedBySubject[item.subject].push(item);
      });

      Object.entries(groupedBySubject).forEach(([subject, items]) => {
        doc.addPage()
           .fontSize(20)
           .font('Helvetica-Bold')
           .fillColor('#2563eb')
           .text(subject.toUpperCase(), { align: 'center' });
        
        doc.moveDown(1.5);

        items.forEach(item => {
          doc.fontSize(16)
             .font('Helvetica-Bold')
             .fillColor('#000000')
             .text(item.area);
          
          doc.moveDown(0.5);

          item.topics.forEach(topic => {
            doc.fontSize(14)
               .font('Helvetica-Bold')
               .fillColor('#4b5563')
               .text(topic.title);
            
            doc.moveDown(0.3);
            
            doc.fontSize(10)
               .font('Helvetica')
               .fillColor('#000000')
               .text(topic.content, { align: 'justify' });
            
            doc.moveDown(0.5);
            
            if (topic.formulas) {
              doc.fontSize(10)
                 .font('Helvetica-Bold')
                 .fillColor('#7c3aed')
                 .text('📐 Fórmulas Importantes:', { continued: false });
              doc.fontSize(9)
                 .font('Courier')
                 .fillColor('#000000')
                 .text(topic.formulas, { align: 'left' });
              doc.moveDown(0.5);
            }
            
            if (topic.examples) {
              doc.fontSize(10)
                 .font('Helvetica-Bold')
                 .fillColor('#059669')
                 .text('💡 Exemplos:', { continued: false });
              doc.fontSize(9)
                 .font('Helvetica')
                 .fillColor('#000000')
                 .text(topic.examples, { align: 'justify' });
              doc.moveDown(0.5);
            }
            
            if (topic.tips) {
              doc.fontSize(10)
                 .font('Helvetica-Bold')
                 .fillColor('#dc2626')
                 .text('🎯 ' + topic.tips.split(':')[0] + ':', { continued: false });
              doc.fontSize(9)
                 .font('Helvetica-Oblique')
                 .fillColor('#000000')
                 .text(topic.tips.split(':').slice(1).join(':').trim(), { align: 'justify' });
              doc.moveDown(0.5);
            }
            
            if (topic.videoLinks) {
              doc.fontSize(9)
                 .font('Helvetica-Bold')
                 .fillColor('#2563eb')
                 .text('🎥 ' + topic.videoLinks, { align: 'left' });
              doc.moveDown(0.5);
            }
            
            doc.moveDown(0.8);
          });

          doc.moveDown(1);
        });
      });

      doc.fontSize(10)
         .font('Helvetica')
         .fillColor('#6b7280')
         .text('© ENEM Turbo - Todos os direitos reservados', { align: 'center' });

      doc.end();
    });
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao gerar PDF' }),
    };
  }
};
