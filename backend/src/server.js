const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const convertRoutes = require("./routes/convert.routes");
const app = express();

app.use(helmet({
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
}));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "blob:"],
      connectSrc: ["'self'", "http://localhost:5000", "https://convertlite.onrender.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

// Permissions-Policy
app.use((req, res, next) => {
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");
  next();
});

app.use(cors({
  origin: "*",
  exposedHeaders: ['Content-Disposition']
}));
app.use(express.json());


app.use("/api/convert", convertRoutes);
app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.get("/general/ping", (req, res) => {
  res.status(200).send("OK");
});