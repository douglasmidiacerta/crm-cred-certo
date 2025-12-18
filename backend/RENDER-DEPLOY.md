# Backend Deployment to Render

## Overview
This guide explains how to deploy the CRM Cred Certo backend to Render.com

## Prerequisites
1. Render.com account (https://render.com)
2. GitHub repository connected
3. Supabase project configured with:
   - Project URL: https://dgjxwtjmmfhpkssnrhyj.supabase.co
   - Service role key
   - Anon key

## Deployment Steps

### Step 1: Prepare Environment Variables
Copy `.env.example` to `.env` and fill in your values:
```
SUPABASE_URL=https://dgjxwtjmmfhpkssnrhyj.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NODE_ENV=production
PORT=3000
```

### Step 2: Deploy to Render
1. Go to https://render.com
2. Sign in with GitHub
3. Click "New +" and select "Web Service"
4. Select your GitHub repository
5. Configure:
   - Name: crm-cred-certo-backend
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Add Environment Variables from `.env` file
7. Click "Create Web Service"

### Step 3: Configure Environment Variables in Render
1. Go to your service settings
2. Under "Environment", add each variable from `.env`
3. Key variables:
   - SUPABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY
   - SUPABASE_ANON_KEY
   - NODE_ENV=production
   - PORT=3000

### Step 4: Monitor Deployment
1. Go to "Logs" tab
2. Wait for deployment to complete
3. You should see: "CRM Cred Certo Backend running on port 3000"

## Test Your API
Once deployed, test the endpoints:
```bash
# Health check
curl https://your-app-name.onrender.com/health

# API version
curl https://your-app-name.onrender.com/api/version

# Get vendas
curl https://your-app-name.onrender.com/api/v1/vendas
```

## Frontend Integration
Update your frontend API URL:
```javascript
const API_BASE_URL = 'https://your-app-name.onrender.com/api/v1';
```

## Troubleshooting
- Check Render logs for errors
- Verify all environment variables are set
- Ensure Supabase project is accessible
- Check CORS configuration in app.js

## Additional Resources
- Render Docs: https://render.com/docs
- Node.js Support: https://render.com/docs/deploy-node
