/**
 * ─────────────────────────────────────────────────────────────
 * MySQL 8 — Connection Pool Configuration
 * ─────────────────────────────────────────────────────────────
 * Uses mysql2/promise for async/await support.
 * A single pool is shared across the entire application.
 */

require("dotenv").config();
const mysql = require("mysql2/promise");

// Credentials come exclusively from the environment — never hardcode them.
if (!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  console.warn(
    "[db] DB_USER / DB_PASSWORD / DB_NAME not fully set in environment — check backend/.env"
  );
}

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  // Pool settings
  waitForConnections: true,
  connectionLimit: parseInt(process.env.DB_POOL_MAX, 10) || 10,
  queueLimit: 0,

  // MySQL 8 optimisations
  charset: "utf8mb4",
  timezone: "+00:00",
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
});

/**
 * Quick helper – runs a query and returns [rows, fields].
 * Usage:  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [1]);
 */
const db = {
  query: (...args) => pool.query(...args),
  execute: (...args) => pool.execute(...args),
  getConnection: () => pool.getConnection(),
  pool,
};

module.exports = db;
