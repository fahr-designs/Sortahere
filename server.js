require('dotenv').config();


const express = require('express');
const Database = require('better-sqlite3');
const rateLimit = require('express-rate-limit');
const { Resend } = require('resend');
const path = require('path');
const fs = require('fs');
const PORT    = process.env.PORT || 3000;
const DB_PATH = process.env.DB_PATH || './db/rsvp.db';
const resend  = new Resend(process.env.RESEND_API_KEY);