/**
 * Minimal in-memory rate limiter (dependency-free).
 *
 * Limits each client IP to `max` requests per `windowMs`. Intended for the
 * CPU-heavy /api/convert endpoints, which each spawn Ghostscript / LibreOffice /
 * sharp and could otherwise be used to exhaust the server.
 *
 * NOTE: state is per-process and in-memory. For multi-instance deployments,
 * back this with Redis instead.
 */
function rateLimit({ windowMs = 60_000, max = 20 } = {}) {
  const hits = new Map(); // ip -> { count, resetAt }

  // Periodically evict stale entries so the map can't grow unbounded.
  const sweeper = setInterval(() => {
    const now = Date.now();
    for (const [ip, rec] of hits) {
      if (rec.resetAt <= now) hits.delete(ip);
    }
  }, windowMs);
  if (sweeper.unref) sweeper.unref();

  return function rateLimiter(req, res, next) {
    const ip = req.ip || req.socket?.remoteAddress || "unknown";
    const now = Date.now();
    let rec = hits.get(ip);

    if (!rec || rec.resetAt <= now) {
      rec = { count: 0, resetAt: now + windowMs };
      hits.set(ip, rec);
    }

    rec.count += 1;

    if (rec.count > max) {
      const retryAfter = Math.ceil((rec.resetAt - now) / 1000);
      res.setHeader("Retry-After", String(retryAfter));
      return res.status(429).json({
        success: false,
        status: 429,
        message: "Too many requests. Please slow down and try again shortly.",
      });
    }

    next();
  };
}

module.exports = rateLimit;
