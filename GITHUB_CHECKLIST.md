# ✅ Checklist para Subir no GitHub

Use este checklist antes de fazer push para o GitHub.

## 📋 Arquivos Essenciais

- [x] `README.md` - Documentação completa
- [x] `DEPLOY.md` - Guia de deploy detalhado
- [x] `.gitignore` - Arquivos ignorados configurados
- [x] `.env.example` - Exemplo de variáveis de ambiente
- [x] `package.json` - Dependências e scripts
- [x] `render.yaml` - Configuração para Render
- [x] `INVICTUS_PAY_SETUP.md` - Setup de pagamentos

## 🔒 Segurança

- [x] `.env` está no `.gitignore` (não será enviado)
- [x] Não há senhas hardcoded no código
- [x] Não há tokens de API no código
- [x] `.env.example` foi criado (sem valores reais)

## 🧪 Antes de Subir

### 1. Teste localmente

```bash
npm install
npm run build
npm start
```

Verifique se:
- [ ] Build passa sem erros
- [ ] Servidor inicia corretamente
- [ ] Site abre em localhost:5000

### 2. Remova arquivos desnecessários

```bash
# Remova node_modules se existir (já está no .gitignore)
rm -rf node_modules

# Remova dist (será recriado no deploy)
rm -rf dist

# Remova arquivos temporários
rm -rf .cache
```

### 3. Verifique TypeScript

```bash
npm run check
```

## 📤 Como Subir para o GitHub

### Primeira vez (novo repositório):

```bash
# 1. Inicialize o Git (se ainda não fez)
git init

# 2. Adicione todos os arquivos
git add .

# 3. Faça o primeiro commit
git commit -m "feat: versão inicial do ENEM Turbo 2025"

# 4. Crie repositório no GitHub (pelo site)
# - Acesse: github.com/new
# - Nome: enem-turbo-2025
# - Descrição: Plataforma de vendas de materiais ENEM
# - Deixe VAZIO (não adicione README, .gitignore, etc)

# 5. Conecte ao repositório remoto
git remote add origin https://github.com/SEU_USUARIO/enem-turbo-2025.git

# 6. Faça o push
git branch -M main
git push -u origin main
```

### Atualizações futuras:

```bash
# 1. Adicione as alterações
git add .

# 2. Commit com mensagem descritiva
git commit -m "feat: adiciona garantia de 5 dias no checkout"

# 3. Push para GitHub
git push origin main
```

## 🚀 Após Subir no GitHub

1. ✅ Verifique se todos os arquivos estão no repositório
2. ✅ Confirme que `.env` NÃO foi enviado
3. ✅ Teste clonando o repositório em outra pasta
4. ✅ Siga o `DEPLOY.md` para fazer deploy

## 📁 O que DEVE estar no GitHub

✅ Todo código fonte (`client/`, `server/`, `shared/`)
✅ Arquivos de configuração (`package.json`, `tsconfig.json`, etc)
✅ Documentação (`README.md`, `DEPLOY.md`, `INVICTUS_PAY_SETUP.md`)
✅ Assets públicos (`attached_assets/` se aplicável)
✅ `.env.example` (sem valores reais)
✅ `.gitignore`

## ❌ O que NÃO DEVE estar no GitHub

❌ `.env` (variáveis de ambiente reais)
❌ `node_modules/` (dependências - será instalado via npm)
❌ `dist/` (build - será criado no deploy)
❌ Arquivos temporários ou de cache
❌ Credenciais ou senhas
❌ `.replit` / `replit.nix` (específicos do Replit)

## 🎯 Mensagens de Commit Recomendadas

Use prefixos para organizar:

- `feat:` - Nova funcionalidade
  - Ex: `feat: adiciona página de termos de uso`
- `fix:` - Correção de bug
  - Ex: `fix: corrige erro no cálculo de total`
- `docs:` - Documentação
  - Ex: `docs: atualiza README com instruções de deploy`
- `style:` - Mudanças de estilo/formatação
  - Ex: `style: melhora espaçamento no checkout`
- `refactor:` - Refatoração de código
  - Ex: `refactor: simplifica lógica de validação`

## 🔍 Verificação Final

Antes de fazer deploy, confirme:

- [ ] Código está no GitHub
- [ ] `.env.example` está atualizado
- [ ] `README.md` tem instruções claras
- [ ] `DEPLOY.md` está completo
- [ ] Build funciona localmente
- [ ] Não há segredos no código

## 🎉 Pronto!

Seu código está seguro no GitHub e pronto para deploy!

**Próximo passo:** Siga o `DEPLOY.md` para colocar no ar.
