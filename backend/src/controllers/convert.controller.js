const { imageCompressor, imageConverter, heicToJpg } = require("../services/image.service");
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
  rotatePdf,
  protectPdf,
  unlockPdf,
} = require("../services/pdf.service");

// Tools that use req.files (array) instead of req.file (single)
const MULTI_FILE_TOOLS = ["merge-pdf", "image-to-pdf"];

async function convertFile(req, res, next) {
  try {
    const tool = req.params.tool;

    // Normalise: multi-file tools use req.files, single-file tools use req.file
    const file = req.file || null;
    const files = req.files || [];

    // Guard: ensure files were actually uploaded
    if (MULTI_FILE_TOOLS.includes(tool) && files.length === 0) {
      return res.status(400).json({ success: false, status: 400, message: "Please upload at least one file." });
    }
    if (!MULTI_FILE_TOOLS.includes(tool) && !file) {
      return res.status(400).json({ success: false, status: 400, message: "Please upload a file to convert." });
    }

    const ctx = { res, req, file, files };
    console.log(tool, ":::::::::::::::::::::::::::::::::")
    switch (tool) {
      // ── Image tools ──────────────────────────────────────
      case "image-compressor":
        return await imageCompressor(ctx);

      case "jpg-to-png":
      case "png-to-jpg":
      case "png-to-webp":
        return await imageConverter(ctx);

      // ── PDF tools ────────────────────────────────────────
      case "merge-pdf":
        return await mergePdf(ctx);

      case "split-pdf":
        return await splitPdf(ctx);

      case "compress-pdf":
        return await compressPdf(ctx);

      case "pdf-to-jpg":
        return await pdfToJpg(ctx);

      case "image-to-pdf":
        return await jpgToPdf(ctx);

      case "word-to-pdf":
        return await wordToPdf(ctx);

      case "pdf-to-word":
      case "pdf-to-doc":
        return await pdfToWord(ctx);

      case "rotate-pdf":
        return await rotatePdf(ctx);

      case "protect-pdf":
        return await protectPdf(ctx);

      case "unlock-pdf":
        return await unlockPdf(ctx);

      // ── AI tools ─────────────────────────────────────────
      case "remove-background":
        return await removeBackground(ctx);

      case "remove-watermark":
        return await removeWatermark(ctx);

      case "heic-to-jpg":
        return await heicToJpg(ctx);

      // ── Unknown tool ─────────────────────────────────────
      default:
        const err = new Error(`The tool "${tool}" is not currently supported.`);
        err.statusCode = 404;
        throw err;
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { convertFile };