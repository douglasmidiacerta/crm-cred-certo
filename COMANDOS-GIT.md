# 🚀 Comandos Git - Guia Rápido para Deploy

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter:
- ✅ Git instalado: https://git-scm.com/downloads
- ✅ Conta no GitHub: https://github.com/signup
- ✅ Conta no Vercel: https://vercel.com/signup

---

## 🎯 Passo a Passo Simplificado

### 1️⃣ Abrir Terminal na Pasta do Projeto

**Windows (PowerShell):**
```powershell
cd "C:\Users\Pc - Acer\OneDrive - 1nxbyl\Documentos\Site - Vs Code\CRM Cred Certo"
```

**Ou clique com botão direito na pasta → "Git Bash Here"**

---

### 2️⃣ Configurar Git (Primeira Vez Apenas)

```bash
# Configurar seu nome
git config --global user.name "Seu Nome"

# Configurar seu email
git config --global user.email "seu.email@example.com"

# Verificar configuração
git config --list
```

---

### 3️⃣ Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. **Repository name:** `crm-cred-certo`
3. **Description:** `CRM para gestão de cartas contempladas`
4. **Visibility:** Public
5. ⚠️ **NÃO marque** "Add a README"
6. Clique **"Create repository"**
7. **Copie a URL** que aparece (algo como: `https://github.com/SEU-USUARIO/crm-cred-certo.git`)

---

### 4️⃣ Enviar Código para GitHub

**Copie e cole TODOS estes comandos no terminal:**

```bash
# Inicializar repositório
git init

# Adicionar todos os arquivos
git add .

# Fazer primeiro commit
git commit -m "Initial commit - CRM Cred Certo completo"

# Configurar branch principal
git branch -M main

# Adicionar repositório remoto (SUBSTITUA pela sua URL!)
git remote add origin https://github.com/SEU-USUARIO/crm-cred-certo.git

# Enviar para GitHub
git push -u origin main
```

⚠️ **IMPORTANTE:** Na linha `git remote add origin`, substitua `SEU-USUARIO` pelo seu usuário do GitHub!

---

### 5️⃣ Autenticação (Se Pedir)

Se aparecer pedindo usuário e senha:

**Opção A: Com Personal Access Token (Recomendado)**
1. Acesse: https://github.com/settings/tokens
2. Clique em **"Generate new token"** → **"Generate new token (classic)"**
3. **Note:** "CRM Cred Certo"
4. **Expiration:** 90 days (ou No expiration)
5. Marque: ✅ **repo** (todos os subitens)
6. Clique em **"Generate token"**
7. **COPIE O TOKEN** (você não verá novamente!)
8. No terminal:
   - **Username:** seu usuário do GitHub
   - **Password:** cole o token (não aparece ao digitar, é normal)

**Opção B: Com GitHub CLI**
```bash
# Instalar GitHub CLI (se não tiver)
# Windows: winget install GitHub.cli

# Fazer login
gh auth login

# Seguir instruções interativas
```

---

### 6️⃣ Verificar Sucesso

Acesse:
```
https://github.com/SEU-USUARIO/crm-cred-certo
```

Você deve ver todos os arquivos! 🎉

---

## ☁️ Deploy no Vercel

### Método 1: Importar do GitHub (Mais Fácil)

1. Acesse: https://vercel.com
2. Clique em **"Add New..."** → **"Project"**
3. Conecte com GitHub (se ainda não conectou)
4. Encontre **"crm-cred-certo"**
5. Clique em **"Import"**
6. **Configurações:**
   - Project Name: `crm-cred-certo`
   - Framework Preset: `Other`
   - Root Directory: `./`
   - Build Command: (deixe vazio)
   - Output Directory: (deixe vazio)
7. Clique em **"Deploy"**
8. Aguarde ~30 segundos ⏱️
9. ✅ **Pronto!** Acesse: `https://crm-cred-certo.vercel.app`

### Método 2: Com Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer login
vercel login

# Deploy
vercel

# Seguir instruções
# Apertar Enter em todas as perguntas (aceitar padrões)
```

---

## 🔄 Atualizar o Site (Futuro)

Sempre que fizer alterações:

```bash
# 1. Ver o que mudou
git status

# 2. Adicionar alterações
git add .

# 3. Commitar com mensagem descritiva
git commit -m "Descrição do que você mudou"

# 4. Enviar para GitHub
git push
```

**O Vercel faz deploy automático!** 🚀

---

## 📝 Comandos Git Mais Usados

```bash
# Ver status dos arquivos
git status

# Ver histórico de commits
git log --oneline

# Ver diferenças antes de commitar
git diff

# Adicionar arquivo específico
git add arquivo.js

