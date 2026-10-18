const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
require('dotenv').config();

const { pool } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(compression());
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json());

// Verify DB connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('🔴 Database connection failed:', err.message);
  } else {
    console.log('✅ PostgreSQL connected');
    release();
  }
});

// Static assets
app.use('/images', express.static(path.join(__dirname, '../client/public/images')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/contact', require('./routes/contact'));

app.get('/health', (req, res) => res.json({ status: 'ok', time: new Date() }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`\n🔥 Mirchi Store Server running on port ${PORT}`);
  console.log(`   Admin: http://localhost:3000/admin`);
  console.log(`   API:   http://localhost:${PORT}/health\n`);
});
