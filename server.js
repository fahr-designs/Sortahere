require('dotenv').config();

// Import necessary modules
const express = require('express');
const Database = require('better-sqlite3');
const rateLimit = require('express-rate-limit');
const { Resend } = require('resend');
const path = require('path');
const fs = require('fs');

// Configuration
const PORT    = process.env.PORT || 3000;
const DB_PATH = process.env.DB_PATH || './db/rsvp.db';
const resend  = new Resend(process.env.RESEND_API_KEY);

// Database setup
const db = new Database(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS rsvps (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id    TEXT NOT NULL DEFAULT 'baby-shower-2025',
    name        TEXT NOT NULL,
    attending   INTEGER NOT NULL,
    message     TEXT,
    created_at  TEXT DEFAULT (datetime('now'))
  )
`);

// Express middleware
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rate limiter
const rsvpLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 60000,
  max:      parseInt(process.env.RATE_LIMIT_MAX) || 5,
  message:  { error: 'Too many submissions. Please try again shortly.' }
});

// POST /rsvp endpoint
app.post('/rsvp', rsvpLimiter, (req, res) => {
  const { name, attending, message } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > 100)
    return res.status(400).json({ error: 'Please enter a valid name.' });

  if (attending !== 0 && attending !== 1)
    return res.status(400).json({ error: 'Please select attendance.' });

  if (message && message.length > 1000)
    return res.status(400).json({ error: 'Message too long.' });

  try {
    const stmt = db.prepare(`
      INSERT INTO rsvps (name, attending, message)
      VALUES (?, ?, ?)
    `);
    stmt.run(name.trim(), attending, message || null);
    return res.status(201).json({ success: true });
  } catch (err) {
    console.error('DB error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// POST /admin/send-invites endpoint
app.post('/admin/send-invites', async (req, res) => {
  const token = req.headers['authorization'];
  if (token !== process.env.ADMIN_TOKEN)
    return res.status(401).json({ error: 'Unauthorized' });

  const guests  = JSON.parse(fs.readFileSync('./guests.json', 'utf8'));
  const template = require('./email-template');
  const results  = { sent: [], failed: [] };

  for (const email of guests) {
    try {
      await resend.emails.send({
        from:    process.env.INVITE_FROM_EMAIL,
        to:      email,
        subject: template.subject,
        html:    template.html(process.env.RSVP_URL)
      });
      results.sent.push(email);
    } catch (err) {
      results.failed.push({ email, error: err.message });
    }
  }

  return res.status(200).json(results);
});

// Start server
app.listen(PORT, () => {
  console.log(`RSVP app running on port ${PORT}`);
});