# Commitar apenas arquivos específicos
git add arquivo1.js arquivo2.css
git commit -m "Atualização específica"

# Desfazer último commit (mantém alterações)
git reset --soft HEAD~1

# Desfazer alterações em um arquivo
git checkout -- arquivo.js

# Ver branches
git branch

# Criar nova branch
git checkout -b nova-funcionalidade

# Voltar para main
git checkout main

# Mesclar branch
git merge nova-funcionalidade

# Atualizar do GitHub (se trabalhar em múltiplos PCs)
git pull

# Ver repositórios remotos
git remote -v

# Alterar URL do repositório remoto
git remote set-url origin NOVA-URL
```

---

## 🆘 Solução de Problemas

### Erro: "fatal: not a git repository"
**Solução:** Você não está na pasta certa
```bash
cd "C:\Users\Pc - Acer\OneDrive - 1nxbyl\Documentos\Site - Vs Code\CRM Cred Certo"
```

### Erro: "fatal: remote origin already exists"
**Solução:** Remover e adicionar novamente
```bash
git remote remove origin
git remote add origin SUA-URL
```

### Erro: "Permission denied"
**Solução:** Use Personal Access Token em vez de senha

### Erro: "Updates were rejected"
**Solução:** Baixar alterações primeiro
```bash
git pull origin main --rebase
git push
```

### Erro: Não consegue dar push
**Solução:** Force push (cuidado!)
```bash
git push -f origin main
```

### Arquivos não aparecem no GitHub
**Solução:** Verificar .gitignore
```bash
git check-ignore -v NOME-DO-ARQUIVO
```

---

## ✅ Checklist Completo

Marque conforme completar:

### Preparação
- [ ] Git instalado
- [ ] Conta GitHub criada
- [ ] Conta Vercel criada
- [ ] Terminal aberto na pasta do projeto

### GitHub
- [ ] `git config` executado (nome e email)
- [ ] Repositório criado no GitHub
- [ ] URL do repositório copiada
- [ ] `git init` executado
- [ ] `git add .` executado
- [ ] `git commit` executado
- [ ] `git remote add origin` executado (com SUA URL)
- [ ] `git push` executado com sucesso
- [ ] Código visível no GitHub

### Vercel
- [ ] Login no Vercel realizado
- [ ] Projeto importado do GitHub
- [ ] Deploy configurado
- [ ] Deploy concluído com sucesso
- [ ] Site acessível na URL do Vercel
- [ ] Todas as funcionalidades testadas

### Pós-Deploy
- [ ] URL compartilhada com equipe
- [ ] Link atualizado no README
- [ ] Domínio customizado configurado (opcional)

---

## 🎯 Exemplo Completo Passo a Passo

```bash
# 1. Entrar na pasta
cd "C:\Users\Pc - Acer\OneDrive - 1nxbyl\Documentos\Site - Vs Code\CRM Cred Certo"

# 2. Configurar Git (primeira vez)
git config --global user.name "João Silva"
git config --global user.email "joao@credcerto.com"

# 3. Inicializar repositório
git init

# 4. Adicionar arquivos
git add .

# 5. Primeiro commit
git commit -m "Initial commit - CRM Cred Certo completo"

# 6. Definir branch como main
git branch -M main

# 7. Conectar com GitHub (substitua SEU-USUARIO!)
git remote add origin https://github.com/SEU-USUARIO/crm-cred-certo.git

# 8. Enviar para GitHub
git push -u origin main

# Se pedir autenticação:
# Username: seu-usuario
# Password: cole seu personal access token

# 9. Verificar no navegador
# https://github.com/SEU-USUARIO/crm-cred-certo

# 10. Deploy no Vercel (fazer pela interface web)
# https://vercel.com/new

# Pronto! 🎉
```

---

## 📞 Ajuda Adicional

**Documentação Oficial:**
- Git: https://git-scm.com/doc
- GitHub: https://docs.github.com
- Vercel: https://vercel.com/docs

**Tutoriais em Vídeo:**
- Git e GitHub para Iniciantes: https://www.youtube.com/results?search_query=git+github+tutorial+português
- Deploy no Vercel: https://www.youtube.com/results?search_query=vercel+deploy+tutorial

**Comunidade:**
- Stack Overflow: https://stackoverflow.com
- GitHub Community: https://github.community

---

## 🎉 Pronto!

Após seguir estes passos, você terá:

✅ Código versionado no GitHub
✅ Site online no Vercel  
✅ Deploy automático a cada push
✅ HTTPS grátis
✅ URL personalizada do Vercel

**Seu CRM estará acessível de qualquer lugar do mundo! 🌍**

---

**Última atualização:** Janeiro 2024
