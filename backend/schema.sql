-- Schema SQL completo para CRM Cred Certo
-- Para usar no Supabase, copie e cole este conteúdo no SQL Editor

-- Tabela 1: Usuários
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

-- Tabela 2: Clientes
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
  renda_mensal DECIMAL(12,2),
  estado_civil VARCHAR(20) CHECK (estado_civil IN ('solteiro', 'casado', 'divorciado', 'viuvo', 'uniao_estavel')),
  observacoes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_clientes_cpf ON clientes(cpf);
CREATE INDEX idx_clientes_nome ON clientes(nome);

-- Tabela 3: Administradoras
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

INSERT INTO administradoras (nome, telefone) VALUES
('Embracon', '(11) 3003-0000'),
('Rodobens', '(11) 3004-0000'),
('Porto Seguro', '(11) 3005-0000'),
('Bradesco Consórcios', '(11) 3006-0000');

-- Tabela 4: Vendas (núcleo do sistema)
CREATE TABLE vendas (
  id SERIAL PRIMARY KEY,
  codigo VARCHAR(20) UNIQUE NOT NULL,
  cliente_id INTEGER NOT NULL REFERENCES clientes(id) ON DELETE RESTRICT,
  vendedor_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE RESTRICT,
  administradora_id INTEGER REFERENCES administradoras(id) ON DELETE SET NULL,
  tipo_bem VARCHAR(20) NOT NULL CHECK (tipo_bem IN ('imovel', 'automovel', 'servicos')),
  valor_credito DECIMAL(12,2) NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('novo', 'negociacao', 'aprovado', 'perdido', 'finalizado')),
  etapa VARCHAR(50) DEFAULT 'primeiro_contato',
  origem VARCHAR(50),
  fornecedor VARCHAR(150),
  observacoes TEXT,
  motivo_perda TEXT,
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

-- Tabela 5: Documentos
CREATE TABLE documentos (
  id SERIAL PRIMARY KEY,
  venda_id INTEGER NOT NULL REFERENCES vendas(id) ON DELETE CASCADE,
  tipo VARCHAR(100) NOT NULL,
  nome_arquivo VARCHAR(255) NOT NULL,
  url_arquivo VARCHAR(500) NOT NULL,
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

-- Tabela 6: Comunicação (timeline)
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

-- Tabela 7: Lançamentos Financeiros
CREATE TABLE lancamentos_financeiros (
  id SERIAL PRIMARY KEY,
  venda_id INTEGER NOT NULL REFERENCES vendas(id) ON DELETE CASCADE,
  tipo VARCHAR(50) NOT NULL,
  descricao VARCHAR(200) NOT NULL,
  valor DECIMAL(12,2) NOT NULL,
  beneficiario VARCHAR(150),
  data_vencimento DATE NOT NULL,
  data_pagamento DATE,
  status VARCHAR(20) DEFAULT 'previsto' CHECK (status IN ('previsto', 'pendente', 'pago', 'recebido', 'cancelado')),
  forma_pagamento VARCHAR(30),
  observacoes TEXT,
  simulacao BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_lancamentos_venda ON lancamentos_financeiros(venda_id);
CREATE INDEX idx_lancamentos_status ON lancamentos_financeiros(status);
CREATE INDEX idx_lancamentos_vencimento ON lancamentos_financeiros(data_vencimento);

-- Tabela 8: Cartas Disponíveis
CREATE TABLE cartas_disponiveis (
  id SERIAL PRIMARY KEY,
  administradora_id INTEGER NOT NULL REFERENCES administradoras(id) ON DELETE CASCADE,
  tipo_bem VARCHAR(20) NOT NULL CHECK (tipo_bem IN ('imovel', 'automovel', 'servicos')),
  valor_credito DECIMAL(12,2) NOT NULL,
  valor_lance DECIMAL(12,2),
  parcelas_pagas INTEGER DEFAULT 0,
  parcelas_totais INTEGER NOT NULL,
  valor_parcela DECIMAL(12,2),
  desconto_percentual DECIMAL(5,2),
  disponivel BOOLEAN DEFAULT true,
  observacoes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_cartas_tipo ON cartas_disponiveis(tipo_bem);
CREATE INDEX idx_cartas_disponivel ON cartas_disponiveis(disponivel);
CREATE INDEX idx_cartas_valor ON cartas_disponiveis(valor_credito);

-- Tabela 9: Histórico de Status
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

-- Tabela 10: Configurações
CREATE TABLE configuracoes (
  id SERIAL PRIMARY KEY,
  chave VARCHAR(100) UNIQUE NOT NULL,
  valor TEXT,
  descricao TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO configuracoes (chave, valor, descricao) VALUES
('comissao_vendedor_percentual', '5.0', 'Percentual de comissão do vendedor'),
('taxa_administrativa_percentual', '2.0', 'Percentual de taxa administrativa'),
('meta_vendas_mensal', '3000000', 'Meta de vendas do mês em reais'),
('email_notificacao', 'contato@credcerto.com', 'Email para notificações do sistema');

-- Criar usuário admin padrão (ALTERE A SENHA!)
-- Senha: admin123 (hash bcrypt)
INSERT INTO usuarios (nome, email, senha_hash, perfil) VALUES
('Administrador', 'admin@credcerto.com', '$2b$10$YOUR_BCRYPT_HASH_HERE', 'admin');
