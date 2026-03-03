/**
 * ─────────────────────────────────────────────────────────────
 * SEO Content Controller
 * ─────────────────────────────────────────────────────────────
 */

const SeoContent = require("../models/seoContent.model");
const db = require("../config/db.config");

// GET /api/seo — Get all SEO content (with optional filters)
async function getAll(req, res, next) {
  try {
    const { type, published, page, limit } = req.query;
    const opts = {};

    if (published !== undefined) opts.published = published === "true";
    if (page) opts.page = parseInt(page, 10);
    if (limit) opts.limit = parseInt(limit, 10);

    let rows;
    if (type) {
      rows = await SeoContent.findByType(type, opts);
    } else {
      rows = await SeoContent.findAll(opts);
    }

    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    next(err);
  }
}

// GET /api/seo/slugs — Get all slugs (for sitemap)
async function getSlugs(req, res, next) {
  try {
    const slugs = await SeoContent.getAllSlugs();
    res.json({ success: true, data: slugs });
  } catch (err) {
    next(err);
  }
}

// GET /api/seo/search?q=keyword — Search SEO content
async function search(req, res, next) {
  try {
    const { q, limit } = req.query;
    if (!q) {
      const err = new Error("Query param 'q' is required");
      err.statusCode = 400;
      throw err;
    }

    const rows = await SeoContent.search(q, { limit: limit ? parseInt(limit, 10) : 20 });
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    next(err);
  }
}

// GET /api/seo/:slug — Get by slug
async function getBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    const { type } = req.query;

    const row = await SeoContent.findBySlug(slug, type || null);
    if (!row) {
      const err = new Error(`No SEO content found for slug: ${slug}`);
      err.statusCode = 404;
      throw err;
    }
console.log(row)
    res.json({ success: true, data: row });
  } catch (err) {
    next(err);
  }
}

// POST /api/seo — Create new SEO content
async function create(req, res, next) {
  try {
    const { slug, page_type, title, description, h1 } = req.body;

    if (!slug || !title || !description || !h1) {
      const err = new Error("slug, title, description, and h1 are required");
      err.statusCode = 400;
      throw err;
    }

    const id = await SeoContent.create(req.body);
    res.status(201).json({ success: true, id, message: "SEO content created" });
  } catch (err) {
    next(err);
  }
}

// PUT /api/seo/:id — Update by ID
async function updateById(req, res, next) {
  try {
    const { id } = req.params;
    const updated = await SeoContent.update(parseInt(id, 10), req.body);

    if (!updated) {
      const err = new Error("No valid fields to update");
      err.statusCode = 400;
      throw err;
    }

    res.json({ success: true, message: "SEO content updated" });
  } catch (err) {
    next(err);
  }
}

// PUT /api/seo/slug/:slug — Update by slug
async function updateBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    const { type } = req.query;

    if (!type) {
      const err = new Error("Query param 'type' is required");
      err.statusCode = 400;
      throw err;
    }

    const updated = await SeoContent.updateBySlug(slug, type, req.body);
    if (!updated) {
      const err = new Error("No valid fields to update or record not found");
      err.statusCode = 400;
      throw err;
    }

    res.json({ success: true, message: "SEO content updated" });
  } catch (err) {
    next(err);
  }
}

// POST /api/seo/upsert — Create or update
async function upsert(req, res, next) {
  try {
    const { slug, page_type, title, description, h1 } = req.body;

    if (!slug || !page_type || !title || !description || !h1) {
      const err = new Error("slug, page_type, title, description, and h1 are required");
      err.statusCode = 400;
      throw err;
    }

    const result = await SeoContent.upsert(req.body);
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
}

// POST /api/seo/bulk — Bulk upsert
async function bulkUpsert(req, res, next) {
  try {
    const { records } = req.body;
    if (!Array.isArray(records) || records.length === 0) {
      const err = new Error("'records' must be a non-empty array");
      err.statusCode = 400;
      throw err;
    }

    const results = await SeoContent.bulkUpsert(records);
    res.json({ success: true, ...results });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/seo/:id — Delete by ID
async function deleteById(req, res, next) {
  try {
    const deleted = await SeoContent.delete(parseInt(req.params.id, 10));
    if (!deleted) {
      const err = new Error("SEO record not found");
      err.statusCode = 404;
      throw err;
    }
    res.json({ success: true, message: "SEO content deleted" });
  } catch (err) {
    next(err);
  }
}

// GET /api/seo/tool-listings — Get all tool listings (for homepage grid)
async function getToolListings(req, res, next) {
  try {
    const [rows] = await db.execute(
      "SELECT position, slug, name, description, url, keywords FROM tool_listings WHERE is_active = 1 ORDER BY position ASC"
    );
    // Parse keywords JSON
    const parsed = rows.map((r) => ({
      ...r,
      keywords: typeof r.keywords === "string" ? JSON.parse(r.keywords) : r.keywords,
    }));
    res.json({ success: true, count: parsed.length, data: parsed });
  } catch (err) {
    next(err);
  }
}

// GET /api/seo/site-schemas — Get all JSON-LD schemas (homepage structured data)
async function getSiteSchemas(req, res, next) {
  try {
    const [rows] = await db.execute(
      "SELECT schema_key, schema_type, schema_data FROM site_schemas WHERE is_active = 1 ORDER BY id ASC"
    );
    const parsed = rows.map((r) => ({
      ...r,
      schema_data: typeof r.schema_data === "string" ? JSON.parse(r.schema_data) : r.schema_data,
    }));
    res.json({ success: true, count: parsed.length, data: parsed });
  } catch (err) {
    next(err);
  }
}

// GET /api/seo/homepage — Get homepage SEO + schemas + tool listings in one call
async function getHomepage(req, res, next) {
  try {
    // 1. Homepage SEO content
    const homeSeo = await SeoContent.findBySlug("home", "homepage");

    // 2. Tool listings
    const [tools] = await db.execute(
      "SELECT position, slug, name, description, url, keywords FROM tool_listings WHERE is_active = 1 ORDER BY position ASC"
    );
    const parsedTools = tools.map((r) => ({
      ...r,
      keywords: typeof r.keywords === "string" ? JSON.parse(r.keywords) : r.keywords,
    }));

    // 3. Site schemas
    const [schemas] = await db.execute(
      "SELECT schema_key, schema_type, schema_data FROM site_schemas WHERE is_active = 1 ORDER BY id ASC"
    );
    const parsedSchemas = schemas.map((r) => ({
      ...r,
      schema_data: typeof r.schema_data === "string" ? JSON.parse(r.schema_data) : r.schema_data,
    }));

    res.json({
      success: true,
      data: {
        seo: homeSeo,
        tools: parsedTools,
        schemas: parsedSchemas,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAll,
  getSlugs,
  search,
  getBySlug,
  create,
  updateById,
  updateBySlug,
  upsert,
  bulkUpsert,
  deleteById,
  getToolListings,
  getSiteSchemas,
  getHomepage,
};
