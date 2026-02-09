const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

// Start the Discord bot
require('./bot');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files (HTML, CSS, JS)
app.use(express.static('.'));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL Connection Pool
const pool = new Pool({
  user: 'postgres',
  password: '1',
  host: 'localhost',
  port: 5432,
  database: 'saas'
});

// Test veritabanı bağlantısı
pool.connect((err, client, release) => {
  if (err) {
    console.error('Veritabanı bağlantı hatası:', err.stack);
  } else {
    console.log('✓ PostgreSQL bağlantısı başarılı!');
    release();
  }
});

// Tabloları oluştur
async function initDatabase() {
  try {
    // Messages tablosu
    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Page visits tablosu
    await pool.query(`
      CREATE TABLE IF NOT EXISTS page_visits (
        id SERIAL PRIMARY KEY,
        path VARCHAR(255),
        referrer VARCHAR(255),
        user_agent TEXT,
        api_key VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✓ Tablolar başarıyla oluşturuldu!');
  } catch (error) {
    console.error('Tablo oluşturma hatası:', error);
  }
}

initDatabase();

// Routes

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validasyon
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Tüm alanlar zorunludur' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO messages (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING id, created_at',
      [name, email, subject, message]
    );

    res.status(201).json({
      success: true,
      message: 'Mesaj başarıyla kaydedildi',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Mesaj kaydetme hatası:', error);
    res.status(500).json({ error: 'Mesaj kaydedilirken hata oluştu' });
  }
});

// Page visit tracking endpoint
app.post('/api/track-visit', async (req, res) => {
  const { path, referrer, userAgent, apiKey } = req.body;

  try {
    await pool.query(
      'INSERT INTO page_visits (path, referrer, user_agent, api_key) VALUES ($1, $2, $3, $4)',
      [path, referrer, userAgent, apiKey]
    );

    res.status(200).json({ success: true, message: 'Ziyaret kaydedildi' });
  } catch (error) {
    console.error('Ziyaret kaydı hatası:', error);
    res.status(500).json({ error: 'Ziyaret kaydedilirken hata oluştu' });
  }
});

// Tüm mesajları getir (admin panel için)
app.get('/api/messages', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Mesajları getirme hatası:', error);
    res.status(500).json({ error: 'Mesajlar getirilirken hata oluştu' });
  }
});

// Sayfa ziyaretlerini getir (admin panel için)
app.get('/api/visits', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM page_visits ORDER BY created_at DESC LIMIT 100');
    res.json(result.rows);
  } catch (error) {
    console.error('Ziyaretleri getirme hatası:', error);
    res.status(500).json({ error: 'Ziyaretler getirilirken hata oluştu' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server çalışıyor' });
});

// Server başlat
app.listen(PORT, () => {
  console.log(`🚀 Server çalışıyor: http://localhost:${PORT}`);
});
