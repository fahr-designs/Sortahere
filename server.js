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

