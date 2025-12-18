# 🚀 Backend Setup - CRM Cred Certo

Guia completo para ligar o backend com o Supabase e a API com seu front-end.

## Passo 1: Setup do Supabase

### 1.1 Criar Projeto
1. Vá em https://supabase.com/
2. Clique em "Start your project"
3. Crie uma conta ou logue
4. Clique em "New Project"
5. Preencha:
   - Project Name: `crm-cred-certo`
   - Database Password: (salve em local seguro)
   - Region: `South America (São Paulo)` (se disponível)
6. Aguarde criar (5-10 min)

### 1.2 Executar Schema SQL
1. Acesse seu projeto Supabase
2. No menu lateral, clique em **SQL Editor**
3. Clique em **New Query**
4. Copie e cole TODO o conteúdo do arquivo `schema.sql` deste repositório
5. Clique em **Run**
6. Espere a criação das tabelas (vai dar sucesso)

### 1.3 Pegar Credenciais
1. No menu, clique em **Project Settings → API**
2. Copie:
   - **Project URL** (ex: `https://abcd1234.supabase.co`)
   - **anon key** (public)
   - **service_role key** (private - GUARDE SEGURO)

## Passo 2: Deploy da API no Render (ou Railway/Vercel)

### Opção A: Render (Recomendado - Grátis)

1. Vá em https://render.com
2. Clique em **New → Web Service**
3. Escolha "Deploy an existing Git repository"
4. Conecte seu GitHub (autorize)
5. Selecione o repositório `crm-cred-certo`
6. Configure:
   - **Name**: `crm-cred-certo-api`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/index.js`
7. Clique em **Advanced** e adicione variáveis de ambiente (veja seção abaixo)
8. Clique em **Create Web Service**

### Variáveis de Ambiente (Add no Render/Railway/Vercel)

No painel de ambiente do seu host, adicione:

```
DATABASE_URL=postgresql://postgres:[password]@[host]:[port]/[database]?sslmode=require
JWT_SECRET=sua-chave-secreta-muito-longa-e-aleatoria-aqui
JWT_REFRESH_SECRET=outra-chave-secreta-diferentes-muito-longa
NODE_ENV=production
PORT=3000
```

**Pegar DATABASE_URL do Supabase:**
1. No Supabase, vá em **Project Settings → Database → Connection String**
2. Escolha "URI"
3. Copie e substitua `[password]` pela sua senha de banco

## Passo 3: Integrar Frontend com API

No seu `login.html`, mude:

```javascript
// DE:
const response = await fetch('/api/login', {

// PARA:
const response = await fetch('https://crm-cred-certo-api.onrender.com/api/auth/login', {
```

Faça o mesmo para todos os endpoints em seus arquivos JS.

## Passo 4: Testar Localmente (Opcional)

```bash
# 1. Clone e entre no repositório
git clone https://github.com/douglasmidiacerta/crm-cred-certo.git
cd crm-cred-certo/backend

# 2. Instale dependências
npm install

# 3. Crie .env.local com as credenciais
echo "DATABASE_URL=..." > .env.local
echo "JWT_SECRET=..." >> .env.local

# 4. Rode o backend
npm run dev

# API estará em http://localhost:3000
```

## Estrutura de Pastas

```
backend/
├── schema.sql          # ✅ Banco de dados
├── SETUP.md            # ✅ Este arquivo
├── package.json        # Em breve
├── src/
│   ├── index.js        # Arquivo principal
│   ├── config/
│   │   └── db.js       # Conexão Supabase
│   ├── routes/
│   │   ├── auth.js
│   │   ├── vendas.js
│   │   ├── clientes.js
│   │   └── documentos.js
│   ├── middleware/
│   │   └── auth.js     # JWT
│   └── utils/
│       └── responses.js
└── .env.example        # Variáveis de exemplo
```

## URLs Base Após Deploy

- **Frontend**: https://crm-cred-certo.vercel.app
- **Backend**: https://crm-cred-certo-api.onrender.com
- **Banco**: Supabase (gerenciado)

## Próximos Passos

✅ Schema SQL criado
⏳ Criar `package.json`
⏳ Criar `src/index.js` (servidor Express)
⏳ Criar rotas (auth, vendas, clientes, etc)
⏳ Testar localmente
⏳ Deploy na Render
⏳ Integrar frontend

## Troubleshooting

**Erro: CORS bloqueando requisições**
→ Adicione CORS no backend

**Erro: 401 Unauthorized**
→ Verifique se o JWT está sendo enviado no header

**Erro: Database connection refused**
→ Verifique DATABASE_URL e se o Supabase está ativo
