# 🎓 ENEM Turbo 2025

Plataforma digital de venda de materiais de estudo para o ENEM com sistema completo de pagamentos e entrega de conteúdo.

## 📋 Sobre o Projeto

ENEM Turbo 2025 é uma landing page otimizada para conversão que oferece sinopses, guias e materiais de estudo completos para o ENEM. Inclui:

- ✅ Landing page moderna e responsiva
- ✅ Sistema de checkout integrado com Invictus Pay
- ✅ 3 planos disponíveis (Básico, Completo, Premium)
- ✅ Add-on de Redação ENEM
- ✅ Garantia de 5 dias
- ✅ Visualizador de conteúdo interativo
- ✅ Download em PDF protegido por token
- ✅ Sistema de webhooks para atualização automática
- ✅ 14+ matérias com 269 linhas de conteúdo educacional

## 🚀 Deploy Rápido

### Opção 1: Render (Gratuito - Recomendado)

1. Crie uma conta no [Render.com](https://render.com)
2. Conecte seu repositório GitHub
3. Clique em "New Web Service"
4. Configure:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Environment:** Node
5. Adicione as variáveis de ambiente (veja `.env.example`)
6. Clique em "Create Web Service"

**Banco de Dados:**
- No Render, crie um PostgreSQL Database (gratuito)
- Copie a `DATABASE_URL` e adicione nas variáveis de ambiente

### Opção 2: Vercel

```bash
npm i -g vercel
vercel login
vercel
```

### Opção 3: Netlify

```bash
npm i -g netlify-cli
netlify login
netlify deploy --prod
```

## 🛠️ Instalação Local

```bash
# Clone o repositório
git clone https://github.com/SEU_USUARIO/enem-turbo-2025.git
cd enem-turbo-2025

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# Execute as migrações do banco
npm run db:push

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse: `http://localhost:5000`

## 📦 Variáveis de Ambiente Obrigatórias

Crie um arquivo `.env` baseado no `.env.example`:

```bash
DATABASE_URL=postgresql://...           # URL do PostgreSQL
INVICTUS_LINK_BASICO=https://...       # Link de checkout do plano Básico
INVICTUS_LINK_COMPLETO=https://...     # Link de checkout do plano Completo
INVICTUS_LINK_PREMIUM=https://...      # Link de checkout do plano Premium
INVICTUS_LINK_REDACAO=https://...      # Link de checkout da Redação
```

**Consulte `INVICTUS_PAY_SETUP.md` para configurar os links de pagamento.**

## 🗄️ Banco de Dados

O projeto usa PostgreSQL com Drizzle ORM.

**Para criar/atualizar o schema:**
```bash
npm run db:push
```

**Importante:** Configure a `DATABASE_URL` nas variáveis de ambiente antes.

## 🔔 Configurar Webhook Invictus Pay

Após o deploy, configure o webhook na Invictus Pay:

**URL do Webhook:**
```
https://SEU_DOMINIO.com/webhook/invictuspay
```

**Eventos:** Pago, Aguardando Pagamento, Recusado, Cancelado, Reembolsado

## 📂 Estrutura do Projeto

```
├── client/              # Frontend React + TypeScript
│   ├── src/
│   │   ├── components/  # Componentes UI
│   │   ├── pages/       # Páginas da aplicação
│   │   └── lib/         # Utilitários
├── server/              # Backend Express
│   ├── routes.ts        # Rotas da API
│   └── storage.ts       # Camada de dados
├── shared/              # Código compartilhado
│   ├── schema.ts        # Schemas Drizzle
│   ├── content.ts       # Conteúdo educacional
│   └── invictus-config.ts  # Config pagamentos
└── netlify/             # Funções serverless (Netlify)
```

## 💳 Planos Disponíveis

| Plano | Preço | Desconto |
|-------|-------|----------|
| Pack Básico | R$ 26,90 | de R$ 47,90 |
| Pack Completo | R$ 59,65 | de R$ 97,90 |
| Pack Premium | R$ 79,55 | de R$ 147,90 |
| Add-on Redação | + R$ 19,90 | de R$ 39,90 |

## 🔒 Garantia

- **5 dias** de garantia incondicional
- Reembolso sem perguntas
- Página de termos: `/termos`

## 🧪 Scripts Disponíveis

```bash
npm run dev      # Desenvolvimento (porta 5000)
npm run build    # Build para produção
npm start        # Inicia servidor de produção
npm run check    # Verifica TypeScript
npm run db:push  # Atualiza schema do banco
```

## 🌐 Tecnologias

**Frontend:**
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- Wouter (rotas)
- TanStack Query

**Backend:**
- Node.js + Express
- PostgreSQL
- Drizzle ORM
- PDFKit (geração de PDFs)

**Pagamentos:**
- Invictus Pay

## 📞 Suporte

Para dúvidas sobre configuração, consulte:
- `INVICTUS_PAY_SETUP.md` - Configuração de pagamentos
- `CHECKLIST_PROJETO.md` - Status do projeto

## 📄 Licença

MIT License - Todos os direitos reservados © 2025 ENEM Turbo

---

**Desenvolvido com ❤️ para ajudar estudantes a alcançarem seus objetivos no ENEM**
