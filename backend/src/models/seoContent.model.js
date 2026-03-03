/**
 * ─────────────────────────────────────────────────────────────
 * SEO Content Model — Data-access layer for the `seo_content` table
 * ─────────────────────────────────────────────────────────────
 * Stores all SEO data for tool pages, blog posts, comparisons,
 * use-case pages, and format guides.
 *
 * JSON columns automatically parsed on read and stringified on write.
 * ─────────────────────────────────────────────────────────────
 */

const db = require("../config/db.config");

// Helpers to safely stringify/parse JSON columns
const JSON_COLS = ["how_it_works", "features", "faq", "related_tools", "software_schema", "how_to", "keywords", "breadcrumb", "cta", "tools_list", "comparison_table"];

function stringifyJsonFields(data) {
  const out = { ...data };
  for (const col of JSON_COLS) {
    if (out[col] !== undefined && out[col] !== null && typeof out[col] !== "string") {
      out[col] = JSON.stringify(out[col]);
    }
  }
  return out;
}

function parseJsonFields(row) {
  if (!row) return null;
  const out = { ...row };
  for (const col of JSON_COLS) {
    if (out[col] && typeof out[col] === "string") {
      try { out[col] = JSON.parse(out[col]); } catch (_) { /* leave as string */ }
    }
  }
  return out;
}

