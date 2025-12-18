// ========== PÁGINA DE DETALHES DA VENDA ==========

// Adicionar ao objeto Pages
Pages.vendaDetalhe = function(vendaId) {
    const venda = dataHelpers.obterVendaPorId(vendaId);
    
    if (!venda) {
        return '<div class="text-center mt-4"><h2>Venda não encontrada</h2></div>';
    }
    
    const documentos = dataHelpers.obterDocumentosPorVenda(vendaId);
    const comunicacao = dataHelpers.obterComunicacaoPorVenda(vendaId);
    const financeiro = dataHelpers.obterFinanceiroPorVenda(vendaId);
    
    return `
        <div style="margin-bottom: 24px; display: flex; gap: 12px; flex-wrap: wrap;">
            <button id="btn-voltar-vendas" class="btn btn-secondary">
                <i class="fas fa-arrow-left"></i>
                Voltar para Vendas
            </button>
            <button class="btn btn-primary" onclick="Modals.editarVenda('${vendaId}')">
                <i class="fas fa-edit"></i>
                Editar Venda
            </button>
        </div>

        <!-- Resumo da Venda -->
        <div class="table-container mb-4">
            <div class="table-header">
                <h3 class="table-title">Resumo da Venda - ${venda.id}</h3>
                <span class="badge-status ${venda.status}">${dataHelpers.traduzirStatus(venda.status)}</span>
            </div>
            <div style="padding: 24px;">
                <div class="grid grid-cols-3 gap-3">
                    <div>
                        <p style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; margin-bottom: 8px;">Cliente</p>
                        <p style="font-size: 16px; font-weight: 600;">${venda.cliente}</p>
                        <p style="color: #64748b; font-size: 14px; margin-top: 4px;">
                            <i class="fas fa-phone"></i> ${venda.telefone}
                        </p>
                        <p style="color: #64748b; font-size: 14px; margin-top: 4px;">
                            <i class="fas fa-envelope"></i> ${venda.email}
                        </p>
                    </div>
                    
                    <div>
                        <p style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; margin-bottom: 8px;">Detalhes do Negócio</p>
                        <p style="font-size: 14px; margin-bottom: 8px;">
                            <strong>Tipo de Bem:</strong> ${venda.tipoBem}
                        </p>
                        <p style="font-size: 14px; margin-bottom: 8px;">
                            <strong>Crédito:</strong> ${dataHelpers.formatarMoeda(venda.credito)}
                        </p>
                        <p style="font-size: 14px; margin-bottom: 8px;">
                            <strong>Origem:</strong> ${venda.origem}
                        </p>
                        <p style="font-size: 14px;">
                            <strong>Data Abertura:</strong> ${dataHelpers.formatarData(venda.dataAbertura)}
                        </p>
                    </div>
                    
                    <div>
                        <p style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; margin-bottom: 8px;">Responsáveis</p>
                        <p style="font-size: 14px; margin-bottom: 8px;">
                            <strong>Vendedor:</strong> ${venda.vendedor}
                        </p>
                        <p style="font-size: 14px; margin-bottom: 8px;">
                            <strong>Administradora:</strong> ${venda.administradora}
                        </p>
                        <p style="font-size: 14px;">
                            <strong>Fornecedor:</strong> ${venda.fornecedor}
                        </p>
                    </div>
                </div>
                
                ${venda.observacoes ? `
                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                        <p style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; margin-bottom: 8px;">Observações</p>
                        <p style="font-size: 14px;">${venda.observacoes}</p>
                    </div>
                ` : ''}
            </div>
        </div>

        <!-- Status da Negociação -->
        <div class="table-container mb-4">
            <div class="table-header">
                <h3 class="table-title">Status da Negociação</h3>
            </div>
            <div style="padding: 24px;">
                <div class="flex items-center gap-2" style="margin-bottom: 16px;">
                    <span style="color: #64748b; font-size: 14px; font-weight: 600;">Etapa Atual:</span>
                    <span style="font-size: 14px;">${venda.etapa.replace(/_/g, ' ').toUpperCase()}</span>
                </div>
                
                <!-- Progress Bar -->
                <div style="background: #e2e8f0; height: 8px; border-radius: 4px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #3b82f6, #10b981); height: 100%; width: ${
                        venda.status === 'novo' ? '25%' :
                        venda.status === 'negociacao' ? '50%' :
                        venda.status === 'aprovado' ? '75%' :
                        venda.status === 'finalizado' ? '100%' : '10%'
                    }; transition: width 0.3s ease;"></div>
                </div>
                
                <div class="grid grid-cols-2 gap-3 mt-3">
                    <button class="btn btn-primary">
                        <i class="fas fa-edit"></i>
                        Alterar Status
                    </button>
                    <button class="btn btn-secondary">
                        <i class="fas fa-history"></i>
                        Ver Histórico
                    </button>
                </div>
            </div>
        </div>

        <!-- Grid com 2 colunas -->
        <div class="grid grid-cols-2 gap-3">
            <!-- Documentação -->
            <div class="table-container">
                <div class="table-header">
                    <h3 class="table-title">Documentação do Cliente</h3>
                    <button id="btn-upload-doc" class="btn btn-sm btn-primary">
                        <i class="fas fa-upload"></i>
                        Upload
                    </button>
                </div>
                <div style="padding: 24px;">
                    ${documentos.length > 0 ? `
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            ${documentos.map(doc => `
                                <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border-left: 3px solid ${
                                    doc.status === 'aprovado' ? '#10b981' : 
                                    doc.status === 'pendente' ? '#f59e0b' : '#64748b'
                                };">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <p style="font-weight: 600; margin-bottom: 4px;">${doc.tipo}</p>
                                            <p style="font-size: 12px; color: #64748b;">
                                                <i class="fas fa-file-pdf"></i> ${doc.nome}
                                            </p>
                                            <p style="font-size: 12px; color: #64748b; margin-top: 4px;">
                                                ${dataHelpers.formatarDataHora(doc.dataEnvio)}
                                            </p>
                                        </div>
                                        <span class="badge-status ${doc.status}">${doc.status}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : `
                        <p style="text-align: center; color: #64748b; padding: 40px 0;">
                            <i class="fas fa-folder-open" style="font-size: 48px; margin-bottom: 16px; display: block;"></i>
                            Nenhum documento enviado ainda
                        </p>
                    `}
                </div>
            </div>

            <!-- Comunicação Interna -->
            <div class="table-container">
                <div class="table-header">
                    <h3 class="table-title">Comunicação Interna</h3>
                </div>
                <div style="padding: 24px; max-height: 500px; overflow-y: auto;">
                    ${comunicacao.length > 0 ? `
                        <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 20px;">
                            ${comunicacao.map(msg => `
                                <div style="background: ${msg.tipo === 'acao' ? '#eff6ff' : '#f8fafc'}; padding: 16px; border-radius: 8px; border-left: 3px solid ${msg.tipo === 'acao' ? '#3b82f6' : '#10b981'};">
                                    <div class="flex items-center justify-between mb-2">
                                        <div class="flex items-center gap-2">
                                            <i class="fas fa-user-circle" style="color: #3b82f6; font-size: 20px;"></i>
                                            <div>
                                                <p style="font-weight: 600; font-size: 14px;">${msg.usuario}</p>
                                                <p style="font-size: 11px; color: #64748b;">${msg.perfil}</p>
                                            </div>
                                        </div>
                                        <span style="font-size: 11px; color: #64748b;">
                                            ${dataHelpers.formatarDataHora(msg.data)}
                                        </span>
                                    </div>
                                    <p style="font-size: 14px; color: #1e293b; margin-top: 8px;">${msg.mensagem}</p>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    <!-- Nova Mensagem -->
                    <div>
                        <textarea id="nova-mensagem" class="form-textarea" placeholder="Digite sua mensagem..." rows="3"></textarea>
                        <button id="btn-enviar-mensagem" class="btn btn-primary mt-2" style="width: 100%;">
                            <i class="fas fa-paper-plane"></i>
                            Enviar Mensagem
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Financeiro -->
        <div class="table-container mt-4">
            <div class="table-header">
                <h3 class="table-title">Financeiro da Venda</h3>
                <div class="flex gap-2">
                    ${!financeiro.definitivo ? `
                        <button id="btn-simular-financeiro" class="btn btn-sm btn-secondary">
                            <i class="fas fa-calculator"></i>
                            Simular
                        </button>
                    ` : ''}
                    ${financeiro.simulacao && !financeiro.definitivo ? `
                        <button id="btn-confirmar-financeiro" class="btn btn-sm btn-success">
                            <i class="fas fa-check"></i>
                            Confirmar Lançamentos
                        </button>
                    ` : ''}
                </div>
            </div>
            <div style="padding: 24px;">
                ${financeiro.simulacao && !financeiro.definitivo ? `
                    <div style="background: #fffbeb; border: 1px solid #fcd34d; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
                        <p style="color: #92400e; font-weight: 600;">
                            <i class="fas fa-exclamation-triangle"></i>
                            Simulação Financeira - Clique em "Confirmar Lançamentos" para tornar definitivo
                        </p>
                    </div>
                    
                    <table>
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Beneficiário</th>
                                <th>Valor</th>
                                <th>Vencimento</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${financeiro.simulacao.map(lanc => `
                                <tr>
                                    <td>${lanc.tipo}</td>
                                    <td>${lanc.beneficiario || '-'}</td>
                                    <td style="color: ${lanc.valor > 0 ? '#10b981' : '#ef4444'}; font-weight: 600;">
                                        ${dataHelpers.formatarMoeda(Math.abs(lanc.valor))}
                                    </td>
                                    <td>${dataHelpers.formatarData(lanc.vencimento)}</td>
                                    <td><span class="badge-status ${lanc.status}">${lanc.status}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                ` : financeiro.definitivo ? `
                    <div style="background: #dcfce7; border: 1px solid #86efac; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
                        <p style="color: #166534; font-weight: 600;">
                            <i class="fas fa-check-circle"></i>
                            Lançamentos Confirmados
                        </p>
                    </div>
                    
                    <table>
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Beneficiário</th>
                                <th>Valor</th>
                                <th>Vencimento</th>
                                <th>Status</th>
                                <th>Data Pgto</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${financeiro.definitivo.map(lanc => `
                                <tr>
                                    <td>${lanc.tipo}</td>
                                    <td>${lanc.beneficiario || '-'}</td>
                                    <td style="color: ${lanc.valor > 0 ? '#10b981' : '#ef4444'}; font-weight: 600;">
                                        ${dataHelpers.formatarMoeda(Math.abs(lanc.valor))}
                                    </td>
                                    <td>${dataHelpers.formatarData(lanc.vencimento)}</td>
                                    <td><span class="badge-status ${lanc.status}">${lanc.status}</span></td>
                                    <td>${lanc.dataPagamento ? dataHelpers.formatarData(lanc.dataPagamento) : '-'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                ` : `
                    <p style="text-align: center; color: #64748b; padding: 40px 0;">
                        <i class="fas fa-calculator" style="font-size: 48px; margin-bottom: 16px; display: block;"></i>
                        Clique em "Simular" para gerar os lançamentos financeiros
                    </p>
                `}
            </div>
        </div>
    `;
};
