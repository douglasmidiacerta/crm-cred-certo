<<<<<<< HEAD
# crm-cred-certo
=======
# CRM Cred Certo - Cartas Contempladas

Sistema de CRM completo para gestão de vendas de cartas contempladas de consórcio.

## 🎯 Características Implementadas

### ✅ Estrutura Completa do Front-End

#### 1. Dashboard Geral
- Cards informativos com estatísticas de vendas
- Gráfico de evolução diária de vendas
- Gráfico de vendas por tipo de bem (Imóvel, Automóvel, Serviços)
- Ranking dos melhores vendedores do mês
- Filtros por período

#### 2. Módulo de Vendas
- **Pipeline Visual** com 4 colunas:
  - Novos Leads
  - Em Negociação
  - Aprovadas
  - Perdidas
- Tabela completa de todas as vendas
- Navegação para detalhes de cada venda

#### 3. Administração da Venda (Detalhes)
- **Resumo Completo** com:
  - Dados do cliente (nome, telefone, email)
  - Detalhes do negócio (tipo de bem, crédito, origem)
  - Responsáveis (vendedor, administradora, fornecedor)
  - Observações
  
- **Status da Negociação**:
  - Indicador visual de progresso
  - Etapa atual do processo
  - Botões para alterar status

- **Documentação do Cliente**:
  - Upload simulado de documentos
  - Lista de documentos enviados
  - Status de aprovação (aprovado/pendente)
  
- **Comunicação Interna**:
  - Timeline de mensagens entre admin e vendas
  - Histórico de ações automáticas
  - Campo para enviar novas mensagens
  
- **Financeiro da Venda**:
  - Simulação de lançamentos financeiros
  - Cálculo automático de entrada, comissões, pagamentos e lucro
  - Confirmação de lançamentos definitivos

#### 4. Layout Profissional
- Sidebar fixa com navegação
- Design responsivo
- Identidade visual consistente (azul #1e3a8a)
- Ícones Font Awesome
- Animações suaves

## 📁 Estrutura de Arquivos

```
CRM-Cred-Certo/
├── index.html                    # Página principal
├── README.md                     # Este arquivo
├── assets/
│   ├── css/
│   │   └── main.css             # Estilos globais
│   └── js/
│       ├── data.js              # Dados mock e funções auxiliares
│       ├── router.js            # Sistema de rotas
│       ├── main.js              # Páginas e inicialização
│       └── venda-detalhe.js     # Página de detalhes da venda
```

## 🚀 Como Usar

1. **Abrir o sistema**:
   - Abra o arquivo `index.html` em qualquer navegador moderno
   - Não precisa de servidor (funciona localmente)

2. **Navegar pelo sistema**:
   - Use a sidebar para trocar entre módulos
   - Dashboard mostra visão geral das vendas
   - Vendas mostra pipeline e lista completa
   - Clique em "Ver" para acessar detalhes de uma venda

3. **Testar funcionalidades**:
   - **Upload de documentos**: Clique em "Upload" na seção de documentação
   - **Enviar mensagens**: Digite no campo e clique em "Enviar Mensagem"
   - **Simular financeiro**: Clique em "Simular" para gerar lançamentos
   - **Confirmar lançamentos**: Após simular, clique em "Confirmar Lançamentos"

## 📊 Dados de Exemplo

O sistema vem com dados de exemplo (mock data) incluindo:
- 8 vendas em diferentes status
- Documentos de clientes
- Histórico de comunicação
- Lançamentos financeiros
- 4 vendedores
- Estatísticas do dashboard

## 🎨 Identidade Visual

**Cores Principais:**
- Azul Primário: `#1e3a8a` (Cred Certo)
- Azul Claro: `#3b82f6` (Destaques)
- Verde: `#10b981` (Sucesso/Aprovado)
- Amarelo: `#f59e0b` (Atenção/Negociação)
- Vermelho: `#ef4444` (Perigo/Perdido)

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilização moderna com variáveis CSS
- **JavaScript (Vanilla)**: Lógica e interatividade
- **Chart.js**: Gráficos interativos
- **Font Awesome**: Ícones

## 📋 Próximas Etapas (Backend)

### Recomendações para Desenvolvimento

1. **Escolher Stack Backend**:
   - **Opção 1**: Node.js + Express + MongoDB
   - **Opção 2**: PHP + Laravel + MySQL
   - **Opção 3**: Firebase (mais rápido para MVP)
   - **Opção 4**: Supabase (PostgreSQL + Auth integrado)

2. **Banco de Dados - Tabelas Necessárias**:
   ```
   - usuarios (id, nome, email, senha, perfil, foto)
   - vendas (id, cliente_id, tipo_bem, credito, status, vendedor_id, etc.)
   - clientes (id, nome, cpf, telefone, email, endereco, etc.)
   - documentos (id, venda_id, tipo, arquivo_url, status, data_envio)
   - comunicacao (id, venda_id, usuario_id, mensagem, tipo, data)
   - lancamentos_financeiros (id, venda_id, tipo, valor, vencimento, status)
   - cartas (id, tipo_bem, credito, administradora, disponivel)
   ```

3. **API REST - Endpoints Principais**:
   ```
   GET    /api/vendas                  # Listar vendas
   GET    /api/vendas/:id              # Detalhes da venda
   POST   /api/vendas                  # Criar venda
   PUT    /api/vendas/:id              # Atualizar venda
   DELETE /api/vendas/:id              # Excluir venda
   
   POST   /api/documentos              # Upload documento
   GET    /api/documentos/:venda_id    # Listar documentos
   
   POST   /api/comunicacao             # Enviar mensagem
   GET    /api/comunicacao/:venda_id   # Listar mensagens
   
   POST   /api/financeiro/simular      # Simular lançamentos
   POST   /api/financeiro/confirmar    # Confirmar lançamentos
   ```

4. **Autenticação**:
   - Implementar login com JWT
   - Definir permissões por perfil:
     - **Admin**: Acesso total
     - **Vendedor**: Suas vendas + criar novas
     - **Financeiro**: Módulo financeiro + relatórios

5. **Integrações Futuras**:
   - WhatsApp Business API (envio de notificações)
   - Upload real de arquivos (S3, Cloudinary)
   - Exportação de relatórios (PDF, Excel)
   - Integração bancária (webhooks)

## 💡 Vantagens da Estrutura Atual

✅ **Organização Clara**: Arquivos separados por responsabilidade  
✅ **Código Limpo**: Fácil de ler e manter  
✅ **Escalável**: Pronto para conectar com backend  
✅ **Sem Dependências Pesadas**: Apenas Chart.js e Font Awesome  
✅ **Reutilizável**: Funções auxiliares centralizadas  
✅ **Profissional**: Design moderno e responsivo  

## 🎓 Suporte

Para dúvidas ou sugestões sobre o desenvolvimento backend:
- Posso ajudar a desenhar o modelo de dados
- Definir a arquitetura da API REST
- Preparar o frontend para integração
- Sugerir melhores práticas de segurança

---

**Desenvolvido para Cred Certo - Cartas Contempladas** 🎯
>>>>>>> 1b9625d (Initial commit - CRM Cred Certo completo)
