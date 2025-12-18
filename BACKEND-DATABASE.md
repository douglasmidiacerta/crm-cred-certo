# 🗄️ Documentação do Banco de Dados - CRM Cred Certo

## 📋 Visão Geral

Este documento descreve a estrutura completa do banco de dados necessária para o CRM.

## 🎯 Tecnologias Recomendadas

### Opção 1: Node.js + PostgreSQL (RECOMENDADO)
**Stack:** Node.js + Express + PostgreSQL + Prisma/Sequelize
- ✅ Robusto e escalável
- ✅ Excelente para relações complexas
- ✅ Suporte a JSON nativo
- ✅ Forte tipagem com TypeScript
- 💰 Custo: Médio (Heroku, Railway, Render)

### Opção 2: Node.js + MongoDB
**Stack:** Node.js + Express + MongoDB + Mongoose
- ✅ Flexível (schema-less)
- ✅ Rápido para MVP
- ✅ Boa para documentos
- ⚠️ Menos ideal para relacionamentos complexos
- 💰 Custo: Baixo (MongoDB Atlas free tier)

### Opção 3: Firebase (MAIS RÁPIDO PARA MVP)
**Stack:** Firebase Auth + Firestore + Cloud Functions
- ✅ Backend pronto em minutos
- ✅ Autenticação integrada
- ✅ Realtime por padrão
- ✅ Hospedagem incluída
- ⚠️ Vendor lock-in
- 💰 Custo: Grátis até certo limite

### Opção 4: Supabase (MELHOR CUSTO-BENEFÍCIO)
**Stack:** Supabase (PostgreSQL + Auth + Storage)
- ✅ PostgreSQL gerenciado
- ✅ Autenticação pronta
- ✅ Storage de arquivos incluso
- ✅ API REST automática
- ✅ Open source (sem lock-in)
- 💰 Custo: Grátis generoso, depois barato

## 📊 Modelo de Dados Completo

### 1️⃣ Tabela: `usuarios`
Armazena todos os usuários do sistema.

```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    foto_url VARCHAR(500),
    perfil VARCHAR(20) NOT NULL CHECK (perfil IN ('admin', 'vendedor', 'financeiro', 'suporte')),
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acesso TIMESTAMP
);

CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_perfil ON usuarios(perfil);
```

**Perfis e Permissões:**
- **admin**: Acesso total ao sistema
- **vendedor**: Criar vendas, visualizar suas vendas, enviar documentos
- **financeiro**: Ver financeiro, aprovar documentos, confirmar lançamentos
- **suporte**: Apenas leitura

---

### 2️⃣ Tabela: `clientes`
Dados dos clientes.

```sql
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
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
    estado_civil VARCHAR(20) CHECK (estado_civil IN ('solteiro', 'casado', 'divorciado', 'viuvo', 'uniao_estavel')),
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_clientes_cpf ON clientes(cpf);
CREATE INDEX idx_clientes_nome ON clientes(nome);
```

---

### 3️⃣ Tabela: `administradoras`
Administradoras de consórcio parceiras.

```sql
CREATE TABLE administradoras (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(18) UNIQUE,
    telefone VARCHAR(20),
    email VARCHAR(150),
    contato_responsavel VARCHAR(100),
    observacoes TEXT,
    ativa BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Dados Iniciais:**
```sql
INSERT INTO administradoras (nome, telefone) VALUES
('Embracon', '(11) 3003-0000'),
('Rodobens', '(11) 3004-0000'),
('Porto Seguro', '(11) 3005-0000'),
('Bradesco Consórcios', '(11) 3006-0000');
```

---

### 4️⃣ Tabela: `vendas`
Núcleo do sistema - todas as vendas/negociações.

```sql
CREATE TABLE vendas (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL, -- Ex: V001, V002
    cliente_id INTEGER NOT NULL REFERENCES clientes(id) ON DELETE RESTRICT,
    vendedor_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE RESTRICT,
    administradora_id INTEGER REFERENCES administradoras(id) ON DELETE SET NULL,
    
    tipo_bem VARCHAR(20) NOT NULL CHECK (tipo_bem IN ('imovel', 'automovel', 'servicos')),
    valor_credito DECIMAL(12, 2) NOT NULL,
    
    status VARCHAR(20) NOT NULL CHECK (status IN ('novo', 'negociacao', 'aprovado', 'perdido', 'finalizado')),
    etapa VARCHAR(50) DEFAULT 'primeiro_contato',
    
    origem VARCHAR(50), -- Ex: 'Facebook Ads', 'Google Ads', 'Indicação'
    fornecedor VARCHAR(150), -- Cotista, construtora, etc
    
    observacoes TEXT,
    motivo_perda TEXT, -- Se status = 'perdido'
    
    data_abertura DATE NOT NULL DEFAULT CURRENT_DATE,
    data_aprovacao DATE,
    data_finalizacao DATE,
    data_perda DATE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_vendas_codigo ON vendas(codigo);
CREATE INDEX idx_vendas_cliente ON vendas(cliente_id);
CREATE INDEX idx_vendas_vendedor ON vendas(vendedor_id);
CREATE INDEX idx_vendas_status ON vendas(status);
CREATE INDEX idx_vendas_data_abertura ON vendas(data_abertura);
```

**Etapas possíveis:**
- `primeiro_contato`
- `documentacao_pendente`
- `analise_credito`
- `aprovado_credito`
- `aprovado_financeiro`
- `aguardando_assinatura`
- `finalizado`
- `perdido`

---

### 5️⃣ Tabela: `documentos`
Documentos enviados pelos clientes.

```sql
CREATE TABLE documentos (
    id SERIAL PRIMARY KEY,
    venda_id INTEGER NOT NULL REFERENCES vendas(id) ON DELETE CASCADE,
    tipo VARCHAR(100) NOT NULL, -- Ex: 'RG', 'CPF', 'Comprovante de Renda'
    nome_arquivo VARCHAR(255) NOT NULL,
    url_arquivo VARCHAR(500) NOT NULL, -- URL no storage (S3, Cloudinary, etc)
    tamanho_bytes INTEGER,
    mime_type VARCHAR(100),
    status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'aprovado', 'rejeitado')),
    motivo_rejeicao TEXT,
    aprovado_por INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
    data_aprovacao TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_documentos_venda ON documentos(venda_id);
