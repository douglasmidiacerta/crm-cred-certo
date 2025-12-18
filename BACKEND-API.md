# 🚀 Especificação da API REST - CRM Cred Certo

## 📋 Informações Gerais

**Base URL:** `https://api.credcerto.com.br/v1`  
**Formato:** JSON  
**Autenticação:** JWT Bearer Token  
**Rate Limit:** 100 requisições/minuto por IP

---

## 🔐 Autenticação

### POST `/auth/login`
Login de usuário.

**Request:**
```json
{
  "email": "joao@credcerto.com",
  "senha": "senha123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "nome": "João Silva",
      "email": "joao@credcerto.com",
      "perfil": "vendedor",
      "foto_url": null
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 900
  }
}
```

**Errors:**
- `401`: Credenciais inválidas
- `429`: Muitas tentativas

---

### POST `/auth/refresh`
Renovar access token.

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 900
  }
}
```

---

### POST `/auth/logout`
Logout (invalidar tokens).

**Headers:** `Authorization: Bearer {token}`

**Response (200):**
```json
{
  "success": true,
  "message": "Logout realizado com sucesso"
}
```

---

### POST `/auth/register`
Registrar novo usuário (apenas Admin).

**Headers:** `Authorization: Bearer {token}`

**Request:**
```json
{
  "nome": "Maria Santos",
  "email": "maria@credcerto.com",
  "senha": "senha123",
  "perfil": "vendedor",
  "telefone": "(11) 98765-4321"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 5,
    "nome": "Maria Santos",
    "email": "maria@credcerto.com",
    "perfil": "vendedor"
  }
}
```

---

## 👥 Usuários

### GET `/usuarios`
Listar todos os usuários (apenas Admin).

**Headers:** `Authorization: Bearer {token}`

**Query Params:**
- `perfil` (string): Filtrar por perfil
- `ativo` (boolean): Apenas ativos/inativos
- `page` (int): Página (default: 1)
- `limit` (int): Itens por página (default: 20)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "usuarios": [
      {
        "id": 1,
        "nome": "João Silva",
        "email": "joao@credcerto.com",
        "perfil": "vendedor",
        "telefone": "(11) 98765-4321",
        "ativo": true,
        "created_at": "2024-01-01T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 5,
      "totalPages": 1
    }
  }
}
```

---

### GET `/usuarios/:id`
Obter usuário por ID.

