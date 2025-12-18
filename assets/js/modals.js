// ========== SISTEMA DE MODAIS ==========

const Modals = {
    // Criar modal de nova venda
    criarNovaVenda() {
        const html = `
            <div class="modal active" id="modal-nova-venda">
                <div class="modal-content" style="max-width: 800px;">
                    <div class="modal-header">
                        <h2 class="modal-title">
                            <i class="fas fa-plus-circle"></i>
                            Nova Venda
                        </h2>
                        <button class="btn-close-modal" onclick="Modals.fechar('modal-nova-venda')">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <form id="form-nova-venda" onsubmit="Modals.salvarNovaVenda(event)">
                        <div class="modal-body">
                            <h3 style="margin-bottom: 20px; color: #1e3a8a; font-size: 16px; font-weight: 600;">
                                Informações do Cliente
                            </h3>
                            
                            <div class="grid grid-cols-2 gap-2">
                                <div class="form-group">
                                    <label class="form-label">Nome do Cliente *</label>
                                    <input type="text" class="form-input" name="cliente_nome" required>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">CPF</label>
                                    <input type="text" class="form-input" name="cliente_cpf" placeholder="000.000.000-00">
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Telefone/WhatsApp *</label>
                                    <input type="text" class="form-input" name="cliente_telefone" placeholder="(00) 00000-0000" required>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Email</label>
                                    <input type="email" class="form-input" name="cliente_email" placeholder="cliente@email.com">
                                </div>
                            </div>
                            
                            <hr style="margin: 24px 0; border: none; border-top: 1px solid #e2e8f0;">
                            
                            <h3 style="margin-bottom: 20px; color: #1e3a8a; font-size: 16px; font-weight: 600;">
                                Detalhes da Venda
                            </h3>
                            
                            <div class="grid grid-cols-2 gap-2">
                                <div class="form-group">
                                    <label class="form-label">Tipo de Bem *</label>
                                    <select class="form-select" name="tipo_bem" required>
                                        <option value="">Selecione...</option>
                                        <option value="Imóvel">Imóvel</option>
                                        <option value="Automóvel">Automóvel</option>
                                        <option value="Serviços">Serviços</option>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Valor do Crédito *</label>
                                    <input type="number" class="form-input" name="credito" placeholder="250000" required>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Origem do Lead *</label>
                                    <select class="form-select" name="origem" required>
                                        <option value="">Selecione...</option>
                                        <option value="Facebook Ads">Facebook Ads</option>
                                        <option value="Google Ads">Google Ads</option>
                                        <option value="Instagram">Instagram</option>
                                        <option value="WhatsApp">WhatsApp</option>
                                        <option value="Indicação">Indicação</option>
                                        <option value="Site">Site</option>
                                        <option value="Outro">Outro</option>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Vendedor Responsável *</label>
                                    <select class="form-select" name="vendedor" required>
                                        <option value="">Selecione...</option>
                                        <option value="João Silva">João Silva</option>
                                        <option value="Maria Santos">Maria Santos</option>
                                        <option value="Carlos Oliveira">Carlos Oliveira</option>
                                        <option value="Ana Costa">Ana Costa</option>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Administradora</label>
                                    <select class="form-select" name="administradora">
                                        <option value="">A definir</option>
                                        <option value="Embracon">Embracon</option>
                                        <option value="Rodobens">Rodobens</option>
                                        <option value="Porto Seguro">Porto Seguro</option>
                                        <option value="Bradesco">Bradesco Consórcios</option>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Fornecedor/Cotista</label>
                                    <input type="text" class="form-input" name="fornecedor" placeholder="Ex: Construtora Alpha">
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Observações</label>
                                <textarea class="form-textarea" name="observacoes" rows="3" placeholder="Informações adicionais sobre a venda..."></textarea>
                            </div>
                        </div>
                        
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onclick="Modals.fechar('modal-nova-venda')">
                                <i class="fas fa-times"></i>
                                Cancelar
                            </button>
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-save"></i>
                                Criar Venda
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', html);
    },
    
    // Salvar nova venda
    async salvarNovaVenda(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        
        // Desabilitar botão submit
        const btnSubmit = form.querySelector('button[type="submit"]');
        const originalText = btnSubmit.innerHTML;
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Criando...';
        
        try {
            // Preparar dados
            const vendaData = {
                cliente_nome: formData.get('cliente_nome'),
                cliente_cpf: formData.get('cliente_cpf'),
                cliente_telefone: formData.get('cliente_telefone'),
                cliente_email: formData.get('cliente_email'),
                tipo_bem: formData.get('tipo_bem'),
                credito: formData.get('credito'),
                origem: formData.get('origem'),
                administradora: formData.get('administradora'),
                fornecedor: formData.get('fornecedor'),
                observacoes: formData.get('observacoes')
            };
            
            // Criar venda via API
            const result = await API.createVenda(vendaData);
            
            if (result.success) {
                // Fechar modal
                this.fechar('modal-nova-venda');
                
                // Mostrar notificação
                this.mostrarNotificacao('Venda criada com sucesso!', 'success');
                
                // Recarregar página de vendas
                Router.navigateTo('vendas');
            } else {
                throw new Error(result.error || 'Erro ao criar venda');
            }
        } catch (error) {
            console.error('Erro:', error);
            this.mostrarNotificacao('Erro ao criar venda: ' + error.message, 'error');
            
            // Reabilitar botão
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = originalText;
        }
    },
    
    // Modal de edição de venda
    editarVenda(vendaId) {
        const venda = dataHelpers.obterVendaPorId(vendaId);
        if (!venda) return;
        
        const html = `
            <div class="modal active" id="modal-editar-venda">
                <div class="modal-content" style="max-width: 800px;">
                    <div class="modal-header">
                        <h2 class="modal-title">
                            <i class="fas fa-edit"></i>
                            Editar Venda ${venda.id}
                        </h2>
                        <button class="btn-close-modal" onclick="Modals.fechar('modal-editar-venda')">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <form id="form-editar-venda" onsubmit="Modals.salvarEdicaoVenda(event, '${vendaId}')">
                        <div class="modal-body">
                            <div class="grid grid-cols-2 gap-2">
                                <div class="form-group">
                                    <label class="form-label">Status</label>
                                    <select class="form-select" name="status">
                                        <option value="novo" ${venda.status === 'novo' ? 'selected' : ''}>Novo Lead</option>
                                        <option value="negociacao" ${venda.status === 'negociacao' ? 'selected' : ''}>Em Negociação</option>
                                        <option value="aprovado" ${venda.status === 'aprovado' ? 'selected' : ''}>Aprovado</option>
                                        <option value="perdido" ${venda.status === 'perdido' ? 'selected' : ''}>Perdido</option>
                                        <option value="finalizado" ${venda.status === 'finalizado' ? 'selected' : ''}>Finalizado</option>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Tipo de Bem</label>
                                    <select class="form-select" name="tipoBem">
                                        <option value="Imóvel" ${venda.tipoBem === 'Imóvel' ? 'selected' : ''}>Imóvel</option>
                                        <option value="Automóvel" ${venda.tipoBem === 'Automóvel' ? 'selected' : ''}>Automóvel</option>
                                        <option value="Serviços" ${venda.tipoBem === 'Serviços' ? 'selected' : ''}>Serviços</option>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Valor do Crédito</label>
                                    <input type="number" class="form-input" name="credito" value="${venda.credito}">
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Administradora</label>
                                    <select class="form-select" name="administradora">
                                        <option value="Embracon" ${venda.administradora === 'Embracon' ? 'selected' : ''}>Embracon</option>
                                        <option value="Rodobens" ${venda.administradora === 'Rodobens' ? 'selected' : ''}>Rodobens</option>
                                        <option value="Porto Seguro" ${venda.administradora === 'Porto Seguro' ? 'selected' : ''}>Porto Seguro</option>
                                        <option value="Bradesco" ${venda.administradora === 'Bradesco' ? 'selected' : ''}>Bradesco</option>
                                        <option value="A definir" ${venda.administradora === 'A definir' ? 'selected' : ''}>A definir</option>
                                    </select>
                                </div>
                                
                                <div class="form-group" style="grid-column: span 2;">
                                    <label class="form-label">Fornecedor/Cotista</label>
                                    <input type="text" class="form-input" name="fornecedor" value="${venda.fornecedor || ''}">
                                </div>
                                
                                <div class="form-group" style="grid-column: span 2;">
                                    <label class="form-label">Observações</label>
                                    <textarea class="form-textarea" name="observacoes" rows="3">${venda.observacoes || ''}</textarea>
                                </div>
                            </div>
                        </div>
                        
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onclick="Modals.fechar('modal-editar-venda')">
                                <i class="fas fa-times"></i>
                                Cancelar
                            </button>
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-save"></i>
                                Salvar Alterações
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', html);
    },
    
    // Salvar edição
    async salvarEdicaoVenda(event, vendaId) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        
        // Desabilitar botão submit
        const btnSubmit = form.querySelector('button[type="submit"]');
        const originalText = btnSubmit.innerHTML;
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';
        
        try {
            // Preparar dados
            const updates = {
                status: formData.get('status'),
                tipoBem: formData.get('tipoBem'),
                credito: formData.get('credito'),
                administradora: formData.get('administradora'),
                fornecedor: formData.get('fornecedor'),
                observacoes: formData.get('observacoes')
            };
            
            // Atualizar via API
            const result = await API.updateVenda(vendaId, updates);
            
            if (result.success) {
                // Registrar mudança de status se houve
                const statusAnterior = result.data.status;
                if (statusAnterior !== updates.status) {
                    await API.addComunicacao(vendaId, {
                        tipo: 'sistema',
                        mensagem: `Status alterado para: ${dataHelpers.traduzirStatus(updates.status)}`
                    });
                }
                
                // Fechar modal
                this.fechar('modal-editar-venda');
                
                // Mostrar notificação
                this.mostrarNotificacao('Venda atualizada com sucesso!', 'success');
                
                // Recarregar detalhes
                Router.navigateTo('vendas', { vendaId });
            } else {
                throw new Error(result.error || 'Erro ao atualizar venda');
            }
        } catch (error) {
            console.error('Erro:', error);
            this.mostrarNotificacao('Erro ao atualizar venda: ' + error.message, 'error');
            
            // Reabilitar botão
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = originalText;
        }
    },
    
    // Fechar modal
    fechar(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.remove();
        }
    },
    
    // Mostrar notificação toast
    mostrarNotificacao(mensagem, tipo = 'success') {
        const icones = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        
        const cores = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        
        const html = `
            <div class="toast-notification" style="
                position: fixed;
                top: 90px;
                right: 20px;
                background: white;
                padding: 16px 20px;
                border-radius: 8px;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                display: flex;
                align-items: center;
                gap: 12px;
                z-index: 10000;
                animation: slideInRight 0.3s ease;
                border-left: 4px solid ${cores[tipo]};
            ">
                <i class="fas ${icones[tipo]}" style="color: ${cores[tipo]}; font-size: 20px;"></i>
                <span style="color: #1e293b; font-weight: 500;">${mensagem}</span>
            </div>
            
            <style>
                @keyframes slideInRight {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
            </style>
        `;
        
        document.body.insertAdjacentHTML('beforeend', html);
        
        const toast = document.querySelector('.toast-notification');
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

// Expor globalmente
window.Modals = Modals;
