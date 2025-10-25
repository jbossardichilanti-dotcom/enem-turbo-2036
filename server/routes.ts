import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import PDFDocument from "pdfkit";
import { getFullSynopsis } from "@shared/content";
import { z } from "zod";
import { getInvictusCheckoutLink } from "@shared/invictus-config";

const createInvictusCheckoutSchema = z.object({
  plan: z.string().min(1),
  amount: z.string().regex(/^\d+\.?\d*$/),
  addRedacao: z.boolean().optional().default(false),
});

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

export async function registerRoutes(app: Express): Promise<Server> {
  // Download do projeto em ZIP
  app.get("/download-projeto-zip", (req, res) => {
    const filePath = "./BAIXAR-PROJETO/enem-turbo-netlify.zip";
    res.download(filePath, "enem-turbo-netlify.zip", (err) => {
      if (err) {
        console.error("Erro ao fazer download:", err);
        res.status(500).send("Erro ao baixar o arquivo");
      }
    });
  });

  // Criar checkout com Invictus Pay
  app.post("/api/create-invictus-checkout", async (req, res) => {
    try {
      const validatedData = createInvictusCheckoutSchema.parse(req.body);
      const { plan, amount, addRedacao } = validatedData;
      
      const downloadToken = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
      
      const finalPlan = addRedacao ? `${plan}+redacao` : plan;
      const checkoutLink = getInvictusCheckoutLink(finalPlan);
      
      if (!checkoutLink || checkoutLink.includes('SEU_LINK')) {
        return res.status(500).json({ 
          error: `Link de checkout não configurado para ${finalPlan}. Configure os links da Invictus Pay nas variáveis de ambiente.` 
        });
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

      res.json({
        paymentId: payment.id,
        checkoutUrl,
        downloadToken: payment.downloadToken,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Dados inválidos', details: error.errors });
      }
      console.error('Erro ao criar checkout:', error);
      res.status(500).json({ error: 'Erro ao criar checkout' });
    }
  });

  // Webhook da Invictus Pay
  app.post("/webhook/invictuspay", async (req, res) => {
    try {
      const notification = req.body;
      console.log('Webhook Invictus Pay recebido:', JSON.stringify(notification, null, 2));

      const validatedWebhook = invictusWebhookSchema.safeParse(notification);
      
      if (!validatedWebhook.success) {
        console.error('Webhook inválido:', validatedWebhook.error);
        return res.status(400).json({ error: 'Payload inválido' });
      }

      const { transaction, customer, token } = validatedWebhook.data;
      const transaction_id = transaction.id;
      const status = transaction.status;
      const method = transaction.method;
      
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

      res.status(200).json({ status: 'ok' });
    } catch (error) {
      console.error('Erro ao processar webhook:', error);
      res.status(200).json({ status: 'error', message: 'Processed with errors' });
    }
  });
  
  // ROTA DE TESTE - Gerar token de demonstração
  app.get("/api/demo-token", async (req, res) => {
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

      res.json({
        downloadToken: payment.downloadToken,
        downloadUrl: `/download?token=${payment.downloadToken}`,
        directPdfUrl: `/api/download-synopsis?token=${payment.downloadToken}`
      });
    } catch (error) {
      console.error('Erro ao criar token demo:', error);
      res.status(500).json({ error: 'Erro ao criar token demo' });
    }
  });

  /* ROTAS ANTIGAS DO MERCADO PAGO - DESABILITADAS
  app.post("/api/create-payment", async (req, res) => {
    ...código comentado...
  });
  */

  // Validar token de download
  app.get("/api/validate-token", async (req, res) => {
    try {
      const token = req.query.token as string;
      
      if (!token) {
        return res.status(400).json({ valid: false, error: 'Token não fornecido' });
      }

      const payment = await storage.getPaymentByToken(token);
      
      if (!payment) {
        return res.status(404).json({ valid: false, error: 'Token inválido' });
      }

      if (payment.status !== 'approved') {
        return res.status(403).json({ valid: false, error: 'Pagamento não aprovado' });
      }

      res.json({ valid: true, plan: payment.plan });
    } catch (error) {
      console.error('Erro ao validar token:', error);
      res.status(500).json({ valid: false, error: 'Erro ao validar token' });
    }
  });

  /* ROTAS ANTIGAS DO MERCADO PAGO - DESABILITADAS
  app.get("/api/payment-status/:mercadoPagoId", ...);
  app.post("/webhook/mercadopago", ...);
  */

  // Rota protegida para gerar PDF com as sinopses
  app.get("/api/download-synopsis", async (req, res) => {
    try {
      const token = req.query.token as string;
      
      if (!token) {
        return res.status(401).json({ error: 'Token de download não fornecido' });
      }

      // Verificar se o token é válido e o pagamento foi aprovado
      const payment = await storage.getPaymentByToken(token);
      
      if (!payment || payment.status !== 'approved') {
        return res.status(403).json({ error: 'Acesso negado. Pagamento não aprovado.' });
      }

      const doc = new PDFDocument({ 
        size: 'A4',
        margins: { top: 50, bottom: 50, left: 50, right: 50 }
      });

      // Configurar headers para download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=enem-turbo-sinopses.pdf');

      // Pipe do PDF para a resposta
      doc.pipe(res);

      // Título principal
      doc.fontSize(24)
         .font('Helvetica-Bold')
         .text('ENEM Turbo - Sinopses Completas', { align: 'center' });
      
      doc.moveDown();
      doc.fontSize(12)
         .font('Helvetica')
         .text('Material de Estudo para o ENEM', { align: 'center' });
      
      doc.moveDown(2);

      const synopsis = getFullSynopsis();

      // Agrupar por subject
      const groupedBySubject: { [key: string]: typeof synopsis } = {};
      synopsis.forEach(item => {
        if (!groupedBySubject[item.subject]) {
          groupedBySubject[item.subject] = [];
        }
        groupedBySubject[item.subject].push(item);
      });

      // Gerar conteúdo para cada área
      Object.entries(groupedBySubject).forEach(([subject, items]) => {
        // Título da matéria principal
        doc.addPage()
           .fontSize(20)
           .font('Helvetica-Bold')
           .fillColor('#2563eb')
           .text(subject.toUpperCase(), { align: 'center' });
        
        doc.moveDown(1.5);

        items.forEach(item => {
          // Subtítulo da área
          doc.fontSize(16)
             .font('Helvetica-Bold')
             .fillColor('#000000')
             .text(item.area);
          
          doc.moveDown(0.5);

          // Tópicos
          item.topics.forEach(topic => {
            // Título do tópico
            doc.fontSize(14)
               .font('Helvetica-Bold')
               .fillColor('#4b5563')
               .text(topic.title);
            
            doc.moveDown(0.3);
            
            // Conteúdo principal
            doc.fontSize(10)
               .font('Helvetica')
               .fillColor('#000000')
               .text(topic.content, { align: 'justify' });
            
            doc.moveDown(0.5);
            
            // Fórmulas (se houver)
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
            
            // Exemplos (se houver)
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
            
            // Dicas ENEM (se houver)
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
            
            // Links de videoaulas (se houver)
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

      // Rodapé
      doc.fontSize(10)
         .font('Helvetica')
         .fillColor('#6b7280')
         .text('© ENEM Turbo - Todos os direitos reservados', { align: 'center' });

      doc.end();
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      res.status(500).json({ error: 'Erro ao gerar PDF' });
    }
  });

  app.get("/download-projeto-completo", (req, res) => {
    const path = require('path');
    const filePath = path.join(__dirname, '../public/enem-turbo-completo.zip');
    res.download(filePath, 'enem-turbo-completo.zip', (err) => {
      if (err) {
        console.error('Erro ao fazer download:', err);
        res.status(500).json({ error: 'Erro ao fazer download do arquivo' });
      }
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
