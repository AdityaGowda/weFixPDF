require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const convertRoutes = require("./routes/convert.routes");
const seoRoutes = require("./routes/seo.routes");
const ratingRoutes = require("./routes/ratingRoutes");
const contactRoutes = require("./routes/contactRoutes");
const db = require("./config/db.config");

const app = express();

/* ==============================
   Helmet Security
============================== */

app.use(
  helmet({
    /*
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    */
    hsts: false,
    referrerPolicy: false,
    contentSecurityPolicy: false,
    xssFilter: false,
    frameguard: false,
    contentTypeOptions: false,
  })
);

/* ==============================
   CORS - Restrict To Your Domain
============================== */

app.use(
  cors({
    origin: ["http://localhost:3000", "https://wefixpdf.com", "https://www.wefixpdf.com", 'http://localhost:5000'],
    methods: ["GET", "POST", "PUT", "DELETE"],
    exposedHeaders: ["Content-Disposition"],
  })
);

/* ==============================
   JSON Body Parsing
============================== */

app.use(express.json());

/* ==============================
   Routes
============================== */

app.use("/api/convert", convertRoutes);
app.use("/api/seo", seoRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Backend running");
});

app.get("/api/general/ping", (req, res) => {
  res.status(200).send("OK");
});

/* ==============================
   404 - Handle Unknown API Routes
============================== */

// app.use("/api/:any*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     status: 404,
//     message: `API Route not found: ${req.originalUrl}`,
//   });
// });

/* ==============================
   Centralized Error Handling
============================== */

const errorHandler = require("./middleware/error.middleware");
app.use(errorHandler);

/* ==============================
   Start Server
============================== */

app.listen(5000, async () => {
  console.log("Secure backend running on port 5000");
});