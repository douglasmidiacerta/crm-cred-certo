# Integração Frontend com API - CRM Cred Certo

Guia de como conectar seu front-end HTML/JS com a API backend.

## URLs da API

```javascript
// Depois de fazer deploy no Render, use:
const API_BASE_URL = 'https://crm-cred-certo-api.onrender.com/api';

// Para testes locais (npm run dev):
const API_BASE_URL = 'http://localhost:3000/api';
```

## 1. Login (POST /auth/login)

**Arquivo**: `assets/js/login.js`

```javascript
const API_URL = 'https://crm-cred-certo-api.onrender.com/api';

document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, senha })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Salvar tokens no localStorage
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      
      // Redirecionar para dashboard
      window.location.href = 'index.html';
    } else {
      alert('Erro: ' + data.error.message);
    }
  } catch (error) {
    console.error('Erro no login:', error);
    alert('Erro de conexão');
  }
});
```

## 2. Função para fazer requisições com JWT

**Arquivo**: `assets/js/api.js` (NOVO)

```javascript
const API_URL = 'https://crm-cred-certo-api.onrender.com/api';

// Função genérica para chamadas à API
async function fetchAPI(endpoint, options = {}) {
  const accessToken = localStorage.getItem('accessToken');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  
  if (accessToken) {
    defaultHeaders['Authorization'] = `Bearer ${accessToken}`;
  }
  
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  };
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();
    
    if (!response.ok) {
      // Se 401, token expirou - fazer refresh
      if (response.status === 401) {
        await refreshToken();
        // Tentar novamente
        return fetchAPI(endpoint, options);
      }
      throw new Error(data.error.message);
    }
    
    return data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

// Renovar token
async function refreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  
  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });
    
    const data = await response.json();
    if (data.success) {
      localStorage.setItem('accessToken', data.data.accessToken);
    } else {
      // Token inválido, deslogar
      localStorage.clear();
      window.location.href = 'login.html';
    }
  } catch (error) {
    console.error('Erro ao renovar token:', error);
    localStorage.clear();
    window.location.href = 'login.html';
  }
}

// Logout
async function logout() {
  try {
    await fetchAPI('/auth/logout', { method: 'POST' });
  } finally {
    localStorage.clear();
    window.location.href = 'login.html';
  }
}
```

## 3. Listar Vendas

**Arquivo**: `assets/js/vendas.js`

```javascript
// Carregar lista de vendas
async function carregarVendas() {
  try {
    const data = await fetchAPI('/vendas?page=1&limit=20');
    
    if (data.success) {
      const vendas = data.data.vendas;
      const stats = data.data.stats;
      
      // Preencher tabela
      const tbody = document.getElementById('vendasTable');
      tbody.innerHTML = vendas.map(v => `
        <tr>
          <td>${v.codigo}</td>
          <td>${v.cliente.nome}</td>
          <td>${v.tipo_bem}</td>
          <td>R$ ${v.valor_credito.toLocaleString('pt-BR')}</td>
          <td><span class="badge badge-${v.status}">${v.status}</span></td>
          <td>
            <button onclick="editarVenda(${v.id})" class="btn btn-sm btn-primary">
              Ver
            </button>
          </td>
        </tr>
      `).join('');
      
      // Atualizar stats
      document.getElementById('totalVendas').textContent = stats.total_vendas;
      document.getElementById('valorTotal').textContent = 
        `R$ ${stats.total_valor.toLocaleString('pt-BR')}`;
    }
  } catch (error) {
    console.error('Erro ao carregar vendas:', error);
    alert('Erro ao carregar vendas');
  }
}

// Criar nova venda
async function criarVenda(formData) {
  try {
    const data = await fetchAPI('/vendas', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
    
    if (data.success) {
      alert('Venda criada com sucesso!');
      carregarVendas();
      // Fechar modal
      document.getElementById('novaVendaModal')?.classList.remove('show');
    }
  } catch (error) {
    alert('Erro ao criar venda: ' + error.message);
  }
}

// Chamar ao carregar a página
document.addEventListener('DOMContentLoaded', carregarVendas);
```

## 4. Listar Clientes

**Arquivo**: `assets/js/clientes.js`

```javascript
async function carregarClientes() {
  try {
    const data = await fetchAPI('/clientes?page=1&limit=20');
    
    if (data.success) {
      const clientes = data.data.clientes;
      
      const tbody = document.getElementById('clientesTable');
      tbody.innerHTML = clientes.map(c => `
        <tr>
          <td>${c.nome}</td>
          <td>${c.cpf}</td>
          <td>${c.telefone}</td>
          <td>${c.email || '-'}</td>
          <td>
            <button onclick="editarCliente(${c.id})" class="btn btn-sm btn-primary">
              Ver
            </button>
          </td>
        </tr>
      `).join('');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

async function criarCliente(formData) {
  try {
    const data = await fetchAPI('/clientes', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
    
    if (data.success) {
      alert('Cliente criado!');
      carregarClientes();
    }
  } catch (error) {
    alert('Erro: ' + error.message);
  }
}

document.addEventListener('DOMContentLoaded', carregarClientes);
```

## 5. Upload de Documentos

**Arquivo**: `assets/js/documentos.js`

```javascript
async function enviarDocumento(vendaId, tipo, arquivo) {
  try {
    const formData = new FormData();
    formData.append('tipo', tipo);
    formData.append('arquivo', arquivo);
    
    const response = await fetch(
      `${API_URL}/vendas/${vendaId}/documentos`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: formData
      }
    );
    
    const data = await response.json();
    
    if (data.success) {
      alert('Documento enviado!');
      carregarDocumentos(vendaId);
    }
  } catch (error) {
    alert('Erro ao enviar: ' + error.message);
  }
}

async function carregarDocumentos(vendaId) {
  try {
    const data = await fetchAPI(`/vendas/${vendaId}/documentos`);
    
    if (data.success) {
      const docs = data.data.documentos;
      const html = docs.map(d => `
        <div class="documento-item">
          <p><strong>${d.tipo}</strong></p>
          <a href="${d.url_arquivo}" target="_blank">${d.nome_arquivo}</a>
          <span class="badge badge-${d.status}">${d.status}</span>
        </div>
      `).join('');
      
      document.getElementById('documentosList').innerHTML = html;
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}
```

## 6. Estrutura de Pastas para JS

```
assets/
├── js/
│   ├── api.js              # Funções de requisição API
│   ├── login.js            # Lógica de login
│   ├── vendas.js           # CRUD de vendas
│   ├── clientes.js         # CRUD de clientes
│   ├── documentos.js       # Upload e gerenciamento
│   ├── dashboard.js        # Dashboard stats
│   └── utils.js            # Funções auxiliares
├── css/
│   └── style.css
└── images/
```

## 7. Checklist de Integração

- [ ] API está deployada no Render
- [ ] Variáveis de ambiente configuradas
- [ ] Login funciona
- [ ] Listar vendas funciona
- [ ] Criar venda funciona
- [ ] Upload de documentos funciona
- [ ] Token refresh funciona
- [ ] Logout funciona
- [ ] CORS está configurado
- [ ] JWT está sendo enviado em todas requisições

## 8. Debugging

**Ver requisições**:
- Abra DevTools (F12)
- Vá em Network
- Faça a ação
- Clique na requisição
- Veja o response

**Ver erros do backend**:
- Vá em https://render.com
- Clique no seu Web Service
- Vá em Logs
- Procure por "ERROR"
