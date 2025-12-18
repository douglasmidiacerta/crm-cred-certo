# 🔌 Integração Frontend + Supabase

## 📋 Pré-requisitos

Antes de começar, certifique-se de que:
- ✅ Completou **BACKEND-SUPABASE-SETUP.md**
- ✅ Tem o **Project URL** do Supabase
- ✅ Tem a **API Key** do Supabase
- ✅ Criou o usuário Admin

---

## 🎯 Passo 1: Criar Arquivo de Configuração

### 1.1 - Criar `assets/js/supabase-config.js`

Este arquivo já foi criado automaticamente. Você só precisa **atualizar as credenciais**!

1. Abra o arquivo **`assets/js/supabase-config.js`**
2. Encontre estas linhas:
   ```javascript
   const SUPABASE_URL = 'SUA-PROJECT-URL-AQUI';
   const SUPABASE_ANON_KEY = 'SUA-API-KEY-AQUI';
   ```
3. Substitua pelos seus valores:
   ```javascript
   const SUPABASE_URL = 'https://xxxxxxxx.supabase.co';
   const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   ```
4. Salve o arquivo

---

## 🔐 Passo 2: Adicionar Scripts no HTML

### 2.1 - Atualizar `index.html`

O arquivo já foi atualizado! Verifique se tem estas linhas antes do `</body>`:

```html
<!-- Supabase SDK -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- Scripts do projeto -->
<script src="assets/js/supabase-config.js"></script>
<script src="assets/js/auth.js"></script>
<script src="assets/js/data.js"></script>
<!-- ... outros scripts ... -->
```

---

## 🚀 Passo 3: Testar a Conexão

### 3.1 - Abrir o Console do Navegador

1. Abra **`index.html`** no navegador
2. Pressione **F12** para abrir o Console
3. Digite:
   ```javascript
   supabase
   ```
4. Se aparecer um objeto, **está conectado!** ✅

### 3.2 - Testar Banco de Dados

No Console, digite:
```javascript
const { data, error } = await supabase.from('administradoras').select('*');
console.log(data);
```

Você deve ver as 4 administradoras! 🎉

---

## 🔑 Passo 4: Fazer Login

### 4.1 - Acessar Página de Login

1. Abra **`login.html`** no navegador
2. Use as credenciais do Admin:
   - **Email:** `admin@credcerto.com`
   - **Password:** `Admin@123` (ou a senha que você definiu)
3. Clique em **"Entrar"**

Se aparecer o Dashboard, **funcionou!** 🎊

---

## 📊 Passo 5: Testar Funcionalidades

### 5.1 - Criar Nova Venda

1. Vá para **Vendas**
2. Clique em **"Nova Venda"**
3. Preencha o formulário
4. Clique em **"Criar Venda"**
5. Verifique no Supabase:
   - Menu **"Table Editor"**
   - Tabela **"vendas"**
   - Sua venda deve estar lá! ✅

### 5.2 - Editar Venda

1. Entre nos detalhes de uma venda
2. Clique em **"Editar Venda"**
3. Altere algum campo
4. Salve
5. Verifique no Supabase se atualizou

### 5.3 - Enviar Mensagem

1. Na página de detalhes da venda
2. Digite uma mensagem na timeline
3. Clique em **"Enviar Mensagem"**
4. Verifique na tabela **"comunicacao"** do Supabase

### 5.4 - Upload de Documento (Simulado por enquanto)

O upload real de arquivos será implementado em um próximo passo.

---

## 🔄 Como o Sistema Funciona Agora

### Fluxo de Dados

```
Frontend (HTML/JS)
    ↓
Supabase Client (supabase.js)
    ↓
Supabase Cloud (API REST)
    ↓
PostgreSQL Database
    ↓
Retorna Dados
    ↓
Frontend Atualiza Interface
```

### Autenticação

```
Login → Supabase Auth → JWT Token → Armazenado no localStorage
↓
Todas as requisições incluem o token
↓
Supabase valida permissões (RLS)
↓
Retorna dados permitidos
```

---

## 🛠️ Arquivos Modificados

### Criados/Atualizados:
1. **`assets/js/supabase-config.js`** - Configuração do Supabase
2. **`assets/js/auth.js`** - Funções de autenticação
3. **`assets/js/api.js`** - Funções de API (CRUD)
4. **`login.html`** - Página de login
5. **`index.html`** - Adicionado script do Supabase

