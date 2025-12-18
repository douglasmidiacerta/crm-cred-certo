# ✅ Checklist de Deploy - GitHub + Vercel

Use este checklist para não esquecer nenhum passo!

---

## 🔧 Preparação (Antes de Começar)

- [ ] Git instalado no computador
  - Download: https://git-scm.com/downloads
  - Verificar: `git --version` no terminal

- [ ] Conta GitHub criada
  - Criar em: https://github.com/signup
  - Verificar email

- [ ] Conta Vercel criada
  - Criar em: https://vercel.com/signup
  - Login com GitHub

- [ ] Arquivo README-GITHUB.md renomeado para README.md
  ```bash
  # Renomear no terminal:
  mv README-GITHUB.md README.md
  ```

---

## 🐙 GitHub (Parte 1)

### Configuração Inicial (Primeira Vez)
- [ ] Git configurado com nome
  ```bash
  git config --global user.name "Seu Nome"
  ```

- [ ] Git configurado com email
  ```bash
  git config --global user.email "seu.email@example.com"
  ```

- [ ] Configuração verificada
  ```bash
  git config --list
  ```

### Criar Repositório
- [ ] Acessado https://github.com/new
- [ ] Nome do repositório: `crm-cred-certo`
- [ ] Descrição adicionada
- [ ] Visibilidade escolhida (Public/Private)
- [ ] **NÃO** marcado "Add a README"
- [ ] Repositório criado
- [ ] URL do repositório copiada

---

## 💻 Terminal (Parte 2)

### Abrir Terminal
- [ ] Terminal aberto na pasta do projeto
  - Windows: Clique direito → "Git Bash Here"
  - Ou: `cd "CAMINHO_DA_PASTA"`

### Comandos Git
- [ ] Repositório inicializado
  ```bash
  git init
  ```

- [ ] Arquivos adicionados
  ```bash
  git add .
  ```

- [ ] Primeiro commit realizado
  ```bash
  git commit -m "Initial commit - CRM Cred Certo completo"
  ```

- [ ] Branch configurada como main
  ```bash
  git branch -M main
  ```

- [ ] Repositório remoto adicionado
  ```bash
  git remote add origin https://github.com/SEU-USUARIO/crm-cred-certo.git
  ```
  ⚠️ Substituir SEU-USUARIO pela sua URL!

- [ ] Código enviado para GitHub
  ```bash
  git push -u origin main
  ```

### Autenticação (Se Pedir)
- [ ] Personal Access Token criado
  - https://github.com/settings/tokens
  - Permissões: `repo` (todas)
  - Token copiado

- [ ] Login realizado
  - Username: seu usuário
  - Password: token copiado

---

## ✅ Verificação GitHub

- [ ] Repositório acessível em:
  ```
  https://github.com/SEU-USUARIO/crm-cred-certo
  ```

- [ ] Todos os arquivos visíveis:
  - [ ] index.html
  - [ ] vercel.json
  - [ ] .gitignore
  - [ ] README.md
  - [ ] LICENSE
  - [ ] pasta assets/
  - [ ] arquivos .md de documentação

- [ ] README.md renderizado corretamente na página

---

## ☁️ Vercel (Parte 3)

### Login
- [ ] Acessado https://vercel.com
- [ ] Login com GitHub realizado
- [ ] Vercel autorizado a acessar repositórios

### Importar Projeto
- [ ] Clicado em "Add New..." → "Project"
- [ ] Repositório `crm-cred-certo` encontrado
- [ ] Clicado em "Import"

### Configuração
- [ ] Project Name: `crm-cred-certo`
- [ ] Framework Preset: `Other`
- [ ] Root Directory: `./` (padrão)
- [ ] Build Command: (vazio)
- [ ] Output Directory: (vazio)
- [ ] Install Command: (vazio)
- [ ] Environment Variables: (nenhuma)

### Deploy
- [ ] Clicado em "Deploy"
- [ ] Aguardado build (~30-60 segundos)
- [ ] Deploy concluído com sucesso (confetes 🎉)
- [ ] URL do site copiada

---

## 🌐 Verificação Vercel

- [ ] Site acessível em:
  ```
  https://crm-cred-certo.vercel.app
  ```
  (ou URL similar gerada automaticamente)

### Testar Funcionalidades
- [ ] Dashboard carrega corretamente
- [ ] Gráficos aparecem
- [ ] Navegação funciona (sidebar)
- [ ] Página de Vendas abre
- [ ] Pipeline visual funciona
- [ ] Criar Nova Venda (modal abre)
- [ ] Filtros funcionam
- [ ] Detalhes de venda (clicar em V001)
- [ ] Editar Venda funciona
- [ ] Timeline de comunicação carrega
- [ ] Financeiro aparece

