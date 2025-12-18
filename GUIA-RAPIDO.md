# 🚀 Guia Rápido - CRM Cred Certo

## Como Começar

### 1️⃣ Abrir o Sistema
- Dê um duplo clique no arquivo **`index.html`**
- O sistema abrirá no seu navegador padrão
- **Não precisa de instalação ou servidor!**

## 📱 Navegação Básica

### Menu Lateral (Sidebar)
Use os botões da esquerda para navegar entre módulos:
- 📊 **Dashboard**: Visão geral das vendas e estatísticas
- 🤝 **Vendas**: Pipeline visual e lista completa de vendas
- 👥 **Clientes**: (Em desenvolvimento)
- 📄 **Cartas**: (Em desenvolvimento)
- 💰 **Financeiro**: (Em desenvolvimento)
- 📈 **Relatórios**: (Em desenvolvimento)
- ⚙️ **Configurações**: (Em desenvolvimento)

## 🎯 Funcionalidades Principais

### 📊 Dashboard
**O que você vê:**
- Cards com total de vendas do mês
- Vendas de hoje
- Taxa de conversão
- Ticket médio
- Gráfico de evolução diária
- Gráfico por tipo de bem
- Ranking dos melhores vendedores

**O que pode fazer:**
- Visualizar estatísticas em tempo real
- Acompanhar performance da equipe

---

### 🤝 Módulo de Vendas

#### Pipeline Visual
**4 Colunas:**
1. **Novos Leads** (azul) - Leads que acabaram de entrar
2. **Em Negociação** (amarelo) - Vendas sendo trabalhadas
3. **Aprovadas** (verde) - Vendas aprovadas
4. **Perdidas** (vermelho) - Vendas não concretizadas

**Como usar:**
- Clique em qualquer card para ver detalhes
- Visualize rapidamente o status de cada venda

#### Tabela de Vendas
**Informações mostradas:**
- ID da venda
- Nome do cliente
- Tipo de bem (Imóvel/Automóvel/Serviços)
- Valor do crédito
- Status atual
- Vendedor responsável
- Data de abertura

**Ações:**
- Clique no botão "Ver" para abrir os detalhes completos

---

### 📋 Detalhes da Venda (Página de Administração)

#### 1. Resumo da Venda
**Informações exibidas:**
- Dados completos do cliente (nome, telefone, email)
- Detalhes do negócio (tipo de bem, valor, origem do lead)
- Responsáveis (vendedor, administradora, fornecedor)
- Observações importantes

#### 2. Status da Negociação
**O que você vê:**
- Barra de progresso visual
- Etapa atual do processo
- Botões para alterar status e ver histórico

#### 3. 📂 Documentação do Cliente
**Como funciona:**
1. Clique no botão **"Upload"** no canto superior direito
2. Digite o tipo de documento (ex: "RG", "CPF", "Comprovante de Renda")
3. O documento será adicionado à lista
4. Status: Pendente → Aprovado

**Documentos comuns:**
- RG e CPF
- Comprovante de Residência
- Comprovante de Renda
- Extratos bancários

#### 4. 💬 Comunicação Interna
**Como usar:**
1. Role até o final da seção
2. Digite sua mensagem na caixa de texto
3. Clique em **"Enviar Mensagem"**
4. A mensagem aparecerá na timeline

**Tipos de mensagens:**
- 💬 Mensagens de usuários (fundo cinza claro)
- ⚡ Ações automáticas do sistema (fundo azul claro)

**Para que serve:**
- Comunicação entre vendas e administrativo
- Registro de ações importantes
- Histórico completo da negociação

#### 5. 💰 Financeiro da Venda

**Passo 1: Simular Lançamentos**
1. Clique no botão **"Simular"**
2. O sistema gera automaticamente:
   - ✅ Entrada do cliente (verde)
   - ❌ Comissão do vendedor (vermelho)
   - ❌ Pagamento ao fornecedor (vermelho)
   - ❌ Taxas administrativas (vermelho)
   - ✅ Lucro líquido (verde)

