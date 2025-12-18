# 📋 Guia de Deployment - CRM Cred Certo

**Versão:** 1.0  
**Data:** 18 de Dezembro de 2025  
**Status:** Operacional ✅

---

## 🎯 Objetivo

Este guia descreve o fluxo completo de deployment automático do repositório GitHub para o cPanel via FTPS, incluindo boas práticas, monitoramento e checklist para a equipe.

---

## 🚀 Fluxo de Deployment (Resumido)

```
Editar código
    ↓
git add . && git commit -m "mensagem"
    ↓
git push origin main
    ↓
GitHub Actions (FTP Deploy to cPanel)
    ↓
Arquivos enviados via FTPS
    ↓
https://emprestimocartaocreditobh.com.br atualizado ✅
```

---

## 📌 Configuração (Já Realizada)

### Secrets do GitHub (Settings → Secrets and variables → Actions)

- ✅ `FTP_SERVER` = `ftp.credcertomg.com.br`
- ✅ `FTP_USERNAME` = `deploy@emprestimocartaocreditobh.com.br`
- ✅ `FTP_PASSWORD` = (sua senha FTP)

### Workflows Ativos

1. **FTP Deploy to cPanel (Frontend)** - `.github/workflows/deploy-cpanel.yml`
   - Triggered: quando houver push em `main`
   - Deploy para: `/home2/credcerto/emprestimocartaocreditobh.com.br/`
   - Exclui: `.git/`, `node_modules/`, `.github/`, `dist/`, `build/`, etc.

2. **FTP Deploy to cPanel (Backend)** - `.github/workflows/deploy-cpanel-backend.yml`
   - Triggered: quando houver mudanças em `backend/**` na branch `main`
   - Deploy para: `/home2/credcerto/emprestimocartaocreditobh.com.br/backend/`
   - **Nunca** envia `.env`

3. **Arquivo de Exclusão FTP** - `.ftpignore`
   - Reforça exclusões de arquivos desnecessários
   - Evita poluição do servidor

---

## ✅ Checklist Diário (Para a Equipe)

### Antes de fazer push:

- [ ] Editar código no **VS Code** (ou editor preferido)
- [ ] Testar localmente se possível
- [ ] Confirmar que não há arquivos sensíveis sendo commitados

### Fazer commit:

```bash
git add .
git commit -m "feat: nova feature" || "fix: corrigir bug" || "chore: ajuste"
git push origin main
```

### Após push:

- [ ] Ir em **GitHub → Actions**
- [ ] Verificar que "FTP Deploy to cPanel (Frontend)" ou "(Backend)" apareceu
- [ ] Aguardar conclusão (geralmente < 30 segundos)
- [ ] Acessar **https://emprestimocartaocreditobh.com.br**
- [ ] Fazer **Hard Refresh** (Ctrl+Shift+R ou Cmd+Shift+R)
- [ ] Validar mudanças

### Se backend foi alterado:

