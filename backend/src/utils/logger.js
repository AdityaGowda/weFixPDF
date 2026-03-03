const { createLogger, format, transports } = require("winston");
const path = require("path");

const logFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.errors({ stack: true }),
  format.splat(),
  format.json()
);

const logger = createLogger({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  format: logFormat,
  defaultMeta: { service: "convertlite-backend" },
  transports: [
    // Write all errors to `error.log`
    new transports.File({ 
      filename: path.join(__dirname, "../../logs/error.log"), 
      level: "error" 
    }),
    // Write all logs to `combined.log`
    new transports.File({ 
      filename: path.join(__dirname, "../../logs/combined.log") 
    }),
  ],
});

// If we're not in production then log to the `console` with simple format
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      ),
    })
  );
}

module.exports = logger;
