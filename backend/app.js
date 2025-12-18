const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

// API version endpoint
app.get('/api/version', (req, res) => {
  res.status(200).json({ version: process.env.API_VERSION || 'v1' });
});

// Routes placeholder
app.get('/api/v1/auth/status', (req, res) => {
  res.status(200).json({ message: 'Auth service active' });
});

app.get('/api/v1/vendas', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('lancamentos_financeiros')
      .select('*')
      .limit(10);
    
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/v1/clientes', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('administradoras')
      .select('*')
      .limit(10);
    
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/v1/documentos', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('documentos')
      .select('*')
      .limit(10);
    
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`CRM Cred Certo Backend running on port ${PORT}`);
});

module.exports = app;
