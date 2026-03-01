const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMulter");
const { convertFile } = require("../controllers/convert.controller");

// ─────────────────────────────────────────────────────────────
// Tools that accept MULTIPLE files
// ─────────────────────────────────────────────────────────────
const MULTI_FILE_TOOLS = ["image-to-pdf"];

// ─────────────────────────────────────────────────────────────
// Dynamic middleware selector:
//   - multi-file tools  → upload.array("files", 50)
//   - all other tools   → upload.single("file")
// ─────────────────────────────────────────────────────────────
function selectUpload(req, res, next) {
    const tool = req.params.tool;

    if (MULTI_FILE_TOOLS.includes(tool)) {
        upload.array("files", 10)(req, res, next);
    } else {
        upload.single("file")(req, res, next);
    }
}

// ─────────────────────────────────────────────────────────────
// Single route handles ALL tools
// POST /api/:tool
//
// Supported tools:
//   Image  → jpg-to-png | png-to-jpg | png-to-webp | compress-image
//   PDF    → merge-pdf | split-pdf | compress-pdf | pdf-to-jpg
//            jpg-to-pdf | word-to-pdf | pdf-to-word
//   AI     → remove-background | remove-watermark
// ─────────────────────────────────────────────────────────────
router.post("/:tool", selectUpload, convertFile);

module.exports = router;