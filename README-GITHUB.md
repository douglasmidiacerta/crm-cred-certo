# 💼 CRM Cred Certo - Cartas Contempladas

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SEU-USUARIO/crm-cred-certo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML](https://img.shields.io/badge/HTML-5-E34F26?logo=html5)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS-3-1572B6?logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> Sistema CRM completo para gestão de vendas de cartas contempladas de consórcio.

**🌐 Demo Online:** [https://crm-cred-certo.vercel.app](https://crm-cred-certo.vercel.app)

---

## 📸 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x400/1e3a8a/ffffff?text=Dashboard+com+Gr%C3%A1ficos+e+Estat%C3%ADsticas)

### Pipeline de Vendas
![Pipeline](https://via.placeholder.com/800x400/3b82f6/ffffff?text=Pipeline+Visual+de+Vendas)

### Detalhes da Venda
![Detalhes](https://via.placeholder.com/800x400/10b981/ffffff?text=Gest%C3%A3o+Completa+da+Venda)

---

## ✨ Funcionalidades

### 📊 Dashboard
- Cards com estatísticas em tempo real
- Gráfico de evolução diária de vendas (Chart.js)
- Gráfico de vendas por tipo de bem
- Ranking dos melhores vendedores do mês
- Indicadores de crescimento

### 🤝 Gestão de Vendas
- **Pipeline Visual**: Kanban com 4 colunas (Novos, Negociação, Aprovadas, Perdidas)
- **Criar Nova Venda**: Modal completo com validação
- **Editar Venda**: Atualização de dados e status
- **Filtros Avançados**: Busca por cliente, status, tipo e vendedor
- **Detalhes Completos**: Visão 360° de cada venda

### 📋 Administração da Venda
- Resumo completo (cliente, negócio, responsáveis)
- Status e progresso visual
- Upload de documentos (simulado)
- Timeline de comunicação interna
- Simulação e confirmação de lançamentos financeiros

### 💰 Financeiro
- Simulação automática de lançamentos
- Cálculo de comissões e taxas
- Confirmação de lançamentos definitivos
- Controle de entradas e saídas

### 📱 Mobile Responsivo
- Menu hamburger animado
- Sidebar deslizante
- Tabelas transformam em cards
- Layout otimizado para todos os dispositivos

### 🔔 Notificações
- Toast notifications customizadas
- Feedback visual de ações
- Animações suaves

---

## 🚀 Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna (Grid, Flexbox, Variáveis CSS)
- **JavaScript (Vanilla)** - Lógica e interatividade
- **Chart.js** - Gráficos interativos
- **Font Awesome** - Ícones

**Sem dependências pesadas!** Apenas bibliotecas essenciais via CDN.

---

## 📁 Estrutura do Projeto

```
crm-cred-certo/
├── index.html                    # Página principal
├── vercel.json                   # Configuração Vercel
├── .gitignore                    # Arquivos ignorados
│
├── assets/
│   ├── css/
│   │   └── main.css             # Estilos globais (19 KB)
│   │
│   └── js/
│       ├── data.js              # Dados mock (16 KB)
│       ├── modals.js            # Modais criar/editar (20 KB)
│       ├── filters.js           # Filtros avançados (6 KB)
│       ├── router.js            # Sistema de rotas (9 KB)
│       ├── main.js              # Páginas principais (21 KB)
│       └── venda-detalhe.js     # Detalhes da venda (16 KB)
│
└── docs/
    ├── README.md                # Documentação principal
    ├── DEPLOY.md                # Guia de deploy
    ├── GUIA-RAPIDO.md          # Manual do usuário
    ├── BACKEND-DATABASE.md      # Modelo de dados
    ├── BACKEND-API.md           # Especificação API
    └── FEEDBACK-SISTEMA.md      # Análise técnica
```

---

## 🎯 Como Usar

### Opção 1: Deploy Rápido (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SEU-USUARIO/crm-cred-certo)

1. Clique no botão acima
2. Faça login no Vercel com GitHub
3. Clique em "Deploy"
4. Pronto! Seu CRM está online ✨

### Opção 2: Executar Localmente

```bash
# 1. Clone o repositório
git clone https://github.com/SEU-USUARIO/crm-cred-certo.git

# 2. Entre na pasta
cd crm-cred-certo

# 3. Abra o index.html no navegador
# Ou use um servidor local:
npx serve
# ou
python -m http.server 8000
```

Acesse: `http://localhost:8000`

### Opção 3: Fork e Customize

1. Clique em **"Fork"** no canto superior direito
2. Clone seu fork
3. Faça suas modificações
4. Commit e push
5. Deploy no Vercel/Netlify

---

## 🔧 Configuração

### Personalizações Rápidas

**1. Cores da Marca** (`assets/css/main.css`)
```css
:root {
    --primary-color: #1e3a8a;      /* Azul principal */
    --primary-light: #3b82f6;      /* Azul claro */
    --secondary-color: #10b981;    /* Verde */
    --accent-color: #f59e0b;       /* Amarelo */
}
```

**2. Logo** (`index.html`)
```html
<h1 class="logo">Sua Empresa</h1>
<p class="logo-subtitle">Seu Slogan</p>
```

**3. Dados de Exemplo** (`assets/js/data.js`)
```javascript
// Edite o objeto mockData para adicionar seus dados
```

---

## 📚 Documentação

- **[README.md](README.md)** - Visão geral do projeto
- **[DEPLOY.md](DEPLOY.md)** - Guia completo de deploy (GitHub + Vercel)
- **[GUIA-RAPIDO.md](GUIA-RAPIDO.md)** - Manual do usuário
- **[BACKEND-DATABASE.md](BACKEND-DATABASE.md)** - Modelo do banco de dados (10 tabelas SQL)
- **[BACKEND-API.md](BACKEND-API.md)** - Especificação da API REST (40+ endpoints)
- **[FEEDBACK-SISTEMA.md](FEEDBACK-SISTEMA.md)** - Análise técnica detalhada

---

## 🗄️ Backend (Próxima Fase)

O frontend está **95% completo**! Para tornar o sistema totalmente funcional, você precisa de um backend.

**Opções recomendadas:**

### 1. Supabase (Mais Fácil) ⭐
```bash
- PostgreSQL gerenciado
- Autenticação pronta
- Storage de arquivos
- API REST automática
- Plano gratuito generoso
```

### 2. Firebase
```bash
- NoSQL (Firestore)
- Auth integrado
- Realtime por padrão
- Hosting incluso
```

### 3. Node.js + PostgreSQL
```bash
- Controle total
- Mais flexível
- Requer mais setup
```

**📖 Documentação completa:** Ver `BACKEND-DATABASE.md` e `BACKEND-API.md`

---

## 🎨 Customização

### Adicionar Novo Módulo

1. Criar função em `assets/js/main.js`:
```javascript
Pages.meuModulo = function() {
    return `<div>Meu conteúdo</div>`;
}
```

2. Adicionar rota em `assets/js/router.js`:
```javascript
case 'meu-modulo':
    contentArea.innerHTML = Pages.meuModulo();
    break;
```

3. Adicionar item no menu (`index.html`):
```html
<a href="#" class="nav-item" data-page="meu-modulo">
    <i class="fas fa-star"></i>
    <span>Meu Módulo</span>
</a>
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

---

## 📝 Roadmap

### ✅ Fase 1 - Frontend (Completo)
- [x] Dashboard com gráficos
- [x] Pipeline de vendas
- [x] CRUD de vendas (criar/editar)
- [x] Filtros avançados
- [x] Documentação
- [x] Comunicação interna
- [x] Financeiro
- [x] Responsividade mobile

### 🔄 Fase 2 - Backend (Próxima)
- [ ] Implementar API REST
- [ ] Banco de dados PostgreSQL
- [ ] Autenticação JWT
- [ ] Upload real de arquivos
- [ ] Integração WhatsApp

### 🔮 Fase 3 - Avançado (Futuro)
- [ ] PWA (App instalável)
- [ ] Notificações push
- [ ] Exportação de relatórios (PDF/Excel)
- [ ] Integração bancária
- [ ] Multi-tenancy

---

## 📊 Estatísticas

- **14 arquivos** no total
- **~175 KB** de código
- **3.500+ linhas** de código
- **95%** de funcionalidades implementadas (frontend)
- **100%** responsivo
- **0 dependências** npm (apenas CDN)

---

## 🐛 Problemas Conhecidos

Atualmente não há problemas conhecidos. Se encontrar algum bug:

1. Verifique se já existe uma [issue](https://github.com/SEU-USUARIO/crm-cred-certo/issues)
2. Se não, crie uma nova issue com detalhes

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Cred Certo - Cartas Contempladas**

- Website: [https://crm-cred-certo.vercel.app](https://crm-cred-certo.vercel.app)
- GitHub: [@SEU-USUARIO](https://github.com/SEU-USUARIO)

---

## 🙏 Agradecimentos

- [Chart.js](https://www.chartjs.org/) - Gráficos interativos
- [Font Awesome](https://fontawesome.com/) - Ícones
- [Vercel](https://vercel.com/) - Hosting gratuito

---

## 📞 Suporte

Para dúvidas ou suporte:
- 📧 Email: contato@credcerto.com
- 💬 Issues: [GitHub Issues](https://github.com/SEU-USUARIO/crm-cred-certo/issues)

---

<div align="center">

**⭐ Se este projeto te ajudou, deixe uma estrela!**

Made with ❤️ by Cred Certo Team

[⬆ Voltar ao topo](#-crm-cred-certo---cartas-contempladas)

</div>
