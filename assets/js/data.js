// ========== DADOS MOCK DO CRM ==========
// Este arquivo contém todos os dados de exemplo do sistema

const mockData = {
    // Dados do Dashboard
    dashboard: {
        stats: {
            vendasMes: {
                valor: 2450000,
                quantidade: 18,
                crescimento: 12.5,
                meta: 3000000
            },
            vendasDia: {
                valor: 85000,
                quantidade: 2,
                crescimento: -5.2
            },
            taxaConversao: {
                valor: 32.5,
                crescimento: 8.3
            },
            ticketMedio: {
                valor: 136111,
                crescimento: 15.7
            }
        },
        melhoresVendedores: [
            { nome: 'João Silva', vendas: 6, valor: 820000, foto: null },
            { nome: 'Maria Santos', vendas: 5, valor: 680000, foto: null },
            { nome: 'Carlos Oliveira', vendas: 4, valor: 550000, foto: null },
            { nome: 'Ana Costa', vendas: 3, valor: 400000, foto: null }
        ],
        evolucaoDiaria: [
            { dia: '01', vendas: 2, valor: 170000 },
            { dia: '05', vendas: 1, valor: 95000 },
            { dia: '08', vendas: 3, valor: 390000 },
            { dia: '12', vendas: 2, valor: 220000 },
            { dia: '15', vendas: 4, valor: 540000 },
            { dia: '18', vendas: 3, valor: 410000 },
            { dia: '22', vendas: 2, valor: 270000 },
            { dia: '25', vendas: 1, valor: 85000 }
        ],
        vendasPorTipo: {
            imovel: { quantidade: 8, valor: 1200000, percentual: 49 },
            automovel: { quantidade: 7, valor: 980000, percentual: 40 },
            servicos: { quantidade: 3, valor: 270000, percentual: 11 }
        }
    },

    // Vendas
    vendas: [
        {
            id: 'V001',
            cliente: 'João Pedro Almeida',
            telefone: '(11) 98765-4321',
            email: 'joao.almeida@email.com',
            tipoBem: 'Imóvel',
            credito: 250000,
            status: 'negociacao',
            vendedor: 'João Silva',
            origem: 'Indicação',
            dataAbertura: '2024-01-15',
            administradora: 'Embracon',
            fornecedor: 'Construtora Alpha',
            observacoes: 'Cliente interessado em apartamento na zona sul',
            etapa: 'analise_credito'
        },
        {
            id: 'V002',
            cliente: 'Maria Fernanda Costa',
            telefone: '(11) 97654-3210',
            email: 'maria.costa@email.com',
            tipoBem: 'Automóvel',
            credito: 85000,
            status: 'aprovado',
            vendedor: 'Maria Santos',
            origem: 'Facebook Ads',
            dataAbertura: '2024-01-18',
            administradora: 'Rodobens',
            fornecedor: 'Cotista Premium',
            observacoes: 'Documentação completa',
            etapa: 'aprovado_financeiro'
        },
        {
            id: 'V003',
            cliente: 'Carlos Eduardo Silva',
            telefone: '(11) 96543-2109',
            email: 'carlos.silva@email.com',
            tipoBem: 'Imóvel',
            credito: 450000,
            status: 'novo',
            vendedor: 'Carlos Oliveira',
            origem: 'Google Ads',
            dataAbertura: '2024-01-22',
            administradora: 'A definir',
            fornecedor: 'A definir',
            observacoes: 'Primeiro contato realizado',
            etapa: 'primeiro_contato'
        },
        {
            id: 'V004',
            cliente: 'Ana Paula Rodrigues',
            telefone: '(11) 95432-1098',
            email: 'ana.rodrigues@email.com',
            tipoBem: 'Automóvel',
            credito: 120000,
            status: 'negociacao',
            vendedor: 'Ana Costa',
            origem: 'Instagram',
            dataAbertura: '2024-01-20',
            administradora: 'Porto Seguro',
            fornecedor: 'Revenda Premium',
            observacoes: 'Aguardando análise de crédito',
            etapa: 'analise_credito'
        },
        {
            id: 'V005',
            cliente: 'Roberto Mendes Santos',
            telefone: '(11) 94321-0987',
            email: 'roberto.santos@email.com',
            tipoBem: 'Imóvel',
            credito: 680000,
            status: 'finalizado',
            vendedor: 'João Silva',
            origem: 'Indicação',
            dataAbertura: '2024-01-10',
            administradora: 'Embracon',
            fornecedor: 'Construtora Beta',
            observacoes: 'Venda finalizada com sucesso',
            etapa: 'finalizado',
            dataFinalizacao: '2024-01-25'
        },
        {
            id: 'V006',
            cliente: 'Fernanda Lima Oliveira',
            telefone: '(11) 93210-9876',
            email: 'fernanda.lima@email.com',
            tipoBem: 'Serviços',
            credito: 95000,
            status: 'perdido',
            vendedor: 'Maria Santos',
            origem: 'Site',
            dataAbertura: '2024-01-12',
            administradora: 'Rodobens',
            fornecedor: 'N/A',
            observacoes: 'Cliente desistiu da compra',
            etapa: 'perdido',
            motivoPerda: 'Preço'
        },
        {
            id: 'V007',
            cliente: 'Paulo Henrique Costa',
            telefone: '(11) 92109-8765',
            email: 'paulo.costa@email.com',
            tipoBem: 'Automóvel',
            credito: 155000,
            status: 'aprovado',
            vendedor: 'Carlos Oliveira',
            origem: 'WhatsApp',
            dataAbertura: '2024-01-17',
            administradora: 'Porto Seguro',
            fornecedor: 'Cotista Gold',
            observacoes: 'Aguardando assinatura do contrato',
            etapa: 'aprovado_financeiro'
        },
        {
            id: 'V008',
            cliente: 'Juliana Martins Pereira',
            telefone: '(11) 91098-7654',
            email: 'juliana.pereira@email.com',
            tipoBem: 'Imóvel',
            credito: 380000,
            status: 'novo',
            vendedor: 'Ana Costa',
            origem: 'Facebook Ads',
            dataAbertura: '2024-01-24',
            administradora: 'A definir',
            fornecedor: 'A definir',
            observacoes: 'Lead qualificado, aguardando documentação',
            etapa: 'primeiro_contato'
        }
    ],

    // Clientes
    clientes: [
        {
            id: 'C001',
            nome: 'João Pedro Almeida',
            cpf: '123.456.789-00',
            telefone: '(11) 98765-4321',
            email: 'joao.almeida@email.com',
            dataNascimento: '1985-03-15',
            endereco: 'Rua das Flores, 123 - São Paulo/SP',
            profissao: 'Engenheiro',
            rendaMensal: 15000,
            estadoCivil: 'Casado',
            dataCadastro: '2024-01-15'
        }
        // Mais clientes podem ser adicionados conforme necessário
    ],

    // Documentos
    documentos: {
        'V001': [
            { id: 'D001', tipo: 'RG', nome: 'rg_joao_almeida.pdf', dataEnvio: '2024-01-15 10:30', status: 'aprovado' },
            { id: 'D002', tipo: 'CPF', nome: 'cpf_joao_almeida.pdf', dataEnvio: '2024-01-15 10:32', status: 'aprovado' },
            { id: 'D003', tipo: 'Comprovante de Residência', nome: 'comp_residencia.pdf', dataEnvio: '2024-01-15 14:20', status: 'aprovado' },
            { id: 'D004', tipo: 'Comprovante de Renda', nome: 'holerite_jan2024.pdf', dataEnvio: '2024-01-16 09:15', status: 'pendente' }
        ],
        'V002': [
            { id: 'D005', tipo: 'RG', nome: 'rg_maria_costa.pdf', dataEnvio: '2024-01-18 11:00', status: 'aprovado' },
            { id: 'D006', tipo: 'CPF', nome: 'cpf_maria_costa.pdf', dataEnvio: '2024-01-18 11:02', status: 'aprovado' },
            { id: 'D007', tipo: 'Comprovante de Residência', nome: 'conta_luz.pdf', dataEnvio: '2024-01-18 15:30', status: 'aprovado' },
            { id: 'D008', tipo: 'Comprovante de Renda', nome: 'declaracao_ir.pdf', dataEnvio: '2024-01-19 10:00', status: 'aprovado' }
        ]
    },

    // Comunicação Interna (Timeline)
    comunicacao: {
        'V001': [
            {
                id: 'M001',
                tipo: 'mensagem',
                usuario: 'João Silva',
                perfil: 'Vendedor',
                mensagem: 'Cliente enviou documentação inicial. Aguardando análise.',
                data: '2024-01-15 15:30'
            },
            {
                id: 'M002',
                tipo: 'acao',
                usuario: 'Sistema',
                perfil: 'Automático',
                mensagem: 'Documentos RG e CPF aprovados automaticamente.',
                data: '2024-01-15 15:35'
            },
            {
                id: 'M003',
                tipo: 'mensagem',
                usuario: 'Ana Costa',
                perfil: 'Financeiro',
                mensagem: 'Análise de crédito em andamento. Previsão: 48h.',
                data: '2024-01-16 10:00'
            },
            {
                id: 'M004',
                tipo: 'mensagem',
                usuario: 'João Silva',
                perfil: 'Vendedor',
                mensagem: 'Cliente ligou perguntando sobre o andamento. Informei sobre o prazo.',
                data: '2024-01-17 14:20'
            }
        ],
        'V002': [
            {
                id: 'M005',
                tipo: 'mensagem',
                usuario: 'Maria Santos',
                perfil: 'Vendedor',
                mensagem: 'Venda aprovada! Cliente muito satisfeito.',
                data: '2024-01-20 16:00'
            },
            {
                id: 'M006',
                tipo: 'acao',
                usuario: 'Sistema',
                perfil: 'Automático',
                mensagem: 'Status alterado para: Aprovado',
                data: '2024-01-20 16:01'
            }
        ]
    },

    // Financeiro
    financeiro: {
        'V001': {
            simulacao: [
                { tipo: 'Entrada do Cliente', valor: 25000, vencimento: '2024-02-01', status: 'previsto' },
                { tipo: 'Comissão Vendedor (5%)', valor: -12500, beneficiario: 'João Silva', vencimento: '2024-02-05', status: 'previsto' },
                { tipo: 'Pagamento Fornecedor', valor: -200000, beneficiario: 'Construtora Alpha', vencimento: '2024-02-10', status: 'previsto' },
                { tipo: 'Taxa Administrativa (2%)', valor: -5000, beneficiario: 'Administradora', vencimento: '2024-02-10', status: 'previsto' },
                { tipo: 'Lucro Líquido', valor: 7500, vencimento: '2024-02-10', status: 'previsto' }
            ],
            definitivo: null
        },
        'V002': {
            simulacao: null,
            definitivo: [
                { tipo: 'Entrada do Cliente', valor: 8500, vencimento: '2024-01-25', status: 'recebido', dataPagamento: '2024-01-25' },
                { tipo: 'Comissão Vendedor (5%)', valor: -4250, beneficiario: 'Maria Santos', vencimento: '2024-01-28', status: 'pago', dataPagamento: '2024-01-28' },
                { tipo: 'Pagamento Fornecedor', valor: -72250, beneficiario: 'Cotista Premium', vencimento: '2024-01-30', status: 'pago', dataPagamento: '2024-01-30' },
                { tipo: 'Taxa Administrativa (2%)', valor: -1700, beneficiario: 'Administradora', vencimento: '2024-01-30', status: 'pago', dataPagamento: '2024-01-30' },
                { tipo: 'Lucro Líquido', valor: 4800, vencimento: '2024-01-30', status: 'recebido', dataPagamento: '2024-01-30' }
            ]
        }
    },

    // Usuários
    usuarios: [
        { id: 1, nome: 'Admin', email: 'admin@credcerto.com', perfil: 'Administrador', foto: null },
        { id: 2, nome: 'João Silva', email: 'joao@credcerto.com', perfil: 'Vendedor', foto: null },
        { id: 3, nome: 'Maria Santos', email: 'maria@credcerto.com', perfil: 'Vendedor', foto: null },
        { id: 4, nome: 'Carlos Oliveira', email: 'carlos@credcerto.com', perfil: 'Vendedor', foto: null },
        { id: 5, nome: 'Ana Costa', email: 'ana@credcerto.com', perfil: 'Financeiro', foto: null }
    ]
};