**Headers:** `Authorization: Bearer {token}`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@credcerto.com",
    "perfil": "vendedor",
    "telefone": "(11) 98765-4321",
    "foto_url": null,
    "ativo": true,
    "created_at": "2024-01-01T10:00:00Z",
    "ultimo_acesso": "2024-01-25T14:30:00Z"
  }
}
```

---

### PUT `/usuarios/:id`
Atualizar usuário.

**Headers:** `Authorization: Bearer {token}`

**Request:**
```json
{
  "nome": "João Pedro Silva",
  "telefone": "(11) 99999-9999",
  "foto_url": "https://..."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nome": "João Pedro Silva",
    "email": "joao@credcerto.com",
    "telefone": "(11) 99999-9999"
  }
}
```

---

### DELETE `/usuarios/:id`
Desativar usuário (soft delete).

**Headers:** `Authorization: Bearer {token}`

**Response (200):**
```json
{
  "success": true,
  "message": "Usuário desativado com sucesso"
}
```

---

## 💼 Vendas

### GET `/vendas`
Listar vendas.

**Headers:** `Authorization: Bearer {token}`

**Query Params:**
- `status` (string): Filtrar por status
- `vendedor_id` (int): Filtrar por vendedor
- `tipo_bem` (string): Filtrar por tipo
- `data_inicio` (date): Data inicial
- `data_fim` (date): Data final
- `search` (string): Buscar por cliente
- `page` (int): Página
- `limit` (int): Itens por página
- `sort` (string): Campo de ordenação (default: -data_abertura)

**Permissões:**
- **Vendedor:** Apenas suas vendas
- **Admin/Financeiro:** Todas as vendas

**Response (200):**
```json
{
  "success": true,
  "data": {
    "vendas": [
      {
        "id": 1,
        "codigo": "V001",
        "cliente": {
          "id": 1,
          "nome": "João Pedro Almeida",
          "telefone": "(11) 98765-4321",
          "email": "joao.almeida@email.com"
        },
        "vendedor": {
          "id": 2,
          "nome": "João Silva"
        },
        "administradora": {
          "id": 1,
          "nome": "Embracon"
        },
        "tipo_bem": "imovel",
        "valor_credito": 250000.00,
        "status": "negociacao",
        "etapa": "analise_credito",
        "origem": "Indicação",
        "fornecedor": "Construtora Alpha",
        "data_abertura": "2024-01-15",
        "created_at": "2024-01-15T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 8,
      "totalPages": 1
    },
    "stats": {
      "total_valor": 2450000.00,
      "total_vendas": 8,
      "ticket_medio": 306250.00
    }
  }
}
```

---

### GET `/vendas/:id`
Obter venda por ID (com todos os detalhes).

**Headers:** `Authorization: Bearer {token}`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "codigo": "V001",
    "cliente": {
      "id": 1,
      "nome": "João Pedro Almeida",
      "cpf": "123.456.789-00",
      "telefone": "(11) 98765-4321",
      "whatsapp": "(11) 98765-4321",
      "email": "joao.almeida@email.com",
      "endereco_completo": "Rua das Flores, 123 - São Paulo/SP"
    },
    "vendedor": {
      "id": 2,
      "nome": "João Silva",
      "email": "joao@credcerto.com"
    },
    "administradora": {
      "id": 1,
      "nome": "Embracon",
      "telefone": "(11) 3003-0000"
    },
    "tipo_bem": "imovel",
    "valor_credito": 250000.00,
    "status": "negociacao",
    "etapa": "analise_credito",
    "origem": "Indicação",
    "fornecedor": "Construtora Alpha",
    "observacoes": "Cliente interessado em apartamento na zona sul",
    "data_abertura": "2024-01-15",
    "documentos_count": 4,
    "comunicacao_count": 4,
    "lancamentos_count": 0,
    "created_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-20T14:30:00Z"
  }
}
```

---

### POST `/vendas`
Criar nova venda.

**Headers:** `Authorization: Bearer {token}`

**Request:**
```json
{
  "cliente_id": 1,
  "tipo_bem": "imovel",
  "valor_credito": 250000.00,
  "origem": "Facebook Ads",
  "administradora_id": 1,
  "fornecedor": "Construtora Alpha",
  "observacoes": "Cliente interessado em apartamento"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 9,
    "codigo": "V009",
    "cliente_id": 1,
    "vendedor_id": 2,
    "tipo_bem": "imovel",
    "valor_credito": 250000.00,
    "status": "novo",
    "data_abertura": "2024-01-26"
  },
  "message": "Venda criada com sucesso"
}
```

---

### PUT `/vendas/:id`
Atualizar venda.

**Headers:** `Authorization: Bearer {token}`

**Request:**
```json
{
  "status": "aprovado",
  "etapa": "aprovado_financeiro",
  "administradora_id": 2,
  "fornecedor": "Construtora Beta",
  "observacoes": "Aprovado pela análise de crédito"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "codigo": "V001",
    "status": "aprovado",
    "etapa": "aprovado_financeiro"
  },
  "message": "Venda atualizada com sucesso"
}
```

---

### DELETE `/vendas/:id`
Excluir venda (apenas Admin).

**Headers:** `Authorization: Bearer {token}`

**Response (200):**
```json
{
  "success": true,
  "message": "Venda excluída com sucesso"
}
```

---

### GET `/vendas/dashboard/stats`
Estatísticas para o dashboard.

**Headers:** `Authorization: Bearer {token}`

**Query Params:**
- `mes` (int): Mês (1-12)
- `ano` (int): Ano

**Response (200):**
```json
{
  "success": true,
  "data": {
    "vendas_mes": {
      "valor": 2450000.00,
      "quantidade": 18,
      "crescimento": 12.5,
      "meta": 3000000.00
    },
    "vendas_dia": {
      "valor": 85000.00,
      "quantidade": 2,
      "crescimento": -5.2
    },
    "taxa_conversao": {
      "valor": 32.5,
      "crescimento": 8.3
    },
    "ticket_medio": {
      "valor": 136111.11,
      "crescimento": 15.7
    },
    "vendas_por_status": {
      "novo": 2,
      "negociacao": 4,
      "aprovado": 8,
      "perdido": 2,
      "finalizado": 2
    },
    "vendas_por_tipo": {
      "imovel": { "quantidade": 8, "valor": 1200000.00 },
      "automovel": { "quantidade": 7, "valor": 980000.00 },
      "servicos": { "quantidade": 3, "valor": 270000.00 }
    },
    "evolucao_diaria": [
      { "dia": "01", "vendas": 2, "valor": 170000.00 },
      { "dia": "05", "vendas": 1, "valor": 95000.00 }
    ],
    "melhores_vendedores": [
      {
        "id": 2,
        "nome": "João Silva",
        "vendas": 6,
        "valor": 820000.00
      }
    ]
  }
}
```

---

## 👤 Clientes

### GET `/clientes`
Listar clientes.

**Headers:** `Authorization: Bearer {token}`

**Query Params:**
- `search` (string): Buscar por nome ou CPF
- `page` (int)
- `limit` (int)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "clientes": [
      {
        "id": 1,
        "nome": "João Pedro Almeida",
        "cpf": "123.456.789-00",
        "telefone": "(11) 98765-4321",
        "email": "joao.almeida@email.com",
        "vendas_count": 2,
        "created_at": "2024-01-15T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 10,
      "totalPages": 1
    }
  }
}
```

---

### GET `/clientes/:id`
Obter cliente por ID.

**Headers:** `Authorization: Bearer {token}`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nome": "João Pedro Almeida",
    "cpf": "123.456.789-00",
    "rg": "12.345.678-9",
    "data_nascimento": "1985-03-15",
    "telefone": "(11) 98765-4321",
    "whatsapp": "(11) 98765-4321",
    "email": "joao.almeida@email.com",
    "endereco": {
      "cep": "01234-567",
      "rua": "Rua das Flores",
      "numero": "123",
      "complemento": "Apt 45",
      "bairro": "Centro",
      "cidade": "São Paulo",
      "estado": "SP"
    },
    "profissao": "Engenheiro",
    "empresa": "Tech Corp",
    "renda_mensal": 15000.00,
    "estado_civil": "casado",
    "vendas": [
      {
        "id": 1,
        "codigo": "V001",
        "status": "negociacao",
        "valor_credito": 250000.00
      }
    ],
    "created_at": "2024-01-15T10:00:00Z"
  }
}
```

