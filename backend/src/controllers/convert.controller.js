const { imageCompressor, imageConverter } = require("../services/image.service");
const {
  mergePdf,
  splitPdf,
  compressPdf,
  pdfToJpg,
  jpgToPdf,
  wordToPdf,
  pdfToWord,
  removeBackground,
  removeWatermark,
} = require("../services/pdf.service");

// Tools that use req.files (array) instead of req.file (single)
const MULTI_FILE_TOOLS = ["merge-pdf", "image-to-pdf"];

async function convertFile(req, res) {
  const tool = req.params.tool;

  // Normalise: multi-file tools use req.files, single-file tools use req.file
  const file = req.file || null;
  const files = req.files || [];

  // Guard: ensure files were actually uploaded
  if (MULTI_FILE_TOOLS.includes(tool) && files.length === 0) {
    return res.status(400).json({ error: "No files uploaded." });
  }
  if (!MULTI_FILE_TOOLS.includes(tool) && !file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const ctx = { res, req, file, files };

  switch (tool) {
    // ── Image tools ──────────────────────────────────────
    case "image-compressor":
      return imageCompressor(ctx);

    case "jpg-to-png":
    case "png-to-jpg":
    case "png-to-webp":
      return imageConverter(ctx);

    // ── PDF tools ────────────────────────────────────────
    case "merge-pdf":
      return mergePdf(ctx);

    case "split-pdf":
      return splitPdf(ctx);

    case "compress-pdf":
      return compressPdf(ctx);

    case "pdf-to-jpg":
      return pdfToJpg(ctx);

    case "image-to-pdf":
      return jpgToPdf(ctx);

    case "word-to-pdf":
      return wordToPdf(ctx);

    case "pdf-to-word":
      return pdfToWord(ctx);

    // ── AI tools ─────────────────────────────────────────
    case "remove-background":
      return removeBackground(ctx);

    case "remove-watermark":
      return removeWatermark(ctx);

    // ── Unknown tool ─────────────────────────────────────
    default:
      return res.status(404).json({ error: `Unknown tool: "${tool}"` });
  }
}

module.exports = { convertFile };