// Funções auxiliares para manipulação de dados
const dataHelpers = {
    // Formatar moeda
    formatarMoeda(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    },

    // Formatar data
    formatarData(data) {
        if (!data) return '-';
        const d = new Date(data);
        return d.toLocaleDateString('pt-BR');
    },

    // Formatar data e hora
    formatarDataHora(dataHora) {
        if (!dataHora) return '-';
        const [data, hora] = dataHora.split(' ');
        const d = new Date(data);
        return `${d.toLocaleDateString('pt-BR')} às ${hora}`;
    },

    // Obter venda por ID
    obterVendaPorId(id) {
        return mockData.vendas.find(v => v.id === id);
    },

    // Obter vendas por status
    obterVendasPorStatus(status) {
        return mockData.vendas.filter(v => v.status === status);
    },

    // Obter documentos por venda
    obterDocumentosPorVenda(vendaId) {
        return mockData.documentos[vendaId] || [];
    },

    // Obter comunicação por venda
    obterComunicacaoPorVenda(vendaId) {
        return mockData.comunicacao[vendaId] || [];
    },

    // Obter financeiro por venda
    obterFinanceiroPorVenda(vendaId) {
        return mockData.financeiro[vendaId] || { simulacao: null, definitivo: null };
    },

    // Calcular percentual de crescimento
    calcularCrescimento(atual, anterior) {
        if (anterior === 0) return 0;
        return ((atual - anterior) / anterior * 100).toFixed(1);
    },

    // Obter vendas do mês atual
    obterVendasMesAtual() {
        const hoje = new Date();
        const mesAtual = hoje.getMonth() + 1;
        const anoAtual = hoje.getFullYear();
        
        return mockData.vendas.filter(v => {
            const dataVenda = new Date(v.dataAbertura);
            return dataVenda.getMonth() + 1 === mesAtual && 
                   dataVenda.getFullYear() === anoAtual;
        });
    },

    // Adicionar mensagem à timeline
    adicionarMensagem(vendaId, usuario, perfil, mensagem) {
        if (!mockData.comunicacao[vendaId]) {
            mockData.comunicacao[vendaId] = [];
        }
        
        const novaMensagem = {
            id: `M${Date.now()}`,
            tipo: 'mensagem',
            usuario,
            perfil,
            mensagem,
            data: new Date().toISOString().replace('T', ' ').substring(0, 16)
        };
        
        mockData.comunicacao[vendaId].push(novaMensagem);
        return novaMensagem;
    },

    // Adicionar documento
    adicionarDocumento(vendaId, tipo, nome) {
        if (!mockData.documentos[vendaId]) {
            mockData.documentos[vendaId] = [];
        }
        
        const novoDocumento = {
            id: `D${Date.now()}`,
            tipo,
            nome,
            dataEnvio: new Date().toISOString().replace('T', ' ').substring(0, 16),
            status: 'pendente'
        };
        
        mockData.documentos[vendaId].push(novoDocumento);
        return novoDocumento;
    },

    // Atualizar status da venda
    atualizarStatusVenda(vendaId, novoStatus) {
        const venda = mockData.vendas.find(v => v.id === vendaId);
        if (venda) {
            venda.status = novoStatus;
            
            // Adicionar log automático
            this.adicionarMensagem(vendaId, 'Sistema', 'Automático', 
                `Status alterado para: ${this.traduzirStatus(novoStatus)}`);
        }
    },

    // Traduzir status
    traduzirStatus(status) {
        const traducoes = {
            'novo': 'Novo Lead',
            'negociacao': 'Em Negociação',
            'aprovado': 'Aprovado',
            'perdido': 'Perdido',
            'finalizado': 'Finalizado'
        };
        return traducoes[status] || status;
    }
};

// Expor dados globalmente
window.mockData = mockData;
window.dataHelpers = dataHelpers;
