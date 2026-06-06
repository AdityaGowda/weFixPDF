const { imageCompressor, imageConverter, heicToJpg, resizeImage } = require("../services/image.service");
const {
  mergePdf,
  splitPdf,
  compressPdf,
  pdfToJpg,
  pdfToPng,
  pdfToWebp,
  jpgToPdf,
  wordToPdf,
  pdfToWord,
  removeBackground,
  removeWatermark,
  rotatePdf,
  protectPdf,
  unlockPdf
} = require("../services/pdf.service");

const {
  pdfToEpub,
  autoRotatePdf,
  pdfToHtml,
  removeMetadata,
  extractText,
  comparePdf,
  redactPdf,
  epubToPdf
} = require("../services/newPdf.service");

// Tools that use req.files (array) instead of req.file (single).
// Single source of truth — also consumed by the route's upload selector.
const { MULTI_FILE_TOOLS } = require("../config/tools.config");

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

      case "pdf-to-png":
        return await pdfToPng(ctx);

      case "pdf-to-webp":
        return await pdfToWebp(ctx);

      case "image-to-pdf":
      case "jpg-to-pdf":
        return await jpgToPdf(ctx);

      case "word-to-pdf":
        return await wordToPdf(ctx);

      case "pdf-to-word":
      case "pdf-to-doc":
        return await pdfToWord(ctx);

      case "rotate-pdf":
        return await rotatePdf(ctx);

      case "auto-rotate-pdf":
        return await autoRotatePdf(ctx);

      case "protect-pdf":
        return await protectPdf(ctx);

      case "unlock-pdf":
        return await unlockPdf(ctx);

      case "pdf-to-epub":
        return await pdfToEpub(ctx);

      case "epub-to-pdf":
        return await epubToPdf(ctx);

      case "pdf-to-html":
        return await pdfToHtml(ctx);

      case "remove-pdf-metadata":
        return await removeMetadata(ctx);

      case "extract-text-pdf":
        return await extractText(ctx);

      case "compare-pdf":
        return await comparePdf(ctx);

      case "redact-pdf":
        return await redactPdf(ctx);

      case "remove-background":
        return await removeBackground(ctx);

      case "remove-watermark":
        return await removeWatermark(ctx);

      case "heic-to-jpg":
        return await heicToJpg(ctx);

      case "resize-image":
        return await resizeImage(ctx);

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