const SeoContent = {
  // ─────────────────────────────────────────────────────────
  // CREATE
  // ─────────────────────────────────────────────────────────

  /**
   * Insert a new SEO content record.
   * @param {Object} data - SEO fields (slug, page_type, title, description, h1, etc.)
   * @returns {number} insertId
   */
  async create(data) {
    const d = stringifyJsonFields(data);
    const cols = Object.keys(d);
    const placeholders = cols.map(() => "?").join(", ");
    const values = cols.map((c) => d[c]);

    const [result] = await db.execute(
      `INSERT INTO seo_content (${cols.join(", ")}) VALUES (${placeholders})`,
      values
    );
    return result.insertId;
  },

  // ─────────────────────────────────────────────────────────
  // READ
  // ─────────────────────────────────────────────────────────

  /**
   * Get SEO content by slug (unique per page_type)
   */
  async findBySlug(slug, pageType = null) {
    let sql = "SELECT * FROM seo_content WHERE slug = ?";
    const params = [slug];

    if (pageType) {
      sql += " AND page_type = ?";
      params.push(pageType);
    }

    sql += " AND is_published = 1 LIMIT 1";
    const [rows] = await db.execute(sql, params);
    return parseJsonFields(rows[0]);
  },

  /**
   * Get all SEO content by page type
   */
  async findByType(pageType, { published = true } = {}) {
    let sql = "SELECT * FROM seo_content WHERE page_type = ?";
    const params = [pageType];

    if (published) {
      sql += " AND is_published = 1";
    }

    sql += " ORDER BY slug ASC";
    const [rows] = await db.execute(sql, params);
    return rows.map(parseJsonFields);
  },

  /**
   * Get all SEO content (optionally filtered by published status)
   */
  async findAll({ published = null, page = 1, limit = 100 } = {}) {
    let sql = "SELECT * FROM seo_content";
    const params = [];

    if (published !== null) {
      sql += " WHERE is_published = ?";
      params.push(published ? 1 : 0);
    }

    sql += " ORDER BY page_type ASC, slug ASC";

    if (limit) {
      const offset = (page - 1) * limit;
      sql += " LIMIT ? OFFSET ?";
      params.push(limit, offset);
    }

    const [rows] = await db.execute(sql, params);
    return rows.map(parseJsonFields);
  },

  /**
   * Get just one by ID
   */
  async findById(id) {
    const [rows] = await db.execute("SELECT * FROM seo_content WHERE id = ?", [id]);
    return parseJsonFields(rows[0]);
  },

  /**
   * Get all slugs (useful for sitemap generation)
   */
  async getAllSlugs() {
    const [rows] = await db.execute(
      "SELECT slug, page_type, updated_at FROM seo_content WHERE is_published = 1 ORDER BY page_type, slug"
    );
    return rows;
  },

  // ─────────────────────────────────────────────────────────
  // UPDATE
  // ─────────────────────────────────────────────────────────

  /**
   * Update SEO content by ID
   */
  async update(id, data) {
    const d = stringifyJsonFields(data);
    // Remove id/created_at from updates
    delete d.id;
    delete d.created_at;

    const cols = Object.keys(d);
    if (cols.length === 0) return false;

    const sets = cols.map((c) => `${c} = ?`).join(", ");
    const values = cols.map((c) => d[c]);
    values.push(id);

    await db.execute(`UPDATE seo_content SET ${sets} WHERE id = ?`, values);
    return true;
  },

  /**
   * Update SEO content by slug + page_type
   */
  async updateBySlug(slug, pageType, data) {
    const d = stringifyJsonFields(data);
    delete d.id;
    delete d.created_at;
    delete d.slug;
    delete d.page_type;

    const cols = Object.keys(d);
    if (cols.length === 0) return false;

    const sets = cols.map((c) => `${c} = ?`).join(", ");
    const values = cols.map((c) => d[c]);
    values.push(slug, pageType);

    await db.execute(
      `UPDATE seo_content SET ${sets} WHERE slug = ? AND page_type = ?`,
      values
    );
    return true;
  },

  /**
   * Upsert — insert or update if slug+page_type already exists
   */
  async upsert(data) {
    // Look up without is_published filter to avoid duplicate key issues
    let sql = "SELECT id FROM seo_content WHERE slug = ? AND page_type = ? LIMIT 1";
    const [rows] = await db.execute(sql, [data.slug, data.page_type]);

    if (rows.length > 0) {
      await this.update(rows[0].id, data);
      return { id: rows[0].id, action: "updated" };
    } else {
      const id = await this.create(data);
      return { id, action: "created" };
    }
  },

  // ─────────────────────────────────────────────────────────
  // DELETE
  // ─────────────────────────────────────────────────────────

  async delete(id) {
    const [result] = await db.execute("DELETE FROM seo_content WHERE id = ?", [id]);
    return result.affectedRows > 0;
  },

  async deleteBySlug(slug, pageType) {
    const [result] = await db.execute(
      "DELETE FROM seo_content WHERE slug = ? AND page_type = ?",
      [slug, pageType]
    );
    return result.affectedRows > 0;
  },

  // ─────────────────────────────────────────────────────────
  // BULK OPERATIONS
  // ─────────────────────────────────────────────────────────

  /**
   * Bulk upsert — import multiple SEO records at once
   * Perfect for seeding from your existing seoData.ts / toolPageSeo.ts
   */
  async bulkUpsert(records) {
    const results = { created: 0, updated: 0, errors: [] };

    for (const record of records) {
      try {
        const result = await this.upsert(record);
        results[result.action === "created" ? "created" : "updated"]++;
      } catch (err) {
        results.errors.push({ slug: record.slug, error: err.message });
      }
    }

    return results;
  },

  // ─────────────────────────────────────────────────────────
  // SEARCH
  // ─────────────────────────────────────────────────────────

  /**
   * Full-text search across title, description, h1, keywords
   */
  async search(query, { limit = 20 } = {}) {
    const like = `%${query}%`;
    const [rows] = await db.execute(
      `SELECT * FROM seo_content
       WHERE is_published = 1
         AND (title LIKE ? OR description LIKE ? OR h1 LIKE ? OR keywords LIKE ?)
       ORDER BY
         CASE page_type
           WHEN 'tool' THEN 1
           WHEN 'blog' THEN 2
           WHEN 'compare' THEN 3
           WHEN 'use_cases' THEN 4
           WHEN 'format' THEN 5
         END
       LIMIT ?`,
      [like, like, like, like, limit]
    );
    return rows.map(parseJsonFields);
  },
};

module.exports = SeoContent;
