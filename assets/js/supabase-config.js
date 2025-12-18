// ========== CONFIGURAÇÃO DO SUPABASE ==========

// ⚠️ IMPORTANTE: Substitua pelas suas credenciais do Supabase!
// Obtenha em: https://app.supabase.com → Seu Projeto → Settings → API

const SUPABASE_URL = 'https://dgjxwtjmmfhpkssnrhyj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnanh3dGptbWZocGtzc25yaHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5OTk4MTcsImV4cCI6MjA4MTU3NTgxN30.tnN1zEAJ_PidZdqUUu5AjCcGV4GNt79RML3z2Bsoud0';

// Criar cliente Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Verificar se está configurado corretamente
if (SUPABASE_URL === 'SUA-PROJECT-URL-AQUI' || SUPABASE_ANON_KEY === 'SUA-API-KEY-AQUI') {
    console.error('❌ ERRO: Configure as credenciais do Supabase em supabase-config.js');
    console.log('📖 Ver arquivo: BACKEND-SUPABASE-SETUP.md');
} else {
    console.log('✅ Supabase configurado corretamente');
    console.log('🔗 URL:', SUPABASE_URL);
}

// Expor globalmente
window.supabase = supabase;
window.SUPABASE_URL = SUPABASE_URL;
