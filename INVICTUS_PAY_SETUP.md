# 🚀 Configuração da Invictus Pay

Este guia explica como configurar a integração com a Invictus Pay no seu sistema ENEM Turbo.

## 📋 Passo 1: Criar Produtos na Invictus Pay

1. Acesse seu painel da Invictus Pay
2. Crie os seguintes produtos:

### Produtos Simples:
- **ENEM Turbo - Básico**: R$ 26,90
- **ENEM Turbo - Completo**: R$ 59,65
- **ENEM Turbo - Premium**: R$ 79,55
- **Pack Redação Nota 1000**: R$ 19,90

### Produtos Combo (Plano + Redação):
- **ENEM Turbo - Básico + Redação**: R$ 46,80 (26,90 + 19,90)
- **ENEM Turbo - Completo + Redação**: R$ 79,55 (59,65 + 19,90)
- **ENEM Turbo - Premium + Redação**: R$ 99,45 (79,55 + 19,90)

3. **Importante**: Ao criar cada produto, a Invictus Pay vai gerar um **link de checkout**. Salve esses links!

## 🔗 Passo 2: Configurar os Links no Sistema

### Opção A: Usando Variáveis de Ambiente (Recomendado)

No Replit, adicione as seguintes variáveis de ambiente em "Secrets":

**Produtos Simples:**
```
INVICTUS_LINK_BASICO=https://pay.invictuspay.com.br/SEU_LINK_AQUI
INVICTUS_LINK_COMPLETO=https://pay.invictuspay.com.br/SEU_LINK_AQUI
INVICTUS_LINK_PREMIUM=https://pay.invictuspay.com.br/SEU_LINK_AQUI
INVICTUS_LINK_REDACAO=https://pay.invictuspay.com.br/SEU_LINK_AQUI
```

**Produtos Combo (com Redação):**
```
INVICTUS_LINK_BASICO_REDACAO=https://pay.invictuspay.com.br/SEU_LINK_AQUI
INVICTUS_LINK_COMPLETO_REDACAO=https://pay.invictuspay.com.br/SEU_LINK_AQUI
INVICTUS_LINK_PREMIUM_REDACAO=https://pay.invictuspay.com.br/SEU_LINK_AQUI
```

### Opção B: Editando o Arquivo de Configuração

Abra o arquivo `shared/invictus-config.ts` e substitua os links:

```typescript
export const INVICTUS_PAY_LINKS = {
  // Produtos simples
  basico: "https://pay.invictuspay.com.br/SEU_LINK_BASICO",
  completo: "https://pay.invictuspay.com.br/SEU_LINK_COMPLETO",
  premium: "https://pay.invictuspay.com.br/SEU_LINK_PREMIUM",
  redacao: "https://pay.invictuspay.com.br/SEU_LINK_REDACAO",
  
  // Produtos combo (com redação)
  "basico+redacao": "https://pay.invictuspay.com.br/SEU_LINK_BASICO_REDACAO",
  "completo+redacao": "https://pay.invictuspay.com.br/SEU_LINK_COMPLETO_REDACAO",
  "premium+redacao": "https://pay.invictuspay.com.br/SEU_LINK_PREMIUM_REDACAO",
} as const;
```

## 🔔 Passo 3: Configurar Webhook na Invictus Pay

1. No painel da Invictus Pay, vá em **Integrações** → **Webhooks**
2. Adicione uma nova URL de Postback:

```
https://SEU_DOMINIO.replit.app/webhook/invictuspay
```

**Substitua `SEU_DOMINIO` pelo domínio real da sua aplicação!**

3. Selecione os eventos:
   - ✅ **Métodos de Pagamento**: Cartão de Crédito, Boleto, PIX
   - ✅ **Status**: Pago, Aguardando Pagamento, Recusado, Cancelado

4. Clique em **Adicionar**

## ✅ Passo 4: Testar

1. Acesse sua aplicação
2. Vá em `/checkout`
3. Selecione um plano
4. Clique em "Finalizar Compra"
5. Você deve ser redirecionado para o checkout da Invictus Pay

## 📊 Como Funciona

### Fluxo de Pagamento:

1. **Cliente escolhe plano** → Sistema gera token único
2. **Redireciona para Invictus Pay** → Cliente paga
3. **Invictus Pay processa** → Envia webhook
4. **Sistema recebe webhook** → Atualiza status
5. **Cliente acessa materiais** → Com token válido

### Estrutura do Webhook:

A Invictus Pay enviará dados neste formato:

```json
{
  "transaction_id": "abc123",
  "status": "Pago",
  "method": "pix",
  "total_price": "59.65",
  "customer": {
    "email": "cliente@email.com",
    "name": "João Silva"
  },
  "metadata": "TOKEN_DO_DOWNLOAD"
}
```

### Status Mapeados:

| Status Invictus Pay | Status Sistema |
|---------------------|----------------|
| Pago | approved |
| Aguardando Pagamento | pending |
| Recusado | rejected |
| Cancelado | canceled |
| Reembolsado | refunded |
| Chargeback | charged_back |

## 🛠️ Comandos Úteis

### Atualizar banco de dados (após mudanças no schema):
```bash
npm run db:push --force
```

### Ver logs do webhook:
Os webhooks são logados no console do servidor. Verifique em tempo real.

## ❓ Problemas Comuns

### "Link de checkout não configurado"
→ Configure os links conforme Passo 2

### "Webhook não está funcionando"
→ Verifique se a URL está correta e acessível
→ Teste com ferramentas como webhook.site primeiro

### "Pagamento não atualiza"
→ Verifique os logs do servidor
→ Confirme que os eventos estão selecionados no painel

## 📞 Suporte

- **Invictus Pay**: contato@invictuspay.com.br
- **Documentação**: https://docs.invictuspay.com.br/

---

✅ **Configuração completa!** Sua integração com Invictus Pay está pronta para uso.
