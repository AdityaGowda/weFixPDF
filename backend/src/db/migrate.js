/**
 * ─────────────────────────────────────────────────────────────
 * weFixPDF — Database Migration Script
 * ─────────────────────────────────────────────────────────────
 * Run:   node src/db/migrate.js
 *
 * This script:
 *   1. Creates the database if it doesn't exist
 *   2. Creates all required tables
 *   3. Adds indexes for performance
 *
 * Safe to run multiple times (uses IF NOT EXISTS).
 * ─────────────────────────────────────────────────────────────
 */

require("dotenv").config();
const mysql = require("mysql2/promise");

const DB_NAME = process.env.DB_NAME || "wefixpdf_db";

// ─────────────────────────────────────────────────────────────
// Table definitions
// ─────────────────────────────────────────────────────────────

const TABLES = [
  // ── 1. Users ────────────────────────────────────────────────
  `CREATE TABLE IF NOT EXISTS users (
    id              INT UNSIGNED    AUTO_INCREMENT PRIMARY KEY,
    email           VARCHAR(255)    NOT NULL UNIQUE,
    password_hash   VARCHAR(255)    NOT NULL,
    full_name       VARCHAR(150)    DEFAULT NULL,
    avatar_url      VARCHAR(500)    DEFAULT NULL,
    role            ENUM('free','pro','admin') NOT NULL DEFAULT 'free',
    is_verified     TINYINT(1)      NOT NULL DEFAULT 0,
    created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_users_email (email),
    INDEX idx_users_role  (role)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  // ── 2. Conversion History ──────────────────────────────────
  `CREATE TABLE IF NOT EXISTS conversions (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id         INT UNSIGNED    DEFAULT NULL,
    tool_name       VARCHAR(50)     NOT NULL COMMENT 'e.g. jpg-to-png, merge-pdf, compress-image',
    source_format   VARCHAR(20)     DEFAULT NULL COMMENT 'e.g. jpg, pdf, docx',
    target_format   VARCHAR(20)     DEFAULT NULL COMMENT 'e.g. png, pdf, jpg',
    file_size_bytes BIGINT UNSIGNED DEFAULT NULL COMMENT 'Original file size',
    output_size_bytes BIGINT UNSIGNED DEFAULT NULL COMMENT 'Converted file size',
    status          ENUM('pending','processing','completed','failed') NOT NULL DEFAULT 'pending',
    error_message   TEXT            DEFAULT NULL,
    ip_address      VARCHAR(45)     DEFAULT NULL,
    user_agent      VARCHAR(500)    DEFAULT NULL,
    processing_ms   INT UNSIGNED    DEFAULT NULL COMMENT 'Processing duration in milliseconds',
    created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_conv_user       (user_id),
    INDEX idx_conv_tool       (tool_name),
    INDEX idx_conv_status     (status),
    INDEX idx_conv_created    (created_at),
    CONSTRAINT fk_conv_user   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  // ── 3. API Keys (for future API access) ────────────────────
  `CREATE TABLE IF NOT EXISTS api_keys (
    id              INT UNSIGNED    AUTO_INCREMENT PRIMARY KEY,
    user_id         INT UNSIGNED    NOT NULL,
    key_hash        VARCHAR(255)    NOT NULL UNIQUE,
    label           VARCHAR(100)    DEFAULT NULL,
    is_active       TINYINT(1)      NOT NULL DEFAULT 1,
    last_used_at    TIMESTAMP       DEFAULT NULL,
    expires_at      TIMESTAMP       DEFAULT NULL,
    created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_apikey_user     (user_id),
    CONSTRAINT fk_apikey_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  // ── 4. Usage Quotas (rate limiting / plan enforcement) ─────
  `CREATE TABLE IF NOT EXISTS usage_quotas (
    id              INT UNSIGNED    AUTO_INCREMENT PRIMARY KEY,
    user_id         INT UNSIGNED    DEFAULT NULL,
    ip_address      VARCHAR(45)     DEFAULT NULL,
    date            DATE            NOT NULL,
    conversion_count INT UNSIGNED   NOT NULL DEFAULT 0,
    bytes_processed BIGINT UNSIGNED NOT NULL DEFAULT 0,
    created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY uq_quota_user_date (user_id, date),
    UNIQUE KEY uq_quota_ip_date   (ip_address, date),
    CONSTRAINT fk_quota_user  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  // ── 5. Contact / Feedback ──────────────────────────────────
  `CREATE TABLE IF NOT EXISTS contacts (
    id              INT UNSIGNED    AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(150)    NOT NULL,
    email           VARCHAR(255)    NOT NULL,
    subject         VARCHAR(255)    DEFAULT NULL,
    message         TEXT            NOT NULL,
    is_read         TINYINT(1)      NOT NULL DEFAULT 0,
    created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_contact_email   (email),
    INDEX idx_contact_read    (is_read)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  // ── 6. Daily Analytics (aggregated stats) ──────────────────
  `CREATE TABLE IF NOT EXISTS daily_stats (
    id              INT UNSIGNED    AUTO_INCREMENT PRIMARY KEY,
    date            DATE            NOT NULL UNIQUE,
    total_conversions INT UNSIGNED  NOT NULL DEFAULT 0,
    total_bytes_in  BIGINT UNSIGNED NOT NULL DEFAULT 0,
    total_bytes_out BIGINT UNSIGNED NOT NULL DEFAULT 0,
    unique_users    INT UNSIGNED    NOT NULL DEFAULT 0,
    unique_ips      INT UNSIGNED    NOT NULL DEFAULT 0,
    tool_breakdown  JSON            DEFAULT NULL COMMENT '{"jpg-to-png": 42, "merge-pdf": 15, ...}',
    created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_daily_date (date)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  // ── 7. SEO Content (all page SEO data) ─────────────────────
  `CREATE TABLE IF NOT EXISTS seo_content (
    id              INT UNSIGNED    AUTO_INCREMENT PRIMARY KEY,
    slug            VARCHAR(150)    NOT NULL COMMENT 'URL slug e.g. jpg-to-png, how-to-merge-pdf-files',
    page_type       ENUM('tool','blog','compare','use_cases','format','homepage') NOT NULL DEFAULT 'tool',

    -- Core meta
    title           VARCHAR(255)    NOT NULL COMMENT 'Page <title> tag',
    description     TEXT            NOT NULL COMMENT 'Meta description',
    h1              VARCHAR(255)    NOT NULL COMMENT 'Main heading',
    h2              VARCHAR(255)    DEFAULT NULL COMMENT 'Secondary heading (tool pages)',
    subtitle        VARCHAR(500)    DEFAULT NULL COMMENT 'Hero subtitle text',
    intro           TEXT            DEFAULT NULL COMMENT 'Extended intro paragraph (tool pages)',
    body_content    LONGTEXT        DEFAULT NULL COMMENT 'Full article content for blog/compare',
    keywords        TEXT            DEFAULT NULL COMMENT 'Comma-separated or JSON array of keywords',

    -- Structured content (stored as JSON)
    how_it_works    JSON            DEFAULT NULL COMMENT '[{title, desc}] or [{name, text}]',
    features        JSON            DEFAULT NULL COMMENT '["feature 1", "feature 2", ...]',
    faq             JSON            DEFAULT NULL COMMENT '[{q, a}, ...]',
    cta             JSON            DEFAULT NULL COMMENT '{text, url}',
    related_tools   JSON            DEFAULT NULL COMMENT '[{label, href}, ...]',
    tools_list      JSON            DEFAULT NULL COMMENT '[{name, url, use_case}, ...]',
    comparison_table JSON           DEFAULT NULL COMMENT '{headers, rows}',

    -- Tool-page specific SEO
    url             VARCHAR(500)    DEFAULT NULL COMMENT 'Canonical URL',
    software_schema JSON            DEFAULT NULL COMMENT '{name, browserRequirements}',
    how_to          JSON            DEFAULT NULL COMMENT '{title, description, steps: [{name, text}]}',
    breadcrumb      JSON            DEFAULT NULL COMMENT '[{name, url}, ...]',

    -- Schema markup fields
    schema_type     VARCHAR(100)    DEFAULT NULL,
    schema_name     VARCHAR(255)    DEFAULT NULL,
    schema_description TEXT         DEFAULT NULL,

    -- Status & metadata
    is_published    TINYINT(1)      NOT NULL DEFAULT 1,
    created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY uq_seo_slug_type (slug, page_type),
    INDEX idx_seo_slug      (slug),
    INDEX idx_seo_type      (page_type),
    INDEX idx_seo_published (is_published)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  // ── 8. Tool Listings (catalog of tools from seoschema.ts) ──
  `CREATE TABLE IF NOT EXISTS tool_listings (
    id              INT UNSIGNED    AUTO_INCREMENT PRIMARY KEY,
    position        INT UNSIGNED    NOT NULL COMMENT 'Display order on homepage',
    slug            VARCHAR(100)    NOT NULL UNIQUE COMMENT 'URL slug e.g. compress-pdf',
    name            VARCHAR(150)    NOT NULL COMMENT 'Display name e.g. Compress PDF',
    description     VARCHAR(500)    NOT NULL COMMENT 'Short description for listings',
    url             VARCHAR(500)    NOT NULL COMMENT 'Full canonical URL',
    keywords        JSON            DEFAULT NULL COMMENT '["keyword1", "keyword2", ...]',
    is_active       TINYINT(1)      NOT NULL DEFAULT 1,
    created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_tool_pos    (position),
    INDEX idx_tool_active (is_active)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  // ── 9. Site Schemas (JSON-LD structured data) ──────────────
  `CREATE TABLE IF NOT EXISTS site_schemas (
    id              INT UNSIGNED    AUTO_INCREMENT PRIMARY KEY,
    schema_key      VARCHAR(100)    NOT NULL UNIQUE COMMENT 'e.g. webApplication, organization, webSite, itemList',
    schema_type     VARCHAR(100)    NOT NULL COMMENT '@type value e.g. WebApplication, Organization',
    schema_data     JSON            NOT NULL COMMENT 'Full JSON-LD structured data object',
    is_active       TINYINT(1)      NOT NULL DEFAULT 1,
    created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_schema_active (is_active)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`
];

// ─────────────────────────────────────────────────────────────
// Migration runner
// ─────────────────────────────────────────────────────────────

async function migrate() {
  console.log("🔧  weFixPDF DB Migration — Starting...\n");

  // Step 1 — Connect WITHOUT selecting a database
  const rootConn = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    user: process.env.DB_USER || "wefixpdf_user",
    password: process.env.DB_PASSWORD || "",
    charset: "utf8mb4",
  });

  // Step 2 — Create database
  await rootConn.query(
    `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );
  console.log(`✅  Database "${DB_NAME}" ensured.\n`);
  await rootConn.end();

  // Step 3 — Reconnect with the database selected
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    user: process.env.DB_USER || "wefixpdf_user",
    password: process.env.DB_PASSWORD || "",
    database: DB_NAME,
    charset: "utf8mb4",
    multipleStatements: true,
  });

  // Step 4 — Run each table creation
  for (const sql of TABLES) {
    const match = sql.match(/CREATE TABLE IF NOT EXISTS (\w+)/);
    const tableName = match ? match[1] : "unknown";
    try {
      await conn.query(sql);
      console.log(`  ✅  Table "${tableName}" — ready`);
    } catch (err) {
      console.error(`  ❌  Table "${tableName}" — FAILED: ${err.message}`);
    }
  }

  await conn.end();
  console.log("\n🎉  Migration completed successfully!");
}

migrate().catch((err) => {
  console.error("💥  Migration failed:", err.message);
  process.exit(1);
});
