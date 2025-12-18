# 🚀 Guia Completo - Backend com Supabase

## 🎯 Por que Supabase?

✅ **Grátis** até 500MB de dados + 2GB de storage  
✅ **Banco PostgreSQL** já configurado  
✅ **Autenticação** pronta (login/cadastro)  
✅ **Storage** para arquivos (documentos)  
✅ **API REST** automática  
✅ **Realtime** (opcional)  
✅ **Sem servidor** para gerenciar  
✅ **Setup em 15 minutos**  

---

## 📋 Passo 1: Criar Conta no Supabase

### 1.1 - Acessar Supabase
1. Acesse: https://supabase.com
2. Clique em **"Start your project"**
3. Escolha **"Sign in with GitHub"** (recomendado)
4. Autorize o Supabase

### 1.2 - Criar Organização
1. **Organization name:** `Cred Certo` (ou nome da sua empresa)
2. Clique em **"Create organization"**

### 1.3 - Criar Projeto
1. Clique em **"New project"**
2. Preencha:
   - **Name:** `crm-cred-certo`
   - **Database Password:** Crie uma senha forte e **SALVE!** 🔴
   - **Region:** `South America (São Paulo)` (mais próximo do Brasil)
   - **Pricing Plan:** `Free` (grátis)
3. Clique em **"Create new project"**
4. Aguarde ~2 minutos (criando banco de dados)

---

## 🗄️ Passo 2: Criar Tabelas do Banco de Dados

### 2.1 - Acessar SQL Editor
1. No menu lateral, clique em **"SQL Editor"**
2. Clique em **"New query"**

### 2.2 - Copiar e Colar SQL

**Cole este código e clique em "Run":**

