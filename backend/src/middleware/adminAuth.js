const crypto = require("crypto");

/**
 * ─────────────────────────────────────────────────────────────
 * Admin Auth Guard (shared-secret)
 * ─────────────────────────────────────────────────────────────
 * Protects state-mutating admin/SEO endpoints. The client must send the
 * secret in the `x-admin-key` header (the admin UI stores it in localStorage,
 * NOT in the bundle).
 *
 * Fails CLOSED: if ADMIN_API_KEY is not configured, every protected request
 * is rejected. Set ADMIN_API_KEY in backend/.env before using admin features.
 *
 * NOTE: this is a minimal guard, not a full auth system. For production,
 * consider a real session/JWT login. It does, however, close the previously
 * wide-open public CRUD endpoints.
 * ─────────────────────────────────────────────────────────────
 */
function timingSafeEqual(a, b) {
  const ab = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

function adminAuth(req, res, next) {
  const expected = process.env.ADMIN_API_KEY;

  if (!expected) {
    return res.status(503).json({
      success: false,
      message: "Admin API is not configured (ADMIN_API_KEY missing on server).",
    });
  }

  const provided = req.get("x-admin-key");
  if (!provided || !timingSafeEqual(provided, expected)) {
    return res.status(401).json({ success: false, message: "Unauthorized." });
  }

  next();
}

module.exports = adminAuth;
