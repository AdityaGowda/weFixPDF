const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const convertRoutes = require("./routes/convert.routes");

const app = express();

/* ==============================
   Helmet Security
============================== */

app.use(
  helmet({
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    contentSecurityPolicy: false, // Let nginx / frontend handle CSP
  })
);

/* ==============================
   CORS - Restrict To Your Domain
============================== */

app.use(
  cors({
    origin: ["http://localhost:3000", "https://wefixpdf.com", "https://www.wefixpdf.com", 'http://localhost:5000'],
    methods: ["GET", "POST"],
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

app.get("/", (req, res) => {
  res.status(200).send("Backend running");
});

app.get("/general/ping", (req, res) => {
  res.status(200).send("OK");
});

/* ==============================
   Start Server
============================== */

app.listen(5000, () => {
  console.log("Secure backend running on port 5000");
});