```sql
-- ========================================
-- BANCO DE DADOS CRM CRED CERTO
-- ========================================

-- 1. TABELA: usuarios
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    foto_url VARCHAR(500),
    perfil VARCHAR(20) NOT NULL CHECK (perfil IN ('admin', 'vendedor', 'financeiro')),
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. TABELA: clientes
CREATE TABLE clientes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(150) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    rg VARCHAR(20),
    data_nascimento DATE,
    telefone VARCHAR(20) NOT NULL,
    whatsapp VARCHAR(20),
    email VARCHAR(150),
    endereco_cep VARCHAR(10),
    endereco_rua VARCHAR(200),
    endereco_numero VARCHAR(10),
    endereco_complemento VARCHAR(100),
    endereco_bairro VARCHAR(100),
    endereco_cidade VARCHAR(100),
    endereco_estado VARCHAR(2),
    profissao VARCHAR(100),
    empresa VARCHAR(150),
    renda_mensal DECIMAL(12, 2),
    estado_civil VARCHAR(20),
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. TABELA: administradoras
CREATE TABLE administradoras (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(18) UNIQUE,
    telefone VARCHAR(20),
    email VARCHAR(150),
    contato_responsavel VARCHAR(100),
    ativa BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 4. TABELA: vendas
CREATE TABLE vendas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo VARCHAR(20) UNIQUE NOT NULL,
    cliente_id UUID NOT NULL REFERENCES clientes(id),
    vendedor_id UUID NOT NULL REFERENCES usuarios(id),
    administradora_id UUID REFERENCES administradoras(id),
    tipo_bem VARCHAR(20) NOT NULL CHECK (tipo_bem IN ('imovel', 'automovel', 'servicos')),
    valor_credito DECIMAL(12, 2) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('novo', 'negociacao', 'aprovado', 'perdido', 'finalizado')),
    etapa VARCHAR(50) DEFAULT 'primeiro_contato',
    origem VARCHAR(50),
    fornecedor VARCHAR(150),
    observacoes TEXT,
    motivo_perda TEXT,
    data_abertura DATE NOT NULL DEFAULT CURRENT_DATE,
    data_aprovacao DATE,
    data_finalizacao DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 5. TABELA: documentos
CREATE TABLE documentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    venda_id UUID NOT NULL REFERENCES vendas(id) ON DELETE CASCADE,
    tipo VARCHAR(100) NOT NULL,
    nome_arquivo VARCHAR(255) NOT NULL,
    url_arquivo VARCHAR(500) NOT NULL,
    tamanho_bytes INTEGER,
    mime_type VARCHAR(100),
    status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'aprovado', 'rejeitado')),
    motivo_rejeicao TEXT,
    aprovado_por UUID REFERENCES usuarios(id),
    data_aprovacao TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 6. TABELA: comunicacao
CREATE TABLE comunicacao (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    venda_id UUID NOT NULL REFERENCES vendas(id) ON DELETE CASCADE,
    usuario_id UUID REFERENCES usuarios(id),
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('mensagem', 'acao', 'sistema')),
    mensagem TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 7. TABELA: lancamentos_financeiros
CREATE TABLE lancamentos_financeiros (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    venda_id UUID NOT NULL REFERENCES vendas(id) ON DELETE CASCADE,
    tipo VARCHAR(50) NOT NULL,
    descricao VARCHAR(200) NOT NULL,
    valor DECIMAL(12, 2) NOT NULL,
    beneficiario VARCHAR(150),
    data_vencimento DATE NOT NULL,
    data_pagamento DATE,
    status VARCHAR(20) DEFAULT 'previsto' CHECK (status IN ('previsto', 'pendente', 'pago', 'recebido', 'cancelado')),
    forma_pagamento VARCHAR(30),
    observacoes TEXT,
    simulacao BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- INSERIR DADOS INICIAIS
-- ========================================

-- Administradoras
INSERT INTO administradoras (nome, telefone) VALUES
('Embracon', '(11) 3003-0000'),
('Rodobens', '(11) 3004-0000'),
('Porto Seguro', '(11) 3005-0000'),
('Bradesco Consórcios', '(11) 3006-0000');

-- ========================================
-- ÍNDICES PARA PERFORMANCE
-- ========================================

CREATE INDEX idx_vendas_codigo ON vendas(codigo);
CREATE INDEX idx_vendas_cliente ON vendas(cliente_id);
CREATE INDEX idx_vendas_vendedor ON vendas(vendedor_id);
CREATE INDEX idx_vendas_status ON vendas(status);
CREATE INDEX idx_documentos_venda ON documentos(venda_id);
CREATE INDEX idx_comunicacao_venda ON comunicacao(venda_id);
CREATE INDEX idx_lancamentos_venda ON lancamentos_financeiros(venda_id);

-- ========================================
-- VIEWS ÚTEIS
-- ========================================

-- View: Vendas com informações completas
CREATE OR REPLACE VIEW vw_vendas_completas AS
SELECT 
    v.id,
    v.codigo,
    v.tipo_bem,
    v.valor_credito,
    v.status,
    v.etapa,
    v.origem,
    v.fornecedor,
    v.observacoes,
    v.data_abertura,
    c.nome as cliente_nome,
    c.telefone as cliente_telefone,
    c.email as cliente_email,
    u.nome as vendedor_nome,
    u.email as vendedor_email,
    a.nome as administradora_nome,
    v.created_at,
    v.updated_at
FROM vendas v
INNER JOIN clientes c ON c.id = v.cliente_id
INNER JOIN usuarios u ON u.id = v.vendedor_id
LEFT JOIN administradoras a ON a.id = v.administradora_id
ORDER BY v.created_at DESC;

-- ========================================
-- FUNCTIONS
-- ========================================

-- Function: Gerar próximo código de venda
CREATE OR REPLACE FUNCTION gerar_codigo_venda()
RETURNS TEXT AS $$
DECLARE
    proximo_numero INTEGER;
    novo_codigo TEXT;
BEGIN
    SELECT COALESCE(MAX(CAST(SUBSTRING(codigo FROM 2) AS INTEGER)), 0) + 1
    INTO proximo_numero
    FROM vendas;
    
    novo_codigo := 'V' || LPAD(proximo_numero::TEXT, 3, '0');
    RETURN novo_codigo;
END;
$$ LANGUAGE plpgsql;

-- Function: Atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION atualizar_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar updated_at
CREATE TRIGGER trigger_usuarios_updated_at
    BEFORE UPDATE ON usuarios
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_updated_at();

CREATE TRIGGER trigger_clientes_updated_at
    BEFORE UPDATE ON clientes
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_updated_at();

CREATE TRIGGER trigger_vendas_updated_at
    BEFORE UPDATE ON vendas
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_updated_at();

-- ========================================
-- POLÍTICAS RLS (Row Level Security)
-- ========================================

-- Habilitar RLS nas tabelas principais
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendas ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE comunicacao ENABLE ROW LEVEL SECURITY;
ALTER TABLE lancamentos_financeiros ENABLE ROW LEVEL SECURITY;

-- Política: Usuários podem ver apenas seus próprios dados
CREATE POLICY "Usuarios podem ver seu proprio perfil"
    ON usuarios FOR SELECT
    USING (auth.uid()::TEXT = id::TEXT);

-- Política: Vendedores veem apenas suas vendas
CREATE POLICY "Vendedores veem suas vendas"
    ON vendas FOR SELECT
    USING (
        auth.uid()::TEXT = vendedor_id::TEXT
        OR 
        EXISTS (
            SELECT 1 FROM usuarios 
            WHERE id::TEXT = auth.uid()::TEXT 
            AND perfil IN ('admin', 'financeiro')
        )
    );

-- Política: Todos podem ler administradoras
CREATE POLICY "Todos podem ler administradoras"
    ON administradoras FOR SELECT
    USING (true);

-- ========================================
-- STORAGE BUCKETS PARA DOCUMENTOS
-- ========================================

-- Criar bucket para documentos (será criado via interface depois)
-- Bucket name: 'documentos'
-- Public: false
-- File size limit: 5MB
-- Allowed MIME types: application/pdf, image/jpeg, image/png

```