---

### POST `/clientes`
Criar novo cliente.

**Headers:** `Authorization: Bearer {token}`

**Request:**
```json
{
  "nome": "Maria Fernanda Costa",
  "cpf": "987.654.321-00",
  "telefone": "(11) 97654-3210",
  "email": "maria@email.com",
  "data_nascimento": "1990-05-20",
  "renda_mensal": 8000.00,
  "estado_civil": "solteiro"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 5,
    "nome": "Maria Fernanda Costa",
    "cpf": "987.654.321-00"
  },
  "message": "Cliente criado com sucesso"
}
```

---

### PUT `/clientes/:id`
Atualizar cliente.

**Headers:** `Authorization: Bearer {token}`

**Request:**
```json
{
  "telefone": "(11) 99999-9999",
  "email": "novo.email@email.com",
  "renda_mensal": 18000.00
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nome": "João Pedro Almeida",
    "telefone": "(11) 99999-9999"
  },
  "message": "Cliente atualizado com sucesso"
}
```

---

## 📄 Documentos

### GET `/vendas/:venda_id/documentos`
Listar documentos de uma venda.

**Headers:** `Authorization: Bearer {token}`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "documentos": [
      {
        "id": 1,
        "tipo": "RG",
        "nome_arquivo": "rg_joao_almeida.pdf",
        "url_arquivo": "https://storage.../rg_joao_almeida.pdf",
        "tamanho_bytes": 245678,
        "mime_type": "application/pdf",
        "status": "aprovado",
        "aprovado_por": {
          "id": 3,
          "nome": "Ana Costa"
        },
        "created_at": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

---

### POST `/vendas/:venda_id/documentos`
Upload de documento.

**Headers:** 
- `Authorization: Bearer {token}`
- `Content-Type: multipart/form-data`

**Request (Form Data):**
- `tipo` (string): Tipo do documento
- `arquivo` (file): Arquivo (PDF, JPG, PNG)

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 5,
    "tipo": "Comprovante de Renda",
    "nome_arquivo": "holerite_jan2024.pdf",
    "url_arquivo": "https://storage.../holerite_jan2024.pdf",
    "status": "pendente"
  },
  "message": "Documento enviado com sucesso"
}
```

---

### PUT `/documentos/:id/status`
Aprovar/rejeitar documento (apenas Financeiro/Admin).

**Headers:** `Authorization: Bearer {token}`

**Request:**
```json
{
  "status": "aprovado",
  "motivo_rejeicao": null
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 5,
    "status": "aprovado"
  },
  "message": "Status do documento atualizado"
}
```

---

### DELETE `/documentos/:id`
Excluir documento.

**Headers:** `Authorization: Bearer {token}`

**Response (200):**
```json
{
  "success": true,
  "message": "Documento excluído com sucesso"
}
```

---

## 💬 Comunicação

### GET `/vendas/:venda_id/comunicacao`
Listar mensagens/ações de uma venda.

**Headers:** `Authorization: Bearer {token}`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "comunicacao": [
      {
        "id": 1,
        "tipo": "mensagem",
        "usuario": {
          "id": 2,
          "nome": "João Silva",
          "perfil": "vendedor"
        },
        "mensagem": "Cliente enviou documentação inicial. Aguardando análise.",
        "created_at": "2024-01-15T15:30:00Z"
      },
      {
        "id": 2,
        "tipo": "acao",
        "usuario": null,
        "mensagem": "Documentos RG e CPF aprovados automaticamente.",
        "created_at": "2024-01-15T15:35:00Z"
      }
    ]
  }
}
```

