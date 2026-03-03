/**
 * ─────────────────────────────────────────────────────────────
 * SEO Content Routes
 * ─────────────────────────────────────────────────────────────
 *
 * GET    /api/seo              — List all (filter: ?type=tool&published=true)
 * GET    /api/seo/slugs        — All slugs for sitemap
 * GET    /api/seo/search?q=    — Search across title, description, h1, keywords
 * GET    /api/seo/:slug        — Get by slug (?type=tool)
 * POST   /api/seo              — Create new
 * PUT    /api/seo/:id          — Update by ID
 * PUT    /api/seo/slug/:slug   — Update by slug (?type=tool)
 * POST   /api/seo/upsert       — Create or update single record
 * POST   /api/seo/bulk         — Bulk upsert multiple records
 * DELETE /api/seo/:id          — Delete by ID
 * ─────────────────────────────────────────────────────────────
 */

const express = require("express");
const router = express.Router();
const seo = require("../controllers/seo.controller");

// ── Read endpoints ──────────────────────────────────────────
router.get("/",               seo.getAll);
router.get("/slugs",          seo.getSlugs);
router.get("/search",         seo.search);
router.get("/tool-listings",  seo.getToolListings);
router.get("/site-schemas",   seo.getSiteSchemas);
router.get("/homepage",       seo.getHomepage);
router.get("/:slug",          seo.getBySlug);

// ── Write endpoints ─────────────────────────────────────────
router.post("/",        seo.create);
router.post("/upsert",  seo.upsert);
router.post("/bulk",    seo.bulkUpsert);
router.put("/:id",      seo.updateById);
router.put("/slug/:slug", seo.updateBySlug);

// ── Delete ──────────────────────────────────────────────────
router.delete("/:id",   seo.deleteById);

module.exports = router;
