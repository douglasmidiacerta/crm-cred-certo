// ========== SISTEMA DE AUTENTICAÇÃO ==========

const Auth = {
    // Usuário atual
    currentUser: null,
    
    // Verificar se está logado
    async isAuthenticated() {
        const { data: { session } } = await supabase.auth.getSession();
        return session !== null;
    },
    
    // Obter usuário atual
    async getCurrentUser() {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            
            if (!session) {
                return null;
            }
            
            // Buscar dados completos do usuário na tabela usuarios
            const { data: usuario, error } = await supabase
                .from('usuarios')
                .select('*')
                .eq('id', session.user.id)
                .single();
            
            if (error) {
                console.error('Erro ao buscar usuário:', error);
                return null;
            }
            
            this.currentUser = usuario;
            return usuario;
        } catch (error) {
            console.error('Erro ao obter usuário:', error);
            return null;
        }
    },
    
    // Login
    async login(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            
            if (error) {
                throw error;
            }
            
            // Buscar dados do usuário
            await this.getCurrentUser();
            
            return { success: true, data };
        } catch (error) {
            console.error('Erro no login:', error);
            return { 
                success: false, 
                error: error.message 
            };
        }
    },
    
    // Logout
    async logout() {
        try {
            const { error } = await supabase.auth.signOut();
            
            if (error) {
                throw error;
            }
            
            this.currentUser = null;
            
            // Redirecionar para login
            window.location.href = 'login.html';
            
            return { success: true };
        } catch (error) {
            console.error('Erro no logout:', error);
            return { 
                success: false, 
                error: error.message 
            };
        }
    },
    
    // Registrar novo usuário (apenas Admin)
    async register(userData) {
        try {
            // Criar usuário na autenticação
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: userData.email,
                password: userData.password,
                options: {
                    data: {
                        nome: userData.nome,
                        perfil: userData.perfil
                    }
                }
            });
            
            if (authError) {
                throw authError;
            }
            
            // Inserir na tabela usuarios
            const { data: usuario, error: userError } = await supabase
                .from('usuarios')
                .insert([{
                    id: authData.user.id,
                    nome: userData.nome,
                    email: userData.email,
                    telefone: userData.telefone || null,
                    perfil: userData.perfil,
                    ativo: true
                }])
                .select()
                .single();
            
            if (userError) {
                throw userError;
            }
            
            return { success: true, data: usuario };
        } catch (error) {
            console.error('Erro ao registrar:', error);
            return { 
                success: false, 
                error: error.message 
            };
        }
    },
    
    // Verificar permissão
    hasPermission(requiredRole) {
        if (!this.currentUser) {
            return false;
        }
        
        const roles = {
            admin: ['admin'],
            financeiro: ['admin', 'financeiro'],
            vendedor: ['admin', 'financeiro', 'vendedor']
        };
        
        return roles[requiredRole]?.includes(this.currentUser.perfil) || false;
    },
    
    // Proteger página
    async protectPage() {
        const isAuth = await this.isAuthenticated();
        
        if (!isAuth) {
            window.location.href = 'login.html';
            return false;
        }
        
        await this.getCurrentUser();
        return true;
    },
    
    // Atualizar perfil
    async updateProfile(updates) {
        try {
            if (!this.currentUser) {
                throw new Error('Usuário não autenticado');
            }
            
            const { data, error } = await supabase
                .from('usuarios')
                .update(updates)
                .eq('id', this.currentUser.id)
                .select()
                .single();
            
            if (error) {
                throw error;
            }
            
            this.currentUser = data;
            return { success: true, data };
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            return { 
                success: false, 
                error: error.message 
            };
        }
    },
    
    // Alterar senha
    async changePassword(newPassword) {
        try {
            const { data, error } = await supabase.auth.updateUser({
                password: newPassword
            });
            
            if (error) {
                throw error;
            }
            
            return { success: true };
        } catch (error) {
            console.error('Erro ao alterar senha:', error);
            return { 
                success: false, 
                error: error.message 
            };
        }
    },
    
    // Resetar senha (enviar email)
    async resetPassword(email) {
        try {
            const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + '/reset-password.html'
            });
            
            if (error) {
                throw error;
            }
            
            return { success: true };
        } catch (error) {
            console.error('Erro ao resetar senha:', error);
            return { 
                success: false, 
                error: error.message 
            };
        }
    }
};

// Expor globalmente
window.Auth = Auth;

// Listener para mudanças de autenticação
supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth event:', event);
    
    if (event === 'SIGNED_OUT') {
        Auth.currentUser = null;
    } else if (event === 'SIGNED_IN') {
        Auth.getCurrentUser();
    } else if (event === 'TOKEN_REFRESHED') {
        console.log('Token refreshed');
    }
});