---

### POST `/vendas/:venda_id/comunicacao`
Adicionar mensagem/ação.

**Headers:** `Authorization: Bearer {token}`

**Request:**
```json
{
  "tipo": "mensagem",
  "mensagem": "Cliente ligou perguntando sobre o andamento."
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 10,
    "tipo": "mensagem",
    "mensagem": "Cliente ligou perguntando sobre o andamento.",
    "created_at": "2024-01-26T10:00:00Z"
  },
  "message": "Mensagem adicionada com sucesso"
}
```

---

## 💰 Financeiro

### GET `/vendas/:venda_id/lancamentos`
Listar lançamentos de uma venda.

**Headers:** `Authorization: Bearer {token}`

**Query Params:**
- `simulacao` (boolean): Apenas simulação ou definitivos

**Response (200):**
```json
{
  "success": true,
  "data": {
    "lancamentos": [
      {
        "id": 1,
        "tipo": "entrada",
        "descricao": "Entrada do Cliente",
        "valor": 25000.00,
        "beneficiario": null,
        "data_vencimento": "2024-02-01",
        "data_pagamento": null,
        "status": "previsto",
        "simulacao": false
      }
    ],
    "resumo": {
      "total_entradas": 25000.00,
      "total_saidas": 217500.00,
      "lucro_liquido": 7500.00
    }
  }
}
```

