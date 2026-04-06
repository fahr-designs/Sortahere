require("dotenv").config();

const express = require("express");
const Database = require("better-sqlite3");
const rateLimit = require("express-rate-limit");
const { Resend } = require("resend");
const path = require("path");
const fs = require("fs");

// 2. CONFIG ─ Read from process.env, populated by dotenv locally, by hPanel in production.
const PORT = process.env.PORT;
const DB_PATH = process.env.DB_PATH;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

// 3. FAIL FAST ─ if critical config is missing.Better to crash at startup than to fail silently mid-request.
if (!ADMIN_TOKEN) {
  console.error("FATAL: ADMIN_TOKEN is not set. Exiting.");
  process.exit(1);
}
if (!RESEND_API_KEY) {
  console.error("FATAL: RESEND_API_KEY is not set. Exiting.");
  process.exit(1);
}

// 4. RESEND CLIENT ─ Instantiated once at startup, not inside a route handler.
const resend = new Resend(RESEND_API_KEY);

// 5. DATABASE SETUP ─ Opens/Creates the SQLite file. better-sqlite3 is synchronous, appropriate at this scale and simplifies the code significantly.
const db = new Database(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS rsvps (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id    TEXT NOT NULL DEFAULT '05312025',
    name        TEXT NOT NULL,
    attending   INTEGER NOT NULL,
    message     TEXT,
    created_at  TEXT DEFAULT (datetime('now'))
  )
`);

// ─── 6. EXPRESS APP ──────────────────────────────────────────────────────────
const app = express();

// Parse incoming JSON request bodies and make them available as req.body.
// Without this, req.body is undefined on POST requests.
app.use(express.json());

// Serve everything in /public as static files.
// A GET / request will automatically serve public/index.html.
// No explicit route needed for the frontend.
app.use(express.static(path.join(__dirname, "public")));

// 7. RATE LIMITER ─ Applied only to POST /rsvp, not the whole app.
// windowMs: time window in milliseconds (60000 = 1 minute)
// max: maximum number of requests allowed per IP in that window
// After max is hit, the client gets a 429 response with the message below.
const rsvpLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 60_000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 5,
  message: { error: "Too many submissions. Please try again shortly." },
});

// 8. ROUTES
// POST /rsvp : Public route — any guest can hit this.
// Rate limiter applied as middleware before the handler runs.
// TODO: consider if some form of bot protection and user validation is needed, but for a small, invite-only event, this may be sufficient.
app.post("/rsvp", rsvpLimiter, (req, res) => {
  const { name, attending, dietary, message } = req.body;

  // Validate: name
  if (
    !name ||
    typeof name !== "string" ||
    name.trim().length === 0 ||
    name.length > 100
  )
    return res.status(400).json({ error: "Please enter a valid name." });

  // Validate: attending must be exactly 0 or 1
  if (attending !== 0 && attending !== 1)
    return res
      .status(400)
      .json({ error: "Please select whether you are attending." });

  // Validate: message (optional, max length)
  if (message && message.length > 500)
    return res
      .status(400)
      .json({ error: "Message must be under 500 characters." });

  // Insert — better-sqlite3 is synchronous, so no await needed
  try {
    const stmt = db.prepare(`
      INSERT INTO rsvps (name, attending, guest_count, dietary, message)
      VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run(
      name.trim(),
      attending,
      guestCount,
      dietary || null,
      message || null,
    );
    return res.status(201).json({ success: true });
  } catch (err) {
    console.error("DB insert error:", err);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
});

// POST /admin/send-invites : Protected route — Reads guests.json, sends each address an invitation email via Resend.
app.post("/admin/send-invites", async (req, res) => {
  // 1. Check the Authorization header against ADMIN_TOKEN.
  //    req.headers['authorization'] must exactly match the token.
  //    No "Bearer " prefix — just the raw token string.
  const token = req.headers["authorization"];
  if (!token || token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  // 2. Load guests.json — a plain array of email address strings.
  //    If the file doesn't exist or is malformed, fail with a clear error.
  let guests;
  try {
    const raw = fs.readFileSync(path.join(__dirname, "guests.json"), "utf8");
    guests = JSON.parse(raw);
    if (!Array.isArray(guests))
      throw new Error("guests.json must be a JSON array");
  } catch (err) {
    console.error("Failed to load guests.json:", err);
    return res.status(500).json({ error: "Could not load guest list." });
  }

  // 3. Load the email template.
  //    email-template.js exports { subject, html(rsvpUrl) }
  const template = require("./email-template");

  // 4. Send to each guest individually.
  //    We loop rather than batch so we get per-address success/failure reporting.
  const results = { sent: [], failed: [] };

  for (const email of guests) {
    try {
      // resend.emails.send() returns { data, error } per the Resend SDK docs.
      const { data, error } = await resend.emails.send({
        from: process.env.INVITE_FROM_EMAIL, // must be from your verified domain
        to: [email], // Resend expects an array
        subject: template.subject,
        html: template.html(process.env.RSVP_URL),
      });

      if (error) {
        // Resend returned an error for this specific address — log and continue
        console.error(`Resend error for ${email}:`, error);
        results.failed.push({ email, error: error.message });
      } else {
        results.sent.push(email);
      }
    } catch (err) {
      // Network or unexpected error — log and continue to next guest
      console.error(`Unexpected error for ${email}:`, err.message);
      results.failed.push({ email, error: err.message });
    }
  }

  // 5. Return a summary so you know exactly what happened
  return res.status(200).json({
    total: guests.length,
    sent: results.sent.length,
    failed: results.failed.length,
    detail: results,
  });
});

app.listen(PORT, () => {
  console.log(`Baby shower RSVP app running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
