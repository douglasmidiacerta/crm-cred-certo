// ========== SISTEMA DE FILTROS ==========

const Filters = {
    // Aplicar filtros
    aplicarFiltros() {
        const search = document.getElementById('filter-search')?.value.toLowerCase() || '';
        const status = document.getElementById('filter-status')?.value || '';
        const tipo = document.getElementById('filter-tipo')?.value || '';
        const vendedor = document.getElementById('filter-vendedor')?.value || '';
        
        // Filtrar vendas
        let vendasFiltradas = mockData.vendas.filter(venda => {
            const matchSearch = search === '' || venda.cliente.toLowerCase().includes(search);
            const matchStatus = status === '' || venda.status === status;
            const matchTipo = tipo === '' || venda.tipoBem === tipo;
            const matchVendedor = vendedor === '' || venda.vendedor === vendedor;
            
            return matchSearch && matchStatus && matchTipo && matchVendedor;
        });
        
        // Atualizar pipeline
        this.atualizarPipeline(vendasFiltradas);
        
        // Atualizar tabela
        this.atualizarTabela(vendasFiltradas);
    },
    
    // Atualizar pipeline visual
    atualizarPipeline(vendas) {
        const novos = vendas.filter(v => v.status === 'novo');
        const negociacao = vendas.filter(v => v.status === 'negociacao');
        const aprovados = vendas.filter(v => v.status === 'aprovado');
        const perdidos = vendas.filter(v => v.status === 'perdido');
        
        const colunas = [
            { dados: novos, classe: 'novo', titulo: 'Novos Leads' },
            { dados: negociacao, classe: 'negociacao', titulo: 'Em Negociação' },
            { dados: aprovados, classe: 'aprovado', titulo: 'Aprovadas' },
            { dados: perdidos, classe: 'perdido', titulo: 'Perdidas' }
        ];
        
        const pipelineContainer = document.querySelector('.pipeline-container');
        if (!pipelineContainer) return;
        
        pipelineContainer.innerHTML = colunas.map(col => `
            <div class="pipeline-column">
                <div class="pipeline-header">
                    <span class="pipeline-title">${col.titulo}</span>
                    <span class="pipeline-count">${col.dados.length}</span>
                </div>
                <div class="pipeline-items">
                    ${col.dados.map(v => `
                        <div class="pipeline-card" onclick="Router.navigateTo('vendas', {vendaId: '${v.id}'})">
                            <div class="pipeline-card-title">${v.cliente}</div>
                            <div class="pipeline-card-info">
                                <i class="fas fa-tag"></i> ${v.tipoBem}
                            </div>
                            <div class="pipeline-card-info">
                                <i class="fas fa-dollar-sign"></i> ${dataHelpers.formatarMoeda(v.credito)}
                            </div>
                            <div class="pipeline-card-footer">
                                <span class="badge-status ${col.classe}">${dataHelpers.traduzirStatus(v.status)}</span>
                                <small>${dataHelpers.formatarData(v.dataAbertura)}</small>
                            </div>
                        </div>
                    `).join('')}
                    ${col.dados.length === 0 ? '<p style="text-align: center; color: #94a3b8; padding: 20px;">Nenhuma venda encontrada</p>' : ''}
                </div>
            </div>
        `).join('');
    },
    
    // Atualizar tabela
    atualizarTabela(vendas) {
        const tbody = document.querySelector('.table-container tbody');
        if (!tbody) return;
        
        if (vendas.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align: center; padding: 40px; color: #64748b;">
                        <i class="fas fa-search" style="font-size: 48px; margin-bottom: 16px; display: block; opacity: 0.5;"></i>
                        Nenhuma venda encontrada com os filtros aplicados
                    </td>
                </tr>
            `;
            return;
        }
        
        tbody.innerHTML = vendas.map(v => `
            <tr>
                <td data-label="ID"><strong>${v.id}</strong></td>
                <td data-label="Cliente">${v.cliente}</td>
                <td data-label="Tipo de Bem">${v.tipoBem}</td>
                <td data-label="Crédito"><strong>${dataHelpers.formatarMoeda(v.credito)}</strong></td>
                <td data-label="Status"><span class="badge-status ${v.status}">${dataHelpers.traduzirStatus(v.status)}</span></td>
                <td data-label="Vendedor">${v.vendedor}</td>
                <td data-label="Data">${dataHelpers.formatarData(v.dataAbertura)}</td>
                <td data-label="Ações">
                    <button class="btn btn-sm btn-primary btn-ver-venda" data-venda-id="${v.id}">
                        <i class="fas fa-eye"></i>
                        Ver
                    </button>
                </td>
            </tr>
        `).join('');
        
        // Re-adicionar event listeners
        document.querySelectorAll('.btn-ver-venda').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const vendaId = e.target.closest('.btn-ver-venda').getAttribute('data-venda-id');
                Router.navigateTo('vendas', { vendaId });
            });
        });
    },
    
    // Limpar filtros
    limparFiltros() {
        const filterSearch = document.getElementById('filter-search');
        const filterStatus = document.getElementById('filter-status');
        const filterTipo = document.getElementById('filter-tipo');
        const filterVendedor = document.getElementById('filter-vendedor');
        
        if (filterSearch) filterSearch.value = '';
        if (filterStatus) filterStatus.value = '';
        if (filterTipo) filterTipo.value = '';
        if (filterVendedor) filterVendedor.value = '';
        
        this.aplicarFiltros();
    }
};

// Expor globalmente
window.Filters = Filters;