---

### POST `/vendas/:venda_id/lancamentos/simular`
Simular lançamentos financeiros.

**Headers:** `Authorization: Bearer {token}`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "lancamentos": [
      {
        "tipo": "entrada",
        "descricao": "Entrada do Cliente",
        "valor": 25000.00,
        "data_vencimento": "2024-02-01",
        "status": "previsto"
      },
      {
        "tipo": "comissao",
        "descricao": "Comissão Vendedor (5%)",
        "valor": -12500.00,
        "beneficiario": "João Silva",
        "data_vencimento": "2024-02-05",
        "status": "previsto"
      }
    ],
    "resumo": {
      "total_entradas": 25000.00,
      "total_saidas": 217500.00,
      "lucro_liquido": 7500.00
    }
  },
  "message": "Simulação gerada com sucesso"
}
```

---

### POST `/vendas/:venda_id/lancamentos/confirmar`
Confirmar lançamentos (tornar definitivos).

**Headers:** `Authorization: Bearer {token}`

**Request:**
```json
{
  "lancamentos": [1, 2, 3, 4, 5]
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "lancamentos_confirmados": 5
  },
  "message": "Lançamentos confirmados com sucesso"
}
```

---

### PUT `/lancamentos/:id`
Atualizar lançamento (marcar como pago, etc).

**Headers:** `Authorization: Bearer {token}`

**Request:**
```json
{
  "status": "pago",
  "data_pagamento": "2024-01-25",
  "forma_pagamento": "pix"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "status": "pago",
    "data_pagamento": "2024-01-25"
  },
  "message": "Lançamento atualizado"
}
```

---

## 📊 Relatórios

### GET `/relatorios/vendas`
Relatório de vendas.

**Headers:** `Authorization: Bearer {token}`

**Query Params:**
- `data_inicio` (date)
- `data_fim` (date)
- `vendedor_id` (int)
- `status` (string)
- `formato` (string): 'json' ou 'pdf'

**Response (200):**
```json
{
  "success": true,
  "data": {
    "periodo": {
      "inicio": "2024-01-01",
      "fim": "2024-01-31"
    },
    "resumo": {
      "total_vendas": 18,
      "valor_total": 2450000.00,
      "ticket_medio": 136111.11
    },
    "por_status": {
      "novo": 2,
      "negociacao": 4,
      "aprovado": 8,
      "perdido": 2,
      "finalizado": 2
    },
    "por_vendedor": [
      {
        "vendedor": "João Silva",
        "vendas": 6,
        "valor": 820000.00
      }
    ]
  }
}
```

---

## 🔔 Notificações (Webhook - Futuro)

### POST `/webhooks/whatsapp`
Receber status de mensagens do WhatsApp.

**Request:**
```json
{
  "event": "message.sent",
  "message_id": "123456",
  "phone": "5511987654321",
  "status": "delivered"
}
```

---

## 📝 Padrões de Resposta

### Sucesso
```json
{
  "success": true,
  "data": { ... },
  "message": "Mensagem opcional"
}
```

### Erro
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Erro de validação",
    "details": [
      {
        "field": "email",
        "message": "Email inválido"
      }
    ]
  }
}
```

### Códigos HTTP
- `200`: Sucesso
- `201`: Criado
- `400`: Bad Request (validação)
- `401`: Não autorizado
- `403`: Proibido (sem permissão)
- `404`: Não encontrado
- `429`: Rate limit excedido
- `500`: Erro interno

---

## 🔐 Headers Obrigatórios

Todas as requisições (exceto `/auth/login`):
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

---

**Próximo Passo:** Implementar o backend seguindo esta especificação.