### Modificados:
1. **`assets/js/data.js`** - Agora busca do Supabase
2. **`assets/js/modals.js`** - Salva no Supabase
3. **`assets/js/router.js`** - Verifica autenticação
4. **`assets/js/main.js`** - Carrega dados reais

---

## 🔐 Segurança Implementada

### Row Level Security (RLS)

✅ **Vendedores** veem apenas suas vendas  
✅ **Admin/Financeiro** veem todas  
✅ **Documentos** protegidos por políticas  
✅ **Storage** privado (não público)  

### Tokens JWT

✅ Token expira após 1 hora  
✅ Refresh automático  
✅ Logout limpa tokens  

---

## 📝 Variáveis de Ambiente (Para Produção)

Quando fizer deploy no Vercel, você precisa adicionar:

1. No Vercel: **Settings** → **Environment Variables**
2. Adicionar:
   ```
   SUPABASE_URL = https://xxxxxxxx.supabase.co
   SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

---

## 🐛 Solução de Problemas

### Erro: "Invalid API key"
**Solução:** Verifique se copiou a API key correta do Supabase

### Erro: "Not authenticated"
**Solução:** Faça login novamente em `login.html`

### Erro: "Permission denied"
**Solução:** Verifique as políticas RLS no Supabase

### Dados não aparecem
**Solução:** 
1. Abra Console do navegador (F12)
2. Veja se tem erros
3. Verifique se está logado: `localStorage.getItem('supabase.auth.token')`

### Não consegue criar venda
**Solução:**
1. Verifique se o cliente foi criado
2. Veja erros no Console
3. Confira tabela `vendas` no Supabase

---

## 📊 Monitoramento

### Ver Logs no Supabase

1. Menu **"Logs"**
2. Escolha tipo:
   - **API**: Requisições HTTP
   - **Auth**: Login/Logout
   - **Database**: Queries SQL
3. Filtre por horário

### Ver Queries Executadas

1. Menu **"Database"** → **"Query Performance"**
2. Veja queries mais lentas
3. Otimize se necessário

---

## 🎯 Próximos Passos

### Funcionalidades para Adicionar:

1. **Upload Real de Arquivos** 📎
   - Ver `BACKEND-UPLOAD.md`

2. **Relatórios Avançados** 📊
   - Exportar PDF/Excel
   - Gráficos com dados reais

3. **Notificações por Email** 📧
   - Supabase Edge Functions
   - SendGrid ou Resend

4. **Integração WhatsApp** 💬
   - Notificar clientes
   - Enviar documentos

5. **Módulos Restantes** 📦
   - Clientes (CRUD completo)
   - Cartas Disponíveis
   - Relatórios

---

## ✅ Checklist de Integração

- [ ] Arquivo `supabase-config.js` com credenciais corretas
- [ ] Script do Supabase no `index.html`
- [ ] Testado conexão no Console
- [ ] Login funcionando
- [ ] Criar venda funcionando
- [ ] Editar venda funcionando
- [ ] Filtros funcionando
- [ ] Timeline de mensagens funcionando
- [ ] Dashboard com dados reais
- [ ] Políticas RLS testadas
- [ ] Logout funcionando

---

## 🎓 Recursos de Aprendizado

**Documentação:**
- Supabase Docs: https://supabase.com/docs
- JavaScript Client: https://supabase.com/docs/reference/javascript
- Auth: https://supabase.com/docs/guides/auth
- Storage: https://supabase.com/docs/guides/storage

**Vídeos:**
- Supabase Crash Course: https://www.youtube.com/results?search_query=supabase+tutorial
- Auth with Supabase: https://www.youtube.com/results?search_query=supabase+authentication

---

## 🎉 Parabéns!

Seu CRM agora tem:

✅ Backend real (PostgreSQL)  
✅ Autenticação funcional  
✅ Dados persistentes  
✅ API REST automática  
✅ Segurança (RLS)  
✅ Storage para arquivos  

**Próximo:** Implementar upload real de documentos!

---

**Precisa de ajuda?** Me chame! 🚀

**Última atualização:** Janeiro 2024
