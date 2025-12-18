// ========== SISTEMA DE ROTAS DO CRM ==========
// Gerencia a navegação entre páginas e carrega o conteúdo dinâmico

const Router = {
    currentPage: 'dashboard',
    
    // Inicializar router
    init() {
        this.setupNavigation();
        this.loadPage('dashboard');
    },
    
    // Configurar navegação
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.getAttribute('data-page');
                this.navigateTo(page);
            });
        });
    },
    
    // Navegar para página
    navigateTo(page, params = {}) {
        // Atualizar nav ativa
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeNav = document.querySelector(`[data-page="${page}"]`);
        if (activeNav) {
            activeNav.classList.add('active');
        }
        
        // Atualizar título
        const titles = {
            'dashboard': 'Dashboard',
            'vendas': 'Vendas',
            'clientes': 'Clientes',
            'cartas': 'Cartas Disponíveis',
            'financeiro': 'Financeiro',
            'relatorios': 'Relatórios',
            'configuracoes': 'Configurações'
        };
        
        document.querySelector('.page-title').textContent = titles[page] || page;
        
        // Carregar conteúdo
        this.currentPage = page;
        this.loadPage(page, params);
    },
    
    // Carregar página
    loadPage(page, params = {}) {
        const contentArea = document.getElementById('content-area');
        
        switch(page) {
            case 'dashboard':
                contentArea.innerHTML = Pages.dashboard();
                this.initDashboard();
                break;
            case 'vendas':
                if (params.vendaId) {
                    contentArea.innerHTML = Pages.vendaDetalhe(params.vendaId);
                    this.initVendaDetalhe(params.vendaId);
                } else {
                    contentArea.innerHTML = Pages.vendas();
                    this.initVendas();
                }
                break;
            case 'clientes':
                contentArea.innerHTML = Pages.clientes();
                break;
            case 'cartas':
                contentArea.innerHTML = Pages.cartas();
                break;
            case 'financeiro':
                contentArea.innerHTML = Pages.financeiro();
                break;
            case 'relatorios':
                contentArea.innerHTML = Pages.relatorios();
                break;
            case 'configuracoes':
                contentArea.innerHTML = Pages.configuracoes();
                break;
            default:
                contentArea.innerHTML = '<h2>Página não encontrada</h2>';
        }
    },
    
    // Inicializar Dashboard
    initDashboard() {
        this.renderCharts();
    },
    
    // Inicializar Vendas
    initVendas() {
        // Event listeners para abrir detalhes
        document.querySelectorAll('.btn-ver-venda').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const vendaId = e.target.closest('.btn-ver-venda').getAttribute('data-venda-id');
                this.navigateTo('vendas', { vendaId });
            });
        });
    },
    
    // Inicializar Venda Detalhe
    initVendaDetalhe(vendaId) {
        // Botão voltar
        const btnVoltar = document.getElementById('btn-voltar-vendas');
        if (btnVoltar) {
            btnVoltar.addEventListener('click', () => {
                this.navigateTo('vendas');
            });
        }
        
        // Upload de documentos
        const btnUpload = document.getElementById('btn-upload-doc');
        if (btnUpload) {
            btnUpload.addEventListener('click', () => {
                this.simularUpload(vendaId);
            });
        }
        
        // Enviar mensagem
        const btnEnviarMsg = document.getElementById('btn-enviar-mensagem');
        if (btnEnviarMsg) {
            btnEnviarMsg.addEventListener('click', () => {
                this.enviarMensagem(vendaId);
            });
        }
        
        // Simular financeiro
        const btnSimular = document.getElementById('btn-simular-financeiro');
        if (btnSimular) {
            btnSimular.addEventListener('click', () => {
                this.simularFinanceiro(vendaId);
            });
        }
        
        // Confirmar financeiro
        const btnConfirmar = document.getElementById('btn-confirmar-financeiro');
        if (btnConfirmar) {
            btnConfirmar.addEventListener('click', () => {
                this.confirmarFinanceiro(vendaId);
            });
        }
    },
    
    // Renderizar gráficos
    renderCharts() {
        // Gráfico de evolução diária
        const ctxEvolucao = document.getElementById('chart-evolucao-diaria');
        if (ctxEvolucao) {
            const dados = mockData.dashboard.evolucaoDiaria;
            
            new Chart(ctxEvolucao, {
                type: 'line',
                data: {
                    labels: dados.map(d => d.dia),
                    datasets: [{
                        label: 'Vendas (R$)',
                        data: dados.map(d => d.valor),
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return 'R$ ' + (value / 1000) + 'k';
                                }
                            }
                        }
                    }
                }
            });
        }
        
        // Gráfico de vendas por tipo
        const ctxTipo = document.getElementById('chart-vendas-tipo');
        if (ctxTipo) {
            const dados = mockData.dashboard.vendasPorTipo;
            
            new Chart(ctxTipo, {
                type: 'doughnut',
                data: {
                    labels: ['Imóvel', 'Automóvel', 'Serviços'],
                    datasets: [{
                        data: [dados.imovel.percentual, dados.automovel.percentual, dados.servicos.percentual],
                        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    },
    
    // Simular upload
    simularUpload(vendaId) {
        const tipo = prompt('Tipo de documento:', 'Comprovante de Renda');
        if (!tipo) return;
        
        const nome = `documento_${Date.now()}.pdf`;
        dataHelpers.adicionarDocumento(vendaId, tipo, nome);
        
        alert('Documento enviado com sucesso!');
        this.loadPage('vendas', { vendaId });
    },
    
    // Enviar mensagem
    async enviarMensagem(vendaId) {
        const textarea = document.getElementById('nova-mensagem');
        if (!textarea) return;
        
        const mensagem = textarea.value.trim();
        if (!mensagem) {
            Modals.mostrarNotificacao('Digite uma mensagem', 'warning');
            return;
        }
        
        // Desabilitar textarea
        textarea.disabled = true;
        
        try {
            const result = await API.addComunicacao(vendaId, {
                tipo: 'mensagem',
                mensagem
            });
            
            if (result.success) {
                textarea.value = '';
                Modals.mostrarNotificacao('Mensagem enviada!', 'success');
                this.loadPage('vendas', { vendaId });
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Erro:', error);
            Modals.mostrarNotificacao('Erro ao enviar mensagem', 'error');
        } finally {
            textarea.disabled = false;
        }
    },
    
    // Simular financeiro
    async simularFinanceiro(vendaId) {
        try {
            // Buscar valor do crédito da venda
            const resultVenda = await API.getVendaById(vendaId);
            if (!resultVenda.success) {
                throw new Error('Erro ao buscar venda');
            }
            
            const valorCredito = resultVenda.data.valor_credito;
            
            // Simular lançamentos
            const result = await API.simularLancamentos(vendaId, valorCredito);
            
            if (result.success) {
                Modals.mostrarNotificacao('Simulação financeira gerada!', 'success');
                this.loadPage('vendas', { vendaId });
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Erro:', error);
            Modals.mostrarNotificacao('Erro ao simular financeiro', 'error');
        }
    },
    
    // Confirmar financeiro
    async confirmarFinanceiro(vendaId) {
        if (!confirm('Confirmar lançamentos financeiros? Esta ação não pode ser desfeita.')) {
            return;
        }
        
        try {
            const result = await API.confirmarLancamentos(vendaId);
            
            if (result.success) {
                Modals.mostrarNotificacao('Lançamentos confirmados!', 'success');
                this.loadPage('vendas', { vendaId });
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Erro:', error);
            Modals.mostrarNotificacao('Erro ao confirmar lançamentos', 'error');
        }
    }
};

// Expor Router globalmente
window.Router = Router;