CREATE INDEX idx_documentos_status ON documentos(status);
```

---

### 6️⃣ Tabela: `comunicacao`
Timeline de mensagens e ações.

```sql
CREATE TABLE comunicacao (
    id SERIAL PRIMARY KEY,
    venda_id INTEGER NOT NULL REFERENCES vendas(id) ON DELETE CASCADE,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('mensagem', 'acao', 'sistema')),
    mensagem TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_comunicacao_venda ON comunicacao(venda_id);
CREATE INDEX idx_comunicacao_created ON comunicacao(created_at DESC);
```

**Tipos:**
- **mensagem**: Mensagem de usuário
- **acao**: Ação manual registrada (ex: "Ligou para cliente")
- **sistema**: Ação automática (ex: "Status alterado para aprovado")

---

### 7️⃣ Tabela: `lancamentos_financeiros`
Lançamentos financeiros das vendas.

```sql
CREATE TABLE lancamentos_financeiros (
    id SERIAL PRIMARY KEY,
    venda_id INTEGER NOT NULL REFERENCES vendas(id) ON DELETE CASCADE,
    tipo VARCHAR(50) NOT NULL, -- Ex: 'entrada', 'comissao', 'pagamento_fornecedor'
    descricao VARCHAR(200) NOT NULL,
    valor DECIMAL(12, 2) NOT NULL, -- Positivo = entrada, Negativo = saída
    beneficiario VARCHAR(150), -- Nome do beneficiário (vendedor, fornecedor)
    data_vencimento DATE NOT NULL,
    data_pagamento DATE,
    status VARCHAR(20) DEFAULT 'previsto' CHECK (status IN ('previsto', 'pendente', 'pago', 'recebido', 'cancelado')),
    forma_pagamento VARCHAR(30), -- 'pix', 'transferencia', 'boleto'
    observacoes TEXT,
    simulacao BOOLEAN DEFAULT false, -- true = simulação, false = definitivo
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_lancamentos_venda ON lancamentos_financeiros(venda_id);
CREATE INDEX idx_lancamentos_status ON lancamentos_financeiros(status);
CREATE INDEX idx_lancamentos_vencimento ON lancamentos_financeiros(data_vencimento);
```

---

### 8️⃣ Tabela: `cartas_disponiveis`
Cartas de consórcio disponíveis para venda.

```sql
CREATE TABLE cartas_disponiveis (
    id SERIAL PRIMARY KEY,
    administradora_id INTEGER NOT NULL REFERENCES administradoras(id) ON DELETE CASCADE,
    tipo_bem VARCHAR(20) NOT NULL CHECK (tipo_bem IN ('imovel', 'automovel', 'servicos')),
    valor_credito DECIMAL(12, 2) NOT NULL,
    valor_lance DECIMAL(12, 2), -- Se carta com lance
    parcelas_pagas INTEGER DEFAULT 0,
    parcelas_totais INTEGER NOT NULL,
    valor_parcela DECIMAL(12, 2),
    desconto_percentual DECIMAL(5, 2), -- Ex: 15.00 para 15%
    disponivel BOOLEAN DEFAULT true,
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_cartas_tipo ON cartas_disponiveis(tipo_bem);
CREATE INDEX idx_cartas_disponivel ON cartas_disponiveis(disponivel);
CREATE INDEX idx_cartas_valor ON cartas_disponiveis(valor_credito);
```

---

### 9️⃣ Tabela: `historico_status`
Histórico de mudanças de status das vendas.

```sql
CREATE TABLE historico_status (
    id SERIAL PRIMARY KEY,
    venda_id INTEGER NOT NULL REFERENCES vendas(id) ON DELETE CASCADE,
    status_anterior VARCHAR(20),
    status_novo VARCHAR(20) NOT NULL,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
    observacao TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_historico_venda ON historico_status(venda_id);
```

---

### 🔟 Tabela: `configuracoes`
Configurações gerais do sistema.

```sql
CREATE TABLE configuracoes (
    id SERIAL PRIMARY KEY,
    chave VARCHAR(100) UNIQUE NOT NULL,
    valor TEXT,
    descricao TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Configurações iniciais
INSERT INTO configuracoes (chave, valor, descricao) VALUES
('comissao_vendedor_percentual', '5.0', 'Percentual de comissão do vendedor'),
('taxa_administrativa_percentual', '2.0', 'Percentual de taxa administrativa'),
('meta_vendas_mensal', '3000000', 'Meta de vendas do mês em reais'),
('email_notificacao', 'contato@credcerto.com', 'Email para notificações do sistema');
```

---

## 🔗 Relacionamentos

```
usuarios (1) -----> (N) vendas [vendedor_id]
clientes (1) -----> (N) vendas [cliente_id]
administradoras (1) -> (N) vendas [administradora_id]
administradoras (1) -> (N) cartas_disponiveis

vendas (1) --------> (N) documentos
vendas (1) --------> (N) comunicacao
vendas (1) --------> (N) lancamentos_financeiros
vendas (1) --------> (N) historico_status

usuarios (1) -----> (N) comunicacao [usuario_id]
usuarios (1) -----> (N) documentos [aprovado_por]
usuarios (1) -----> (N) historico_status [usuario_id]
```

---

## 📈 Queries Comuns (Exemplos)

### Dashboard - Vendas do Mês
```sql
SELECT 
    COUNT(*) as total_vendas,
    SUM(valor_credito) as valor_total,
    AVG(valor_credito) as ticket_medio
FROM vendas
WHERE 
    EXTRACT(MONTH FROM data_abertura) = EXTRACT(MONTH FROM CURRENT_DATE)
    AND EXTRACT(YEAR FROM data_abertura) = EXTRACT(YEAR FROM CURRENT_DATE);
```

### Melhores Vendedores
```sql
SELECT 
    u.nome,
    COUNT(v.id) as total_vendas,
    SUM(v.valor_credito) as valor_total
FROM usuarios u
INNER JOIN vendas v ON v.vendedor_id = u.id
WHERE v.status IN ('aprovado', 'finalizado')
    AND EXTRACT(MONTH FROM v.data_abertura) = EXTRACT(MONTH FROM CURRENT_DATE)
GROUP BY u.id, u.nome
ORDER BY valor_total DESC
LIMIT 10;
```

### Vendas com Cliente e Vendedor
```sql
SELECT 
    v.codigo,
    c.nome as cliente_nome,
    c.telefone as cliente_telefone,
    u.nome as vendedor_nome,
    v.tipo_bem,
    v.valor_credito,
    v.status,
    v.data_abertura
FROM vendas v
INNER JOIN clientes c ON c.id = v.cliente_id
INNER JOIN usuarios u ON u.id = v.vendedor_id
ORDER BY v.data_abertura DESC;
```

---

## 🔐 Segurança e Boas Práticas

### 1. Senhas
- ✅ Usar bcrypt com salt rounds >= 10
- ✅ Nunca armazenar senha em texto plano
- ✅ Política de senha forte (mínimo 8 caracteres)

### 2. Autenticação
- ✅ JWT com expiração (15min access + 7d refresh)
- ✅ Logout deve invalidar tokens
- ✅ Rate limiting no login

### 3. Autorização
- ✅ Verificar permissões em cada endpoint
- ✅ Vendedor só vê suas próprias vendas
- ✅ Admin vê tudo

### 4. Dados Sensíveis
- ✅ CPF deve ser criptografado ou mascarado
- ✅ LGPD: permitir exclusão de dados
- ✅ Logs de acesso a dados pessoais

### 5. Backup
- ✅ Backup automático diário
- ✅ Retenção de 30 dias mínimo
- ✅ Testar restore regularmente

---

## 🚀 Scripts de Migração

### Schema completo PostgreSQL
Arquivo: `schema.sql` (criar separadamente)

### Dados de exemplo (seed)
Arquivo: `seed.sql` (criar separadamente)

---

## 📦 ORMs Recomendados

### Para PostgreSQL:
1. **Prisma** (Recomendado)
   - Type-safe
   - Migrations automáticas
   - Studio visual

2. **Sequelize**
   - Maduro e estável
   - Grande comunidade

### Para MongoDB:
1. **Mongoose**
   - Schemas flexíveis
   - Validações integradas

---

**Próximo Passo:** Ver arquivo `BACKEND-API.md` para especificação completa da API REST.