- [ ] GitHub Actions dispara "FTP Deploy to cPanel (Backend)"
- [ ] Acessar **cPanel → Setup Node.js App**
- [ ] Clicar em **Restart Application**
- [ ] Testar endpoint (ex.: https://emprestimocartaocreditobh.com.br/api/health)

---

## 📝 Boas Práticas

### ✅ Faça:

1. **Commits pequenos e frequentes**
   - Facilita identificar o que mudou
   - Permite rollback parcial se necessário
   - Ex.: `feat: adicionar modal de vendas` vs. `update tudo`

2. **Mensagens descritivas**
   ```bash
   ✅ git commit -m "feat: novo modal de vendas com validação"
   ❌ git commit -m "update"
   ```

3. **Separar frontend de backend**
   - Se só mudou frontend: não toque em `backend/**`
   - Se só mudou backend: concentre mudanças lá
   - Facilita troubleshooting

4. **Usar secrets para dados sensíveis**
   - Credenciais de API no GitHub Secrets
   - Variáveis de ambiente no Node App Manager do cPanel
   - Nunca comitar `.env` ou senhas

5. **Testar antes de fazer push**
   - Validar no navegador localmente se possível
   - Verificar console do navegador (F12)
   - Testar fluxos críticos

### ❌ Não faça:

1. ❌ Commitar arquivos gerados (`dist/`, `build/`, `node_modules/`)
2. ❌ Colocar secrets no código (FTP password, API keys, etc.)
3. ❌ Fazer grandes commits sem mensagem descritiva
4. ❌ Editar direto no cPanel (sempre via GitHub)
5. ❌ Fazer push sem testar

---

## 🔍 Monitoramento e Troubleshooting

### 1. **Verificar histórico de deploys**

```
GitHub → Actions
→ Selecione o workflow (FTP Deploy to cPanel)
→ Veja status: ✅ Success ou ❌ Failure
→ Clique para ver logs detalhados
```

### 2. **Se o deploy falhar:**

- Verificar log do workflow em GitHub Actions
  - Procure por erros de conexão FTP
  - Confirme que os secrets estão corretos
  - Verifique timeout (600s padrão)

- Verificar permissões no cPanel
  - Conta FTP ativa
  - Pasta `/home2/credcerto/emprestimocartaocreditobh.com.br/` acessível

### 3. **Se o site retorna erro 500:**

- **Frontend** (index.html, login.html):
  - Abrir F12 → Console → verificar erros JavaScript
  - Abrir F12 → Network → ver status dos CSS/JS
  - Hard Refresh (Ctrl+Shift+R)
  - Verificar `.htaccess` (pode ter regras quebradas)

- **Backend** (API endpoints):
  - cPanel → Error Logs → revisar últimos erros
  - Node App Manager → ver status da app
  - Restart Application
  - Verificar variáveis de ambiente

### 4. **Se CSS não carrega:**

- Verificar paths (devem ser absolutos)
  ```html
  ✅ <link rel="stylesheet" href="/assets/css/main.css">
  ❌ <link rel="stylesheet" href="assets/css/main.css">
  ```

- Hard Refresh do navegador
- Limpar cache do browser

---

## 🔐 Segurança

### Secrets no GitHub

**Nunca commitar:**
- Senhas FTP, API keys, access tokens
- Dados de autenticação
- Variáveis de ambiente com dados sensíveis

**Usar GitHub Secrets para:**
- `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`
- Qualquer API key externa

### Node.js App Manager (cPanel)

**Para variáveis de backend:**
- Ir em cPanel → Setup Node.js App
- Adicionar variáveis de ambiente lá
- Exemplo: `SUPABASE_URL`, `SUPABASE_KEY`
- **Nunca** colocar `.env` no repo

---

## 📊 Melhorias Futuras (Roadmap)

- [ ] Adicionar testes automáticos (Jest) ao workflow
- [ ] Implementar proteção de rotas com `.htaccess`
- [ ] Ativar RLS (Row-Level Security) no Supabase
- [ ] Adicionar logs estruturados no backend (Winston/Pino)
- [ ] Implementar rate limiting na API
- [ ] Adicionar notificações no Slack/Discord para deploys
- [ ] Versioning automático de deployments

---

## 💬 Contato e Suporte

Se algo der errado:

1. Verificar **GitHub Actions → últimos runs**
2. Verificar **cPanel → Error Logs**
3. Verificar **Browser Console (F12)**
4. Contatar o time de desenvolvimento

---

## 📚 Referências Rápidas

- GitHub: https://github.com/douglasmidiacerta/crm-cred-certo
- Site: https://emprestimocartaocreditobh.com.br
- cPanel: https://cpanel.ljonline.com.br
- Supabase: https://app.supabase.com

---

**Last Updated:** 18 de Dezembro de 2025  
**Next Review:** Quando tiver novas features
