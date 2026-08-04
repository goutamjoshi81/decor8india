import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'decor8india_super_secret_jwt_key_2026';

app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', server: 'Decor8India API', timestamp: new Date().toISOString() });
});

// Auth Route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Demo Authentication Logic
  let role = 'CLIENT';
  let isApproved = true;
  let name = 'Client User';

  if (email.toLowerCase().includes('admin')) {
    role = 'ADMIN';
    name = 'Decor8India Admin';
  }

  const token = jwt.sign(
    { email, role, isApproved, name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    token,
    user: {
      email,
      name,
      role,
      isApproved
    }
  });
});

// RSS 2.0 Feed Generator Endpoint
app.get('/rss.xml', (req, res) => {
  res.set('Content-Type', 'text/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Decor8India Luxury Interiors &amp; Architecture Journal</title>
  <link>https://decor8india.com</link>
  <description>Latest luxury interior design trends, color forecasts, and turnkey architectural case studies.</description>
  <language>en-us</language>
  <item>
    <title>10 Luxury Interior Trends Dominating High-End Homes in 2026</title>
    <link>https://decor8india.com/magazine/luxury-interior-trends-2026</link>
    <description>From Statuario backlit onyx statement walls to biophilic courtyards and warm tactile minimalism.</description>
    <pubDate>Mon, 20 Jul 2026 12:00:00 GMT</pubDate>
  </item>
  <item>
    <title>How to Choose the Perfect Lighting Hierarchy for Your Living Room</title>
    <link>https://decor8india.com/magazine/living-room-lighting-guide</link>
    <description>Mastering Ambient, Task, and Accent lighting for hotel-like atmosphere.</description>
    <pubDate>Wed, 15 Jul 2026 10:00:00 GMT</pubDate>
  </item>
</channel>
</rss>`);
});

app.listen(PORT, () => {
  console.log(`Decor8India Express Server running on http://localhost:${PORT}`);
});
