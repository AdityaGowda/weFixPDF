const logger = require("../utils/logger");

/**
 * ─────────────────────────────────────────────────────────────
 * Global Error Handler Middleware
 * ─────────────────────────────────────────────────────────────
 * Captures all errors thrown in routes/controllers and formats
 * them for the client while logging details for debugging.
 * ─────────────────────────────────────────────────────────────
 */

const errorHandler = (err, req, res, next) => {
  // 1. Log the full error (stack + detail) to winston
  logger.error(`${err.name}: ${err.message}`, {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    stack: err.stack,
    body: req.body,
    tool: req.params.tool || null,
  });

  // 2. Map standard errors to human-friendly messages if needed
  let status = err.statusCode || 500;
  let message = err.message || "An unexpected error occurred.";

  // Multer errors (file upload specific)
  if (err.code === "LIMIT_FILE_SIZE") {
    status = 413;
    message = "File is too large. Please upload smaller files.";
  }
  if (err.code === "LIMIT_UNEXPECTED_FILE") {
    status = 400;
    message = "Unexpected field in upload. Possible too many files.";
  }

  // Database Unique Constraint (e.g. duplicate slug)
  if (err.code === "ER_DUP_ENTRY") {
    status = 409;
    message = "Resource already exists (duplicate entry).";
  }

  // 3. Send response to frontend
  res.status(status).json({
    success: false,
    status,
    message,
    // only show stack in dev
    error: process.env.NODE_ENV === "development" ? err.message : "Handled error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
