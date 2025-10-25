# 🚀 Guia de Deploy - ENEM Turbo 2025

Este guia mostra como fazer deploy da aplicação ENEM Turbo em diferentes plataformas usando GitHub.

## 📋 Pré-requisitos

1. ✅ Conta no GitHub
2. ✅ Código versionado no GitHub
3. ✅ Variáveis de ambiente configuradas (veja `.env.example`)

---

## 🎯 Opção 1: Render (100% GRATUITO - RECOMENDADO)

### Por que Render?
- ✅ Totalmente gratuito
- ✅ PostgreSQL grátis incluído
- ✅ SSL automático (HTTPS)
- ✅ Deploy automático via GitHub
- ✅ Perfeito para aplicações Node.js

### Passo a Passo:

#### 1. Criar conta no Render
- Acesse: https://render.com
- Clique em "Get Started for Free"
- Conecte sua conta GitHub

#### 2. Criar PostgreSQL Database

1. No dashboard, clique em "New +"
2. Selecione "PostgreSQL"
3. Configure:
   - **Name:** enem-turbo-db
   - **Database:** enemturbo
   - **User:** enemturbo
   - **Region:** Oregon (ou mais próximo)
   - **Plan:** Free
4. Clique em "Create Database"
5. **IMPORTANTE:** Copie a "External Database URL" - você vai usar depois

#### 3. Criar Web Service

1. No dashboard, clique em "New +"
2. Selecione "Web Service"
3. Conecte seu repositório GitHub
4. Configure:
   - **Name:** enem-turbo-2025
   - **Region:** Oregon (mesma do banco)
   - **Branch:** main (ou master)
   - **Root Directory:** (deixe vazio)
   - **Runtime:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Plan:** Free

#### 4. Adicionar Variáveis de Ambiente

Na seção "Environment Variables", adicione:

```bash
DATABASE_URL=postgresql://... (a URL que você copiou)
NODE_ENV=production
INVICTUS_LINK_BASICO=https://go.invictuspay.app.br/zxc1otywq0
INVICTUS_LINK_COMPLETO=https://go.invictuspay.app.br/zglneku5mq
INVICTUS_LINK_PREMIUM=https://go.invictuspay.app.br/fzc2zrighx
INVICTUS_LINK_REDACAO=https://go.invictuspay.app.br/8dend2jf4c
INVICTUS_LINK_PREMIUM_REDACAO=https://go.invictuspay.app.br/eanzct8ela
```

**IMPORTANTE:** Use seus próprios links da Invictus Pay!

#### 5. Deploy

1. Clique em "Create Web Service"
2. Aguarde 2-5 minutos
3. Seu site estará no ar em: `https://enem-turbo-2025.onrender.com`

#### 6. Configurar Webhook na Invictus Pay

1. Acesse o painel da Invictus Pay
2. Vá em **Integrações** → **Webhooks**
3. Adicione: `https://enem-turbo-2025.onrender.com/webhook/invictuspay`
4. Selecione todos os eventos de pagamento
5. Salve

#### 7. Testar

1. Acesse seu site
2. Vá em `/checkout`
3. Teste uma compra (use ambiente de testes da Invictus)

---

## 🌐 Opção 2: Vercel (Bom para Frontend)

### Limitações:
⚠️ Vercel é melhor para sites estáticos ou serverless
⚠️ Não é ideal para aplicações Express completas
⚠️ Precisa adaptar para funções serverless

### Deploy:

```bash
npm i -g vercel
vercel login
vercel --prod
```

**Adicione variáveis de ambiente no dashboard da Vercel**

---

## 📦 Opção 3: Railway

### Características:
- $5 de crédito grátis por mês
- PostgreSQL incluído
- Deploy via GitHub

### Passo a Passo:

1. Acesse: https://railway.app
2. Conecte sua conta GitHub
3. Clique em "New Project"
4. Selecione "Deploy from GitHub repo"
5. Escolha seu repositório
6. Railway detectará automaticamente Node.js
7. Adicione um PostgreSQL:
   - Clique em "New"
   - Selecione "Database" → "PostgreSQL"
   - Railway criará automaticamente a variável `DATABASE_URL`
8. Adicione as outras variáveis de ambiente
9. Deploy será automático

---

## 🔄 Deploy Automático

Todas as plataformas suportam deploy automático:

1. Faça alterações no código
2. Commit e push para GitHub:
   ```bash
   git add .
   git commit -m "Atualização do site"
   git push origin main
   ```
3. A plataforma fará deploy automaticamente

---

## 🗄️ Banco de Dados

### Após o primeiro deploy, execute as migrações:

**No Render:**
1. Vá no seu Web Service
2. Clique em "Shell"
3. Execute:
   ```bash
   npm run db:push
   ```

**Ou use a DATABASE_URL localmente:**
```bash
DATABASE_URL="sua_url_aqui" npm run db:push
```

---

## 🛠️ Troubleshooting

### Site não abre
- ✅ Verifique os logs no dashboard da plataforma
- ✅ Confirme que `npm start` está configurado
- ✅ Verifique se `PORT` está correto (Render usa porta automática)

### Erro de banco de dados
- ✅ Confirme que `DATABASE_URL` está configurada
- ✅ Execute `npm run db:push`
- ✅ Verifique conexão no painel do banco

### Pagamentos não funcionam
- ✅ Verifique os links da Invictus Pay
- ✅ Configure o webhook corretamente
- ✅ Teste em ambiente de sandbox primeiro

### Deploy falha no build
- ✅ Teste `npm run build` localmente
- ✅ Verifique erros de TypeScript
- ✅ Confirme que todas as dependências estão no `package.json`

---

## 📊 Monitoramento

### Render
- Acesse logs em tempo real no dashboard
- Configure alertas de uptime
- Monitore uso de memória/CPU

### Uptime Monitoring (Grátis)
- Use: https://uptimerobot.com
- Monitora se seu site está online
- Envia alertas se cair

---

## 🎉 Pronto!

Seu site ENEM Turbo está no ar e pronto para vender!

**Próximos passos:**
1. ✅ Configure domínio personalizado (opcional)
2. ✅ Teste todo o fluxo de compra
3. ✅ Configure backup do banco de dados
4. ✅ Monitore vendas e acessos

---

**Precisa de ajuda?** Consulte a documentação da plataforma escolhida ou os arquivos:
- `README.md` - Documentação geral
- `INVICTUS_PAY_SETUP.md` - Configuração de pagamentos
- `CHECKLIST_PROJETO.md` - Features do projeto
