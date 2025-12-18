// ========== ARQUIVO PRINCIPAL DO CRM ==========
// Inicializa o sistema e contém as definições de páginas

// Definição de todas as páginas
const Pages = {
    // Dashboard
    dashboard() {
        const stats = mockData.dashboard.stats;
        const vendedores = mockData.dashboard.melhoresVendedores;
        
        return `
            <!-- Stats Cards -->
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-card-header">
                        <span class="stat-card-title">Vendas do Mês</span>
                        <div class="stat-card-icon blue">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                    </div>
                    <div class="stat-card-value">${dataHelpers.formatarMoeda(stats.vendasMes.valor)}</div>
                    <div class="stat-card-footer">
                        <span class="stat-trend up">
                            <i class="fas fa-arrow-up"></i>
                            ${stats.vendasMes.crescimento}%
                        </span>
                        <span class="text-secondary">${stats.vendasMes.quantidade} vendas</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-card-header">
                        <span class="stat-card-title">Vendas Hoje</span>
                        <div class="stat-card-icon green">
                            <i class="fas fa-chart-line"></i>
                        </div>
                    </div>
                    <div class="stat-card-value">${dataHelpers.formatarMoeda(stats.vendasDia.valor)}</div>
                    <div class="stat-card-footer">
                        <span class="stat-trend down">
                            <i class="fas fa-arrow-down"></i>
                            ${Math.abs(stats.vendasDia.crescimento)}%
                        </span>
                        <span class="text-secondary">${stats.vendasDia.quantidade} vendas</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-card-header">
                        <span class="stat-card-title">Taxa de Conversão</span>
                        <div class="stat-card-icon yellow">
                            <i class="fas fa-percentage"></i>
                        </div>
                    </div>
                    <div class="stat-card-value">${stats.taxaConversao.valor}%</div>
                    <div class="stat-card-footer">
                        <span class="stat-trend up">
                            <i class="fas fa-arrow-up"></i>
                            ${stats.taxaConversao.crescimento}%
                        </span>
                        <span class="text-secondary">vs mês anterior</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-card-header">
                        <span class="stat-card-title">Ticket Médio</span>
                        <div class="stat-card-icon blue">
                            <i class="fas fa-receipt"></i>
                        </div>
                    </div>
                    <div class="stat-card-value">${dataHelpers.formatarMoeda(stats.ticketMedio.valor)}</div>
                    <div class="stat-card-footer">
                        <span class="stat-trend up">
                            <i class="fas fa-arrow-up"></i>
                            ${stats.ticketMedio.crescimento}%
                        </span>
                        <span class="text-secondary">vs mês anterior</span>
                    </div>
                </div>
            </div>

            <!-- Gráficos -->
            <div class="grid grid-cols-2 gap-3 mb-4">
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">Evolução de Vendas - Janeiro 2024</h3>
                        <p class="chart-subtitle">Vendas realizadas ao longo do mês</p>
                    </div>
                    <div style="height: 300px;">
                        <canvas id="chart-evolucao-diaria"></canvas>
                    </div>
                </div>

                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">Vendas por Tipo de Bem</h3>
                        <p class="chart-subtitle">Distribuição por categoria</p>
                    </div>
                    <div style="height: 300px;">
                        <canvas id="chart-vendas-tipo"></canvas>
                    </div>
                </div>
            </div>

            <!-- Melhores Vendedores -->
            <div class="table-container">
                <div class="table-header">
                    <h3 class="table-title">Melhores Vendedores do Mês</h3>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Posição</th>
                            <th>Vendedor</th>
                            <th>Vendas</th>
                            <th>Valor Total</th>
                            <th>Ticket Médio</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${vendedores.map((v, index) => `
                            <tr>
                                <td><strong>#${index + 1}</strong></td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-user-circle" style="font-size: 24px; color: #3b82f6;"></i>
                                        ${v.nome}
                                    </div>
                                </td>
                                <td>${v.vendas}</td>
                                <td><strong>${dataHelpers.formatarMoeda(v.valor)}</strong></td>
                                <td>${dataHelpers.formatarMoeda(v.valor / v.vendas)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    // Vendas (Listagem)
    vendas() {
        const vendas = mockData.vendas;
        const novos = vendas.filter(v => v.status === 'novo');
        const negociacao = vendas.filter(v => v.status === 'negociacao');
        const aprovados = vendas.filter(v => v.status === 'aprovado');
        const perdidos = vendas.filter(v => v.status === 'perdido');
        
        return `
            <!-- Filtros -->
            <div class="filters-container">
                <div class="filter-group">
                    <label>Buscar Cliente</label>
                    <input type="text" id="filter-search" placeholder="Nome do cliente..." onkeyup="Filters.aplicarFiltros()">
                </div>
                
                <div class="filter-group">
                    <label>Status</label>
                    <select id="filter-status" onchange="Filters.aplicarFiltros()">
                        <option value="">Todos</option>
                        <option value="novo">Novo</option>
                        <option value="negociacao">Em Negociação</option>
                        <option value="aprovado">Aprovado</option>
                        <option value="perdido">Perdido</option>
                        <option value="finalizado">Finalizado</option>
                    </select>
                </div>
                
                <div class="filter-group">
                    <label>Tipo de Bem</label>
                    <select id="filter-tipo" onchange="Filters.aplicarFiltros()">
                        <option value="">Todos</option>
                        <option value="Imóvel">Imóvel</option>
                        <option value="Automóvel">Automóvel</option>
                        <option value="Serviços">Serviços</option>
                    </select>
                </div>
                
                <div class="filter-group">
                    <label>Vendedor</label>
                    <select id="filter-vendedor" onchange="Filters.aplicarFiltros()">
                        <option value="">Todos</option>
                        <option value="João Silva">João Silva</option>
                        <option value="Maria Santos">Maria Santos</option>
                        <option value="Carlos Oliveira">Carlos Oliveira</option>
                        <option value="Ana Costa">Ana Costa</option>
                    </select>
                </div>
                
                <div class="filter-group" style="align-self: flex-end;">
                    <button class="btn btn-secondary" onclick="Filters.limparFiltros()">
                        <i class="fas fa-redo"></i>
                        Limpar
                    </button>
                </div>
            </div>
        `;
            <!-- Pipeline -->
            <div class="pipeline-container">
                <div class="pipeline-column">
                    <div class="pipeline-header">
                        <span class="pipeline-title">Novos Leads</span>
                        <span class="pipeline-count">${novos.length}</span>
                    </div>
                    <div class="pipeline-items">
                        ${novos.map(v => `
                            <div class="pipeline-card" onclick="Router.navigateTo('vendas', {vendaId: '${v.id}'})">
                                <div class="pipeline-card-title">${v.cliente}</div>
                                <div class="pipeline-card-info">
                                    <i class="fas fa-tag"></i> ${v.tipoBem}
                                </div>
                                <div class="pipeline-card-info">
                                    <i class="fas fa-dollar-sign"></i> ${dataHelpers.formatarMoeda(v.credito)}
                                </div>
                                <div class="pipeline-card-footer">
                                    <span class="badge-status novo">Novo</span>
                                    <small>${dataHelpers.formatarData(v.dataAbertura)}</small>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="pipeline-column">
                    <div class="pipeline-header">
                        <span class="pipeline-title">Em Negociação</span>
                        <span class="pipeline-count">${negociacao.length}</span>
                    </div>
                    <div class="pipeline-items">
                        ${negociacao.map(v => `
                            <div class="pipeline-card" onclick="Router.navigateTo('vendas', {vendaId: '${v.id}'})">
                                <div class="pipeline-card-title">${v.cliente}</div>
                                <div class="pipeline-card-info">
                                    <i class="fas fa-tag"></i> ${v.tipoBem}
                                </div>
                                <div class="pipeline-card-info">
                                    <i class="fas fa-dollar-sign"></i> ${dataHelpers.formatarMoeda(v.credito)}
                                </div>
                                <div class="pipeline-card-footer">
                                    <span class="badge-status negociacao">Negociação</span>
                                    <small>${dataHelpers.formatarData(v.dataAbertura)}</small>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="pipeline-column">
                    <div class="pipeline-header">
                        <span class="pipeline-title">Aprovadas</span>
                        <span class="pipeline-count">${aprovados.length}</span>
                    </div>
                    <div class="pipeline-items">
                        ${aprovados.map(v => `
                            <div class="pipeline-card" onclick="Router.navigateTo('vendas', {vendaId: '${v.id}'})">
                                <div class="pipeline-card-title">${v.cliente}</div>
                                <div class="pipeline-card-info">
                                    <i class="fas fa-tag"></i> ${v.tipoBem}
                                </div>
                                <div class="pipeline-card-info">
                                    <i class="fas fa-dollar-sign"></i> ${dataHelpers.formatarMoeda(v.credito)}
                                </div>
                                <div class="pipeline-card-footer">
                                    <span class="badge-status aprovado">Aprovado</span>
                                    <small>${dataHelpers.formatarData(v.dataAbertura)}</small>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="pipeline-column">
                    <div class="pipeline-header">
                        <span class="pipeline-title">Perdidas</span>
                        <span class="pipeline-count">${perdidos.length}</span>
                    </div>
                    <div class="pipeline-items">
                        ${perdidos.map(v => `
                            <div class="pipeline-card" onclick="Router.navigateTo('vendas', {vendaId: '${v.id}'})">
                                <div class="pipeline-card-title">${v.cliente}</div>
                                <div class="pipeline-card-info">
                                    <i class="fas fa-tag"></i> ${v.tipoBem}
                                </div>
                                <div class="pipeline-card-info">
                                    <i class="fas fa-dollar-sign"></i> ${dataHelpers.formatarMoeda(v.credito)}
                                </div>
                                <div class="pipeline-card-footer">
                                    <span class="badge-status perdido">Perdido</span>
                                    <small>${dataHelpers.formatarData(v.dataAbertura)}</small>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- Tabela de Vendas -->
            <div class="table-container">
                <div class="table-header">
                    <h3 class="table-title">Todas as Vendas</h3>
                    <button class="btn btn-primary" onclick="Modals.criarNovaVenda()">
                        <i class="fas fa-plus"></i>
                        Nova Venda
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Tipo de Bem</th>
                            <th>Crédito</th>
                            <th>Status</th>
                            <th>Vendedor</th>
                            <th>Data</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${vendas.map(v => `
                            <tr>
                                <td><strong>${v.id}</strong></td>
                                <td>${v.cliente}</td>
                                <td>${v.tipoBem}</td>
                                <td><strong>${dataHelpers.formatarMoeda(v.credito)}</strong></td>
                                <td><span class="badge-status ${v.status}">${dataHelpers.traduzirStatus(v.status)}</span></td>
                                <td>${v.vendedor}</td>
                                <td>${dataHelpers.formatarData(v.dataAbertura)}</td>
                                <td>
                                    <button class="btn btn-sm btn-primary btn-ver-venda" data-venda-id="${v.id}">
                                        <i class="fas fa-eye"></i>
                                        Ver
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    // Outras páginas (placeholder)
    clientes() {
        return `
            <div class="table-container">
                <div class="table-header">
                    <h3 class="table-title">Clientes</h3>
                    <button class="btn btn-primary">
                        <i class="fas fa-plus"></i>
                        Novo Cliente
                    </button>
                </div>
                <p style="padding: 24px; text-align: center; color: #64748b;">
                    Módulo em desenvolvimento
                </p>
            </div>
        `;
    },

    cartas() {
        return `
            <div class="table-container">
                <div class="table-header">
                    <h3 class="table-title">Cartas Disponíveis</h3>
                </div>
                <p style="padding: 24px; text-align: center; color: #64748b;">
                    Módulo em desenvolvimento
                </p>
            </div>
        `;
    },

    financeiro() {
        return `
            <div class="table-container">
                <div class="table-header">
                    <h3 class="table-title">Financeiro</h3>
                </div>
                <p style="padding: 24px; text-align: center; color: #64748b;">
                    Módulo em desenvolvimento
                </p>
            </div>
        `;
    },

    relatorios() {
        return `
            <div class="table-container">
                <div class="table-header">
                    <h3 class="table-title">Relatórios</h3>
                </div>
                <p style="padding: 24px; text-align: center; color: #64748b;">
                    Módulo em desenvolvimento
                </p>
            </div>
        `;
    },

    configuracoes() {
        return `
            <div class="table-container">
                <div class="table-header">
                    <h3 class="table-title">Configurações</h3>
                </div>
                <p style="padding: 24px; text-align: center; color: #64748b;">
                    Módulo em desenvolvimento
                </p>
            </div>
        `;
    }
};

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    Router.init();
    initMobileMenu();
});

// Inicializar menu mobile
function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
            
            const icon = menuToggle.querySelector('i');
            if (sidebar.classList.contains('active')) {
                icon.className = 'fas fa-times';
                menuToggle.classList.add('active');
            } else {
                icon.className = 'fas fa-bars';
                menuToggle.classList.remove('active');
            }
        });
        
        // Fechar ao clicar no overlay
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            menuToggle.querySelector('i').className = 'fas fa-bars';
            menuToggle.classList.remove('active');
        });
        
        // Fechar ao clicar em um item do menu (mobile)
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                    menuToggle.querySelector('i').className = 'fas fa-bars';
                    menuToggle.classList.remove('active');
                }
            });
        });
    }
}

// Expor Pages globalmente
window.Pages = Pages;