### Testar Mobile
- [ ] Redimensionar navegador para <768px
- [ ] Botão hamburger aparece
- [ ] Menu abre ao clicar
- [ ] Overlay funciona
- [ ] Tabelas viram cards
- [ ] Forms em 1 coluna

---

## 🎨 Customização (Opcional)

### Domínio Personalizado
- [ ] Ir em Settings → Domains no Vercel
- [ ] Adicionar domínio customizado
- [ ] Configurar DNS

### Renomear Projeto
- [ ] Ir em Settings → General
- [ ] Alterar "Project Name"
- [ ] Nova URL: `https://novo-nome.vercel.app`

### README Personalizado
- [ ] Editar README.md
- [ ] Adicionar screenshots reais
- [ ] Atualizar URLs
- [ ] Commit e push
  ```bash
  git add README.md
  git commit -m "Atualiza README"
  git push
  ```

---

## 📱 Compartilhar

### Links para Compartilhar
- [ ] Copiar URL do Vercel:
  ```
  https://crm-cred-certo.vercel.app
  ```

- [ ] Copiar URL do GitHub:
  ```
  https://github.com/SEU-USUARIO/crm-cred-certo
  ```

### Enviar Para
- [ ] Equipe de vendas
- [ ] Gestores
- [ ] Desenvolvedores (GitHub)
- [ ] Stakeholders

---

## 📊 Pós-Deploy

### Monitoramento
- [ ] Verificar Analytics no Vercel
  - Dashboard → seu projeto → Analytics

- [ ] Verificar logs de erro
  - Dashboard → seu projeto → Functions

### Atualizações Futuras
- [ ] Testar fluxo de atualização:
  ```bash
  # Fazer alteração
  git add .
  git commit -m "Teste de deploy automático"
  git push
  ```

- [ ] Verificar deploy automático no Vercel
- [ ] Confirmar que site atualizou

---

## 🐛 Troubleshooting

### Se algo der errado no Git:
- [ ] Revisar COMANDOS-GIT.md seção "Solução de Problemas"
- [ ] Verificar URL do repositório: `git remote -v`
- [ ] Verificar status: `git status`

### Se algo der errado no Vercel:
- [ ] Verificar logs de build no dashboard
- [ ] Confirmar que vercel.json está correto
- [ ] Verificar se todos os arquivos estão no GitHub
- [ ] Tentar "Redeploy" no Vercel

### Se o site não funcionar:
- [ ] Abrir Console do navegador (F12)
- [ ] Verificar erros JavaScript
- [ ] Verificar se arquivos CSS/JS carregaram
- [ ] Testar em modo anônimo (limpar cache)

---

## 📝 Documentação Criada

- [ ] README.md no GitHub está completo
- [ ] DEPLOY.md revisado
- [ ] COMANDOS-GIT.md consultado
- [ ] URLs atualizadas em todos os arquivos

---

## 🎉 Deploy Completo!

### Confirmações Finais
- [ ] ✅ Código no GitHub
- [ ] ✅ Site online no Vercel
- [ ] ✅ Deploy automático funcionando
- [ ] ✅ Todas as funcionalidades testadas
- [ ] ✅ Mobile responsivo
- [ ] ✅ Links compartilhados
- [ ] ✅ Equipe pode acessar

### Celebrar! 🎊
- [ ] Screenshot do site online
- [ ] Print do GitHub com código
- [ ] Print do Vercel dashboard
- [ ] Enviar para equipe

---

## 📅 Próximos Passos (Opcional)

### Curto Prazo (Esta Semana)
- [ ] Coletar feedback da equipe
- [ ] Adicionar screenshots reais ao README
- [ ] Configurar domínio próprio (se tiver)
- [ ] Adicionar Google Analytics

### Médio Prazo (Este Mês)
- [ ] Implementar módulos restantes (Clientes, Cartas)
- [ ] Adicionar mais dados de exemplo
- [ ] Melhorar dashboard com mais gráficos
- [ ] Criar vídeo de demonstração

### Longo Prazo (Próximos Meses)
- [ ] Implementar backend (ver BACKEND-DATABASE.md)
- [ ] Integrar com API
- [ ] Adicionar autenticação real
- [ ] Upload real de arquivos
- [ ] Integração WhatsApp

---

## 💡 Dicas Finais

✅ **Faça backup local** do projeto regularmente
✅ **Commit frequentemente** (várias vezes ao dia)
✅ **Use mensagens descritivas** nos commits
✅ **Teste antes de fazer push** em produção
✅ **Documente mudanças** importantes
✅ **Mantenha o README atualizado**

---

**✨ Parabéns por completar o deploy!**

Seu CRM está online e pronto para uso! 🚀

---

**Data do Deploy:** ___/___/______
**URL do Site:** _________________________________
**URL do GitHub:** _________________________________

---

*Última atualização: Janeiro 2024*
