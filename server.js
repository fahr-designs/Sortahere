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
    guest_count INTEGER DEFAULT 0,
    dietary     TEXT,
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
  const { name, attending, guest_count, dietary, message } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > 100)
    return res.status(400).json({ error: 'Please enter a valid name.' });

  if (attending !== 0 && attending !== 1)
    return res.status(400).json({ error: 'Please select attendance.' });

  const guestCount = attending === 0 ? 0 : (parseInt(guest_count) || 0);
  if (guestCount < 0 || guestCount > 10)
    return res.status(400).json({ error: 'Guest count must be between 0 and 10.' });

  if (dietary && dietary.length > 300)
    return res.status(400).json({ error: 'Dietary notes too long.' });

  if (message && message.length > 500)
    return res.status(400).json({ error: 'Message too long.' });

  try {
    const stmt = db.prepare(`
      INSERT INTO rsvps (name, attending, guest_count, dietary, message)
      VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run(name.trim(), attending, guestCount, dietary || null, message || null);
    return res.status(201).json({ success: true });
  } catch (err) {
    console.error('DB error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

