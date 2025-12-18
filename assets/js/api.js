// ========== API - FUNÇÕES DE CRUD ==========

const API = {
    // ==================== VENDAS ====================
    
    // Listar vendas
    async getVendas(filters = {}) {
        try {
            let query = supabase
                .from('vendas')
                .select(`
                    *,
                    cliente:clientes(*),
                    vendedor:usuarios(*),
                    administradora:administradoras(*)
                `)
                .order('created_at', { ascending: false });
            
            // Aplicar filtros
            if (filters.status) {
                query = query.eq('status', filters.status);
            }
            
            if (filters.vendedor_id) {
                query = query.eq('vendedor_id', filters.vendedor_id);
            }
            
            if (filters.tipo_bem) {
                query = query.eq('tipo_bem', filters.tipo_bem);
            }
            
            if (filters.search) {
                // Buscar por nome do cliente
                query = query.ilike('cliente.nome', `%${filters.search}%`);
            }
            
            const { data, error } = await query;
            
            if (error) throw error;
            
            return { success: true, data };
        } catch (error) {
            console.error('Erro ao listar vendas:', error);
            return { success: false, error: error.message };
        }
    },
    
    // Obter venda por ID
    async getVendaById(id) {
        try {
            const { data, error } = await supabase
                .from('vendas')
                .select(`
                    *,
                    cliente:clientes(*),
                    vendedor:usuarios(*),
                    administradora:administradoras(*)
                `)
                .eq('id', id)
                .single();
            
            if (error) throw error;
            
            return { success: true, data };
        } catch (error) {
            console.error('Erro ao obter venda:', error);
            return { success: false, error: error.message };
        }
    },
    
    // Criar venda
    async createVenda(vendaData) {
        try {
            // 1. Criar cliente primeiro
            const clienteData = {
                nome: vendaData.cliente_nome,
                cpf: vendaData.cliente_cpf || 'Não informado',
                telefone: vendaData.cliente_telefone,
                email: vendaData.cliente_email || 'Não informado'
            };
            
            const { data: cliente, error: clienteError } = await supabase
                .from('clientes')
                .insert([clienteData])
                .select()
                .single();
            
            if (clienteError) throw clienteError;
            
            // 2. Gerar código da venda
            const { data: codigoData } = await supabase
                .rpc('gerar_codigo_venda');
            
            const codigo = codigoData || `V${String(Date.now()).slice(-3)}`;
            
            // 3. Obter ID do vendedor atual
            const vendedorId = Auth.currentUser?.id;
            
            if (!vendedorId) {
                throw new Error('Usuário não autenticado');
            }
            
            // 4. Buscar ID da administradora
            let administradoraId = null;
            if (vendaData.administradora && vendaData.administradora !== 'A definir') {
                const { data: admin } = await supabase
                    .from('administradoras')
                    .select('id')
                    .eq('nome', vendaData.administradora)
                    .single();
                
                administradoraId = admin?.id;
            }
            
            // 5. Criar venda
            const novaVenda = {
                codigo,
                cliente_id: cliente.id,
                vendedor_id: vendedorId,
                administradora_id: administradoraId,
                tipo_bem: vendaData.tipo_bem.toLowerCase(),
                valor_credito: parseFloat(vendaData.credito),
                status: 'novo',
                etapa: 'primeiro_contato',
                origem: vendaData.origem,
                fornecedor: vendaData.fornecedor || 'A definir',
                observacoes: vendaData.observacoes || ''
            };
            
            const { data: venda, error: vendaError } = await supabase
                .from('vendas')
                .insert([novaVenda])
                .select()
                .single();
            
            if (vendaError) throw vendaError;
            
            // 6. Adicionar mensagem automática
            await this.addComunicacao(venda.id, {
                tipo: 'acao',
                mensagem: `Venda ${codigo} criada com sucesso. Status: Novo Lead`
            });
            
            return { success: true, data: venda };
        } catch (error) {
            console.error('Erro ao criar venda:', error);
            return { success: false, error: error.message };
        }
    },
    
    // Atualizar venda
    async updateVenda(id, updates) {
        try {
            // Buscar ID da administradora se mudou
            if (updates.administradora && updates.administradora !== 'A definir') {
                const { data: admin } = await supabase
                    .from('administradoras')
                    .select('id')
                    .eq('nome', updates.administradora)
                    .single();
                
                updates.administradora_id = admin?.id;
                delete updates.administradora;
            }
            
            // Converter tipo_bem para minúsculo
            if (updates.tipoBem) {
                updates.tipo_bem = updates.tipoBem.toLowerCase();
                delete updates.tipoBem;
            }
            
            // Converter credito para valor_credito
            if (updates.credito) {
                updates.valor_credito = parseFloat(updates.credito);
                delete updates.credito;
            }
            
            const { data, error } = await supabase
                .from('vendas')
                .update(updates)
                .eq('id', id)
                .select()
                .single();
            
            if (error) throw error;
            
            return { success: true, data };
        } catch (error) {
            console.error('Erro ao atualizar venda:', error);
            return { success: false, error: error.message };
        }
    },
    
    // Deletar venda
    async deleteVenda(id) {
        try {
            const { error } = await supabase
                .from('vendas')
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            
            return { success: true };
        } catch (error) {
            console.error('Erro ao deletar venda:', error);
            return { success: false, error: error.message };
        }
    },
    
    // ==================== COMUNICAÇÃO ====================
    
    // Listar comunicação de uma venda
    async getComunicacao(vendaId) {
        try {
            const { data, error } = await supabase
                .from('comunicacao')
                .select(`
                    *,
                    usuario:usuarios(nome, perfil)
                `)
                .eq('venda_id', vendaId)
                .order('created_at', { ascending: true });
            
            if (error) throw error;
            
            return { success: true, data };
        } catch (error) {
            console.error('Erro ao listar comunicação:', error);
            return { success: false, error: error.message };
        }
    },
    
    // Adicionar mensagem
    async addComunicacao(vendaId, messageData) {
        try {
            const novaMensagem = {
                venda_id: vendaId,
                usuario_id: messageData.usuario_id || Auth.currentUser?.id || null,
                tipo: messageData.tipo || 'mensagem',
                mensagem: messageData.mensagem
            };
            
            const { data, error } = await supabase
                .from('comunicacao')
                .insert([novaMensagem])
                .select()
                .single();
            
            if (error) throw error;
            
            return { success: true, data };
        } catch (error) {
            console.error('Erro ao adicionar mensagem:', error);
            return { success: false, error: error.message };
        }
    },
    
    // ==================== DOCUMENTOS ====================
    
    // Listar documentos de uma venda
    async getDocumentos(vendaId) {
        try {
            const { data, error } = await supabase
                .from('documentos')
                .select('*')
                .eq('venda_id', vendaId)
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            
            return { success: true, data };
        } catch (error) {
            console.error('Erro ao listar documentos:', error);
            return { success: false, error: error.message };
        }
    },
    
    // Upload de documento (simulado por enquanto)
    async uploadDocumento(vendaId, tipo, arquivo) {
        try {
            // Por enquanto, apenas simular
            const docData = {
                venda_id: vendaId,
                tipo,
                nome_arquivo: arquivo.name || `documento_${Date.now()}.pdf`,
                url_arquivo: 'https://exemplo.com/documento.pdf', // URL fictícia
                tamanho_bytes: arquivo.size || 0,
                mime_type: arquivo.type || 'application/pdf',
                status: 'pendente'
            };
            
            const { data, error } = await supabase
                .from('documentos')
                .insert([docData])
                .select()
                .single();
            
            if (error) throw error;
            
            return { success: true, data };
        } catch (error) {
            console.error('Erro ao fazer upload:', error);
            return { success: false, error: error.message };
        }
    },
    
    // ==================== FINANCEIRO ====================
    
    // Listar lançamentos de uma venda
    async getLancamentos(vendaId, simulacao = null) {
        try {
            let query = supabase
                .from('lancamentos_financeiros')
                .select('*')
                .eq('venda_id', vendaId);
            
            if (simulacao !== null) {
                query = query.eq('simulacao', simulacao);
            }
            
            query = query.order('data_vencimento', { ascending: true });
            
            const { data, error } = await query;
            
            if (error) throw error;
            
            return { success: true, data };
        } catch (error) {
            console.error('Erro ao listar lançamentos:', error);
            return { success: false, error: error.message };
        }
    },
    
    // Simular lançamentos
    async simularLancamentos(vendaId, valorCredito) {
        try {
            const comissao = valorCredito * 0.05; // 5%
            const taxa = valorCredito * 0.02; // 2%
            const entrada = valorCredito * 0.10; // 10%
            const pagamentoFornecedor = valorCredito * 0.80; // 80%
            const lucro = entrada - comissao - taxa;
            
            const lancamentos = [
                {
                    venda_id: vendaId,
                    tipo: 'entrada',
                    descricao: 'Entrada do Cliente',
                    valor: entrada,
                    data_vencimento: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    status: 'previsto',
                    simulacao: true
                },
                {
                    venda_id: vendaId,
                    tipo: 'comissao',
                    descricao: `Comissão Vendedor (5%)`,
                    valor: -comissao,
                    beneficiario: Auth.currentUser?.nome || 'Vendedor',
                    data_vencimento: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    status: 'previsto',
                    simulacao: true
                },
                {
                    venda_id: vendaId,
                    tipo: 'pagamento',
                    descricao: 'Pagamento Fornecedor',
                    valor: -pagamentoFornecedor,
                    beneficiario: 'Fornecedor',
                    data_vencimento: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    status: 'previsto',
                    simulacao: true
                },
                {
                    venda_id: vendaId,
                    tipo: 'taxa',
                    descricao: 'Taxa Administrativa (2%)',
                    valor: -taxa,
                    beneficiario: 'Administradora',
                    data_vencimento: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    status: 'previsto',
                    simulacao: true
                },
                {
                    venda_id: vendaId,
                    tipo: 'lucro',
                    descricao: 'Lucro Líquido',
                    valor: lucro,
                    data_vencimento: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    status: 'previsto',
                    simulacao: true
                }
            ];
            
            const { data, error } = await supabase
                .from('lancamentos_financeiros')
                .insert(lancamentos)
                .select();
            
            if (error) throw error;
            
            return { success: true, data };
        } catch (error) {
            console.error('Erro ao simular lançamentos:', error);
            return { success: false, error: error.message };
        }
    },
    
    // Confirmar lançamentos
    async confirmarLancamentos(vendaId) {
        try {
            const { data, error } = await supabase
                .from('lancamentos_financeiros')
                .update({ simulacao: false })
                .eq('venda_id', vendaId)
                .eq('simulacao', true)
                .select();
            
            if (error) throw error;
            
            return { success: true, data };
        } catch (error) {
            console.error('Erro ao confirmar lançamentos:', error);
            return { success: false, error: error.message };
        }
    },
    
    // ==================== DASHBOARD ====================
    
    // Obter estatísticas do dashboard
    async getDashboardStats() {
        try {
            // Total de vendas do mês
            const mesAtual = new Date().getMonth() + 1;
            const anoAtual = new Date().getFullYear();
            
            const { data: vendasMes, error } = await supabase
                .from('vendas')
                .select('valor_credito, status')
                .gte('data_abertura', `${anoAtual}-${String(mesAtual).padStart(2, '0')}-01`);
            
            if (error) throw error;
            
            const totalValor = vendasMes.reduce((sum, v) => sum + parseFloat(v.valor_credito), 0);
            const totalVendas = vendasMes.length;
            const ticketMedio = totalVendas > 0 ? totalValor / totalVendas : 0;
            
            // Vendas por status
            const porStatus = {};
            vendasMes.forEach(v => {
                porStatus[v.status] = (porStatus[v.status] || 0) + 1;
            });
            
            return {
                success: true,
                data: {
                    vendasMes: {
                        valor: totalValor,
                        quantidade: totalVendas,
                        ticketMedio
                    },
                    porStatus
                }
            };
        } catch (error) {
            console.error('Erro ao obter stats:', error);
            return { success: false, error: error.message };
        }
    },
    
    // ==================== UTILITÁRIOS ====================
    
    // Listar administradoras
    async getAdministradoras() {
        try {
            const { data, error } = await supabase
                .from('administradoras')
                .select('*')
                .eq('ativa', true)
                .order('nome');
            
            if (error) throw error;
            
            return { success: true, data };
        } catch (error) {
            console.error('Erro ao listar administradoras:', error);
            return { success: false, error: error.message };
        }
    }
};

// Expor globalmente
window.API = API;