**Passo 2: Confirmar Lançamentos**
1. Revise a simulação
2. Clique em **"Confirmar Lançamentos"**
3. Os lançamentos se tornam definitivos
4. Não podem mais ser alterados

**Importante:**
- ⚠️ Simulação = apenas previsão
- ✅ Definitivo = lançamento confirmado

---

## 🎨 Entendendo as Cores

### Status das Vendas
- 🔵 **Azul (Novo)**: Lead recém chegado
- 🟡 **Amarelo (Negociação)**: Em processo de venda
- 🟢 **Verde (Aprovado)**: Venda aprovada
- 🔴 **Vermelho (Perdido)**: Venda não concretizada
- 🟢 **Verde Escuro (Finalizado)**: Venda completamente finalizada

### Indicadores
- 📈 **Seta para cima** (verde): Crescimento positivo
- 📉 **Seta para baixo** (vermelha): Queda

---

## 🔍 Dados de Exemplo

O sistema vem com **8 vendas de exemplo**:

1. **V001** - João Pedro Almeida (Imóvel R$ 250k) - Em negociação
2. **V002** - Maria Fernanda Costa (Automóvel R$ 85k) - Aprovado
3. **V003** - Carlos Eduardo Silva (Imóvel R$ 450k) - Novo
4. **V004** - Ana Paula Rodrigues (Automóvel R$ 120k) - Em negociação
5. **V005** - Roberto Mendes Santos (Imóvel R$ 680k) - Finalizado
6. **V006** - Fernanda Lima Oliveira (Serviços R$ 95k) - Perdido
7. **V007** - Paulo Henrique Costa (Automóvel R$ 155k) - Aprovado
8. **V008** - Juliana Martins Pereira (Imóvel R$ 380k) - Novo

**Vendas recomendadas para testar:**
- **V001**: Tem documentos e mensagens para visualizar
- **V002**: Tem financeiro confirmado (completo)

---

## ⚡ Dicas Rápidas

### ✅ O que PODE fazer agora:
- Navegar entre todas as páginas
- Ver detalhes de qualquer venda
- Simular upload de documentos
- Enviar mensagens na timeline
- Simular e confirmar lançamentos financeiros
- Visualizar gráficos e estatísticas

### ❌ O que ainda NÃO está implementado:
- Criar novas vendas (precisa de backend)
- Login de usuários
- Editar informações
- Deletar vendas
- Upload real de arquivos
- Integração com WhatsApp
- Módulos: Clientes, Cartas, Relatórios, Configurações

---

## 🐛 Problemas Comuns

### O gráfico não aparece?
- Certifique-se de ter internet (usa Chart.js via CDN)
- Recarregue a página (F5)

### Botões não funcionam?
- Verifique se todos os arquivos JS estão na pasta `assets/js/`
- Abra o Console do navegador (F12) para ver erros

### Layout quebrado?
- Verifique se o arquivo `assets/css/main.css` existe
- Tente limpar o cache do navegador (Ctrl + Shift + Delete)

---

## 📞 Próximos Passos

### Para tornar o sistema real, você precisa:

1. **Backend (Servidor)**
   - Node.js / PHP / Firebase / Supabase
   - Banco de dados para armazenar vendas, clientes, documentos

2. **Autenticação**
   - Sistema de login
   - Perfis de usuário (Admin, Vendedor, Financeiro)

3. **APIs**
   - Criar, editar, deletar vendas
   - Upload real de arquivos
   - Integração com WhatsApp

**💡 Posso ajudar com:**
- Desenhar o banco de dados
- Definir a API REST
- Preparar o frontend para integração
- Sugerir a melhor stack tecnológica

---

## 🎯 Resumo Ultra Rápido

1. Abra `index.html` no navegador
2. Clique em **Vendas** no menu lateral
3. Clique em **Ver** em qualquer venda
4. Teste: Upload de documentos, Enviar mensagens, Simular financeiro
5. Explore o **Dashboard** para ver estatísticas

**Pronto! Você já sabe usar o CRM! 🚀**

---

**Desenvolvido para Cred Certo - Cartas Contempladas** 💙
