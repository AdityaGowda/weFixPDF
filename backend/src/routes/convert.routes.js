const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMulter");
const { convertFile } = require("../controllers/convert.controller");
const { MULTI_FILE_TOOLS, MAX_FILES } = require("../config/tools.config");

// ─────────────────────────────────────────────────────────────
// Dynamic middleware selector:
//   - multi-file tools  → upload.array("files", MAX_FILES)
//   - all other tools   → upload.single("file")
// MULTI_FILE_TOOLS / MAX_FILES are shared with the controller so the two can
// never disagree about which field name (file vs files) is expected.
// ─────────────────────────────────────────────────────────────
function selectUpload(req, res, next) {
    const tool = req.params.tool;
    if (MULTI_FILE_TOOLS.includes(tool)) {
        upload.array("files", MAX_FILES)(req, res, next);
    } else {
        upload.single("file")(req, res, next);
    }
}

// ─────────────────────────────────────────────────────────────
// Single route handles ALL tools
// POST /api/:tool
//
// Supported tools:
//   Image  → jpg-to-png | png-to-jpg | png-to-webp | image-compressor | heic-to-jpg
//   PDF    → merge-pdf | split-pdf | compress-pdf | pdf-to-jpg
//            image-to-pdf | word-to-pdf | pdf-to-word
//   AI     → remove-background | remove-watermark
// ─────────────────────────────────────────────────────────────
router.post("/:tool", selectUpload, convertFile);

module.exports = router;