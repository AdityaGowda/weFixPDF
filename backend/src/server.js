require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const convertRoutes = require("./routes/convert.routes");
const seoRoutes = require("./routes/seo.routes");
const ratingRoutes = require("./routes/ratingRoutes");
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/admin.routes");
const rateLimit = require("./middleware/rateLimit");
const db = require("./config/db.config");

const app = express();
const isProd = process.env.NODE_ENV === "production";

// Behind a reverse proxy (nginx etc.) — needed for correct req.ip / rate limiting.
app.set("trust proxy", 1);

/* ==============================
   Helmet Security
============================== */

app.use(
  helmet({
    // CSP left off because tool pages inline AdSense/analytics; enable with a
    // tuned policy later. The rest of the protections are sensible defaults.
    contentSecurityPolicy: false,
    hsts: isProd ? { maxAge: 31536000, includeSubDomains: true, preload: true } : false,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    frameguard: { action: "sameorigin" },
    // helmet enables X-Content-Type-Options: nosniff by default
  })
);

/* ==============================
   CORS - Restrict To Your Domain
============================== */

// Allowed origins come from CORS_ORIGINS (comma-separated). localhost is only
// permitted outside production.
const envOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const allowedOrigins = [
  "https://wefixpdf.com",
  "https://www.wefixpdf.com",
  ...envOrigins,
  ...(isProd ? [] : ["http://localhost:3000", "http://localhost:5000"]),
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "x-admin-key"],
    exposedHeaders: ["Content-Disposition"],
  })
);

/* ==============================
   JSON Body Parsing
============================== */

app.use(express.json({ limit: "1mb" }));

/* ==============================
   Routes
============================== */

// Throttle the CPU-heavy conversion endpoints per IP.
app.use("/api/convert", rateLimit({ windowMs: 60_000, max: 30 }), convertRoutes);
app.use("/api/seo", seoRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Backend running");
});

app.get("/api/general/ping", (req, res) => {
  res.status(200).send("OK");
});

/* ==============================
   404 - Handle Unknown API Routes
============================== */

app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: `API Route not found: ${req.originalUrl}`,
  });
});

/* ==============================
   Centralized Error Handling
============================== */

const errorHandler = require("./middleware/error.middleware");
app.use(errorHandler);

/* ==============================
   Start Server
============================== */

const PORT = parseInt(process.env.PORT, 10) || 5000;
app.listen(PORT, () => {
  console.log(`Secure backend running on port ${PORT}`);
});