### 2.3 - Verificar Sucesso
Você deve ver: ✅ **"Success. No rows returned"**

---

## 🔑 Passo 3: Configurar Autenticação

### 3.1 - Habilitar Email/Password
1. Menu lateral → **"Authentication"**
2. Clique em **"Providers"**
3. **Email** já deve estar habilitado ✅
4. Se não estiver, clique em "Email" e habilite

### 3.2 - Configurar Redirect URLs
1. Ainda em Authentication → **"URL Configuration"**
2. **Site URL:** `http://localhost:8000` (desenvolvimento)
3. **Redirect URLs:** Adicione:
   ```
   http://localhost:8000
   http://localhost:8000/index.html
   https://seu-dominio.vercel.app
   ```

### 3.3 - Criar Primeiro Usuário (Admin)
1. Menu lateral → **"Authentication"** → **"Users"**
2. Clique em **"Add user"** → **"Create new user"**
3. Preencha:
   - **Email:** `admin@credcerto.com`
   - **Password:** `Admin@123` (ou sua senha)
   - **Auto Confirm User:** ✅ Marque
4. Clique em **"Create user"**
5. **Copie o UUID** do usuário criado

### 3.4 - Inserir Admin na Tabela usuarios
1. Volte para **"SQL Editor"**
2. Execute:
```sql
INSERT INTO usuarios (id, nome, email, perfil)
VALUES (
    'UUID-COPIADO-DO-USUARIO',  -- Substituir!
    'Admin',
    'admin@credcerto.com',
    'admin'
);
```

---

## 🔌 Passo 4: Obter Credenciais do Projeto

### 4.1 - Acessar Settings
1. Menu lateral → ⚙️ **"Project Settings"**
2. Clique em **"API"**

### 4.2 - Copiar Credenciais
Você verá duas informações importantes:

**📍 Project URL:**
```
https://xxxxxxxxxxxxxxxx.supabase.co
```

**🔑 anon public (API Key):**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **COPIE E SALVE AMBOS!** Vamos usar no próximo passo.

---

## 📂 Passo 5: Configurar Storage para Documentos

### 5.1 - Criar Bucket
1. Menu lateral → **"Storage"**
2. Clique em **"Create a new bucket"**
3. Preencha:
   - **Name:** `documentos`
   - **Public bucket:** ❌ Desmarque (privado)
   - **File size limit:** `5MB`
   - **Allowed MIME types:** 
     ```
     application/pdf
     image/jpeg
     image/png
     image/jpg
     ```
4. Clique em **"Create bucket"**

### 5.2 - Configurar Políticas do Bucket
1. Clique no bucket **"documentos"**
2. Vá para **"Policies"**
3. Clique em **"New policy"**

**Política 1: Upload (INSERT)**
```sql
CREATE POLICY "Usuarios autenticados podem fazer upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'documentos' 
  AND auth.role() = 'authenticated'
);
```

**Política 2: Download (SELECT)**
```sql
CREATE POLICY "Usuarios autenticados podem baixar"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'documentos' 
  AND auth.role() = 'authenticated'
);
```

**Política 3: Deletar (DELETE)**
```sql
CREATE POLICY "Usuarios podem deletar proprios arquivos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'documentos' 
  AND auth.role() = 'authenticated'
);
```

---

## ✅ Verificação Final

Confira se tudo está certo:

- [ ] ✅ Projeto Supabase criado
- [ ] ✅ 7 tabelas criadas (usuarios, clientes, vendas, etc)
- [ ] ✅ Índices criados
- [ ] ✅ Views criadas
- [ ] ✅ Functions criadas
- [ ] ✅ Autenticação Email habilitada
- [ ] ✅ Usuário Admin criado
- [ ] ✅ Bucket 'documentos' criado
- [ ] ✅ Políticas do Storage configuradas
- [ ] ✅ Project URL copiada
- [ ] ✅ API Key copiada

---

## 📝 Informações para Salvar

Anote estas informações (vamos usar no próximo passo):

```
PROJECT URL: https://xxxxxxxx.supabase.co
API KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE PASSWORD: (sua senha)
ADMIN EMAIL: admin@credcerto.com
ADMIN PASSWORD: Admin@123
```

---

## 🎯 Próximo Passo

Agora vamos **integrar o frontend com o Supabase**!

Ver arquivo: **`BACKEND-INTEGRACAO.md`**

---

**Dúvidas?** Me chame que eu ajudo! 🚀
