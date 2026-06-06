/**
 * pdfServices.js
 * -------------------------------------------------------
 * Dependencies to install:
 *   npm install pdf-lib pdfkit pdf-poppler multer jimp
 *   npm install mammoth docx
 *   npm install pdf2pic canvas
 *
 * Each function receives { res, req, file, files }
 * where `file`  = single upload  (multer single())
 *       `files` = multiple uploads (multer array())
 * -------------------------------------------------------
 */

const fs = require("fs");
const path = require("path");
const { PDFDocument, rgb, StandardFonts, degrees } = require("pdf-lib");
const mammoth = require("mammoth");
const { Document, Packer, Paragraph, TextRun } = require("docx");
const { execSync, execFileSync, spawnSync } = require("child_process");
const archiver = require("archiver");
const sharp = require("sharp");

// ─────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────
const mimeTypes = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp"
};

function safeDelete(filePath) {
  try {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  } catch (err) {
    console.error("File cleanup error:", err);
  }
}

function sendFile(res, filePath, contentType, downloadName) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Content-Type", contentType);
  res.setHeader("Content-Disposition", `attachment; filename="${downloadName}"`);
  const stream = fs.createReadStream(filePath);
  // Clean up the temp file once the response is fully flushed OR on error/abort.
  const cleanup = () => safeDelete(filePath);
  stream.on("error", (err) => {
    console.error("sendFile stream error:", err);
    if (!res.headersSent) res.status(500).end();
    cleanup();
  });
  res.on("close", cleanup);  // covers client abort and normal finish
  stream.pipe(res);
}

// ─────────────────────────────────────────
// 1. MERGE PDF
// POST /api/merge-pdf
// req.files = array of PDF files
// ─────────────────────────────────────────
async function mergePdf({ res, req, files }) {
  const inputPaths = (files || []).map((f) => f.path);

  if (inputPaths.length < 2) {
    inputPaths.forEach(safeDelete);
    return res.status(400).json({ error: "Please upload at least 2 PDF files to merge." });
  }

  try {
    const mergedPdf = await PDFDocument.create();

    for (const filePath of inputPaths) {
      const bytes = fs.readFileSync(filePath);
      const pdf = await PDFDocument.load(bytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const uid = Date.now();
    const outputPath = `uploads/merged-${uid}.pdf`;
    const pdfBytes = await mergedPdf.save();
    fs.writeFileSync(outputPath, pdfBytes);

    inputPaths.forEach(safeDelete);
    sendFile(res, outputPath, "application/pdf", `weFixPDF_merged-${uid}.pdf`);
  } catch (err) {
    inputPaths.forEach(safeDelete);
    const error = new Error(`PDF Merge failed: ${err.message}`);
    error.statusCode = 500;
    throw error;
  }
}

// ─────────────────────────────────────────
// 2. SPLIT PDF
// POST /api/split-pdf
// req.file  = single PDF
// req.body.pages = "1,3,5-7"  (page ranges, 1-indexed)
//               OR leave empty to split every page into individual PDF
// ─────────────────────────────────────────
function parsePageRanges(rangeStr, totalPages) {
  if (!rangeStr || rangeStr.trim() === "") {
    // Return each page as its own group
    return Array.from({ length: totalPages }, (_, i) => [i]);
  }
  const groups = [];
  const parts = rangeStr.split(",");
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.includes("-")) {
      let [start, end] = trimmed.split("-").map(Number);
      if (isNaN(start) || isNaN(end)) continue;
      start = Math.max(1, start);
      end = Math.min(end, totalPages);
      if (start > end) continue; // skip reversed/invalid ranges like "5-2"
      const indices = [];
      for (let i = start; i <= end; i++) indices.push(i - 1);
      if (indices.length) groups.push(indices);
    } else {
      const n = Number(trimmed);
      if (!isNaN(n) && n >= 1 && n <= totalPages) groups.push([n - 1]);
    }
  }
  return groups.length ? groups : Array.from({ length: totalPages }, (_, i) => [i]);
}

async function splitPdf({ res, req, file }) {
  if (!file) return res.status(400).json({ error: "No PDF uploaded." });

  const inputPath = file.path;
  try {
    const bytes = fs.readFileSync(inputPath);
    const srcPdf = await PDFDocument.load(bytes);
    const totalPages = srcPdf.getPageCount();
    const groups = parsePageRanges(req.body.pages, totalPages);

    const uid = Date.now();
    const outputPaths = [];

    for (let g = 0; g < groups.length; g++) {
      const newPdf = await PDFDocument.create();
      const copied = await newPdf.copyPages(srcPdf, groups[g]);
      copied.forEach((p) => newPdf.addPage(p));
      const outPath = `uploads/split-${uid}-part${g + 1}.pdf`;
      fs.writeFileSync(outPath, await newPdf.save());
      outputPaths.push(outPath);
    }

    safeDelete(inputPath);

    // If single output — send directly
    if (outputPaths.length === 1) {
      return sendFile(res, outputPaths[0], "application/pdf", `weFixPDF_split-part1.pdf`);
    }

    // Multiple outputs — zip them
    const zipPath = `uploads/split-${uid}.zip`;

    await new Promise((resolve, reject) => {
      const output = fs.createWriteStream(zipPath);
      const archive = archiver("zip", { zlib: { level: 9 } });
      output.on("close", resolve);
      output.on("error", reject);
      archive.on("error", reject);
      archive.pipe(output);
      outputPaths.forEach((p, i) => archive.file(p, { name: `part${i + 1}.pdf` }));
      archive.finalize();
    });

    outputPaths.forEach(safeDelete);
    return sendFile(res, zipPath, "application/zip", `weFixPDF_split-${uid}.zip`);
  } catch (err) {
    safeDelete(inputPath);
    const error = new Error(`PDF Split failed: ${err.message}`);
    error.statusCode = 500;
    throw error;
  }
}

// ─────────────────────────────────────────
// 3. COMPRESS PDF
// POST /api/compress-pdf
// req.file = single PDF
// req.body.level = "low" | "medium" | "high"  (default "medium")
// ─────────────────────────────────────────




async function compressPdf({ res, req, file }) {
  if (!file) {
    return res.status(400).json({ error: "No PDF uploaded." });
  }

  const inputPath = file.path;
  const originalSize = fs.statSync(inputPath).size;

  const uid = Date.now();
  const fileBaseName = path.parse(file.originalname).name;
  const outputPath = `uploads/compressed-${uid}.pdf`;

  try {
    const quality = (req.body.quality || "medium").toLowerCase();

    let gsArgs = [
      "-sDEVICE=pdfwrite",
      "-dCompatibilityLevel=1.4",
      "-dNOPAUSE",
      "-dQUIET",
      "-dBATCH",
    ];

    switch (quality) {
      case "high":
        gsArgs.push("-dPDFSETTINGS=/screen");
        break;

      case "medium":
        gsArgs.push("-dPDFSETTINGS=/ebook");
        break;

      case "low":
        // Minimal compression — preserve highest quality
        gsArgs.push("-dPDFSETTINGS=/printer");
        break;

      case "extreme":
        gsArgs.push(
          "-dDownsampleColorImages=true",
          "-dDownsampleGrayImages=true",
          "-dDownsampleMonoImages=true",
          "-dColorImageResolution=72",
          "-dGrayImageResolution=72",
          "-dMonoImageResolution=150",
          "-dPDFSETTINGS=/screen"
        );
        break;

      default:
        gsArgs.push("-dPDFSETTINGS=/ebook");
    }

    gsArgs.push(`-sOutputFile=${outputPath}`);
    gsArgs.push(inputPath);

    const result = spawnSync("gs", gsArgs, { timeout: 60000 });

    if (result.status !== 0) {
      throw new Error(result.stderr?.toString() || "Ghostscript failed");
    }

    const compressedSize = fs.statSync(outputPath).size;

    if (compressedSize >= originalSize) {
      safeDelete(outputPath);

      return res.download(
        inputPath,
        `${fileBaseName}_weFixPDF.pdf`,
        () => safeDelete(inputPath)
      );
    }

    safeDelete(inputPath);

    res.download(
      outputPath,
      `${fileBaseName}_weFixPDF_compressed.pdf`,
      () => safeDelete(outputPath)
    );

  } catch (err) {
    safeDelete(inputPath);
    const error = new Error(`PDF Compression failed: ${err.message}`);
    error.statusCode = 500;
    throw error;
  }
}
/*
 * ── OPTIONAL: Ghostscript-based PDF compression (much better quality/size) ──
 * Install ghostscript on your server: apt-get install ghostscript
 * Then replace the compressPdf body with:
 *
 * const { execSync } = require("child_process");
 * const qualityMap = { low: "/screen", medium: "/ebook", high: "/printer" };
 * const q = qualityMap[req.body.level] || "/ebook";
 * const outputPath = `uploads/compressed-${Date.now()}.pdf`;
 * execSync(`gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=${q} \
 *   -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${outputPath} ${inputPath}`);
 * sendFile(res, outputPath, "application/pdf", "compressed.pdf");
 */

// ─────────────────────────────────────────
// 4. PDF TO IMAGE (JPG / PNG / WEBP)
// POST /api/pdf-to-jpg | pdf-to-png | pdf-to-webp
// req.file = single PDF
// Requires: pdf2pic + poppler/graphicsmagick
// ─────────────────────────────────────────
const IMAGE_FORMAT_META = {
  jpg:  { ext: "jpg",  mime: "image/jpeg", renderAs: "jpg" },
  png:  { ext: "png",  mime: "image/png",  renderAs: "png" },
  webp: { ext: "webp", mime: "image/webp", renderAs: "png" }, // render PNG, then sharp→webp
};

async function pdfToImage({ res, req, file }, format) {
  if (!file) return res.status(400).json({ error: "No PDF uploaded." });

  const meta = IMAGE_FORMAT_META[format] || IMAGE_FORMAT_META.jpg;
  const inputPath = file.path;
  const uid = Date.now();
  const outputDir = `uploads/pdf2img-${uid}`;

  try {
    const { fromPath } = require("pdf2pic");
    fs.mkdirSync(outputDir, { recursive: true });

    const convert = fromPath(inputPath, {
      density: 150,
      saveFilename: "page",
      savePath: outputDir,
      format: meta.renderAs,
      width: 1200,
      height: 1600,
    });

    // bulk(-1) converts ALL pages
    const results = await convert.bulk(-1, { responseType: "image" });
    let imagePaths = results.map((r) => r.path).filter(Boolean);

    if (imagePaths.length === 0) {
      throw new Error("No images were generated — PDF may be empty or corrupted.");
    }

    // For webp we render PNG then transcode each page with sharp.
    if (meta.ext === "webp") {
      const converted = [];
      for (const p of imagePaths) {
        const webpPath = p.replace(/\.png$/i, ".webp");
        await sharp(p).webp({ quality: 80 }).toFile(webpPath);
        safeDelete(p);
        converted.push(webpPath);
      }
      imagePaths = converted;
    }

    safeDelete(inputPath);

    // Single page — send image directly
    if (imagePaths.length === 1) {
      return sendFile(res, imagePaths[0], meta.mime, `weFixPDF_page1.${meta.ext}`);
    }

    // Multiple pages — zip all images
    const zipPath = `uploads/pdf2img-${uid}.zip`;

    await new Promise((resolve, reject) => {
      const output = fs.createWriteStream(zipPath);
      const archive = archiver("zip", { zlib: { level: 9 } });
      output.on("close", resolve);
      output.on("error", reject);
      archive.on("error", reject);
      archive.pipe(output);
      imagePaths.forEach((p, i) =>
        archive.file(p, { name: `page${i + 1}.${meta.ext}` })
      );
      archive.finalize();
    });

    imagePaths.forEach(safeDelete);
    fs.rmSync(outputDir, { recursive: true, force: true });

    return sendFile(res, zipPath, "application/zip", `weFixPDF_pdf-to-${meta.ext}-${uid}.zip`);
  } catch (err) {
    safeDelete(inputPath);
    fs.rmSync(outputDir, { recursive: true, force: true });
    const error = new Error(`PDF to ${meta.ext.toUpperCase()} conversion failed: ${err.message}`);
    error.statusCode = 500;
    throw error;
  }
}

const pdfToJpg  = (ctx) => pdfToImage(ctx, "jpg");
const pdfToPng  = (ctx) => pdfToImage(ctx, "png");
const pdfToWebp = (ctx) => pdfToImage(ctx, "webp");

// ─────────────────────────────────────────
// 5. JPG TO PDF
// POST /api/jpg-to-pdf
// req.files = one or more image files (.jpg/.jpeg/.png)
// ─────────────────────────────────────────
async function jpgToPdf({ res, req, file, files }) {
  let uploadedFiles = [];
  if (file) {
    uploadedFiles = [file];
  } else if (files && files.length) {
    uploadedFiles = files;
  }

  const inputPaths = (uploadedFiles || []).map((f) => f.path);

  if (!inputPaths.length) {
    return res.status(400).json({ error: "No image files uploaded." });
  }

  try {
    const pdfDoc = await PDFDocument.create();

    for (const imgPath of inputPaths) {
      const ext = path.extname(imgPath).toLowerCase();
      let imgBytes;

      // Convert everything to PNG first for reliable embedding
      imgBytes = await sharp(imgPath).png().toBuffer();
      const embeddedImg = await pdfDoc.embedPng(imgBytes);

      const page = pdfDoc.addPage([embeddedImg.width, embeddedImg.height]);
      page.drawImage(embeddedImg, {
        x: 0,
        y: 0,
        width: embeddedImg.width,
        height: embeddedImg.height,
      });
    }

    const uid = Date.now();
    const outputPath = `uploads/jpg-to-pdf-${uid}.pdf`;
    fs.writeFileSync(outputPath, await pdfDoc.save());

    inputPaths.forEach(safeDelete);
    sendFile(res, outputPath, "application/pdf", `weFixPDF_images-to-pdf-${uid}.pdf`);
  } catch (err) {
    inputPaths.forEach(safeDelete);
    const error = new Error(`Image to PDF conversion failed: ${err.message}`);
    error.statusCode = 500;
    throw error;
  }
}

// ─────────────────────────────────────────
// 6. WORD TO PDF
// POST /api/word-to-pdf
// req.file = .docx file
// Uses LibreOffice on the server for high-fidelity conversion.
// Install: apt-get install libreoffice
// ─────────────────────────────────────────
async function wordToPdf({ res, req, file }) {
  if (!file) return res.status(400).json({ error: "No Word file uploaded." });

  const inputPath = file.path;
  const ext = path.extname(file.originalname).toLowerCase();

  if (![".doc", ".docx"].includes(ext)) {
    safeDelete(inputPath);
    return res.status(400).json({ error: "Only .doc and .docx files are supported." });
  }

  try {
    const outputDir = path.dirname(inputPath);

    // LibreOffice converts in place — output will be same filename with .pdf.
    // Use execFileSync (no shell) so filenames can never inject shell commands.
    execFileSync(
      "libreoffice",
      ["--headless", "--convert-to", "pdf", "--outdir", outputDir, inputPath],
      { timeout: 30000 }
    );

    const baseName = path.parse(inputPath).name;
    const outputPath = path.join(outputDir, `${baseName}.pdf`);

    if (!fs.existsSync(outputPath)) {
      throw new Error("LibreOffice did not produce output file.");
    }

    const origBase = path.parse(file.originalname).name;
    safeDelete(inputPath);
    sendFile(res, outputPath, "application/pdf", `${origBase}_weFixPDF.pdf`);
  } catch (err) {
    safeDelete(inputPath);
    const error = new Error(`Word to PDF conversion failed: ${err.message}`);
    error.statusCode = 500;
    throw error;
  }
}

// ─────────────────────────────────────────
// 7. PDF TO WORD
// POST /api/pdf-to-word
// req.file = PDF file
// Uses mammoth for text extraction + docx to rebuild a .docx
// NOTE: Layout fidelity is limited. For perfect layout use a paid API (Adobe, Aspose, etc.)
// ─────────────────────────────────────────
async function pdfToWord({ res, req, file }) {
  if (!file) return res.status(400).json({ error: "No PDF uploaded." });

  const inputPath = file.path;
  try {
    /**
     * pdf-parse extracts raw text from the PDF.
     * We then create a .docx with that text using the docx library.
     */
    const pdfParse = require("pdf-parse");
    const pdfBuffer = fs.readFileSync(inputPath);
    const parsed = await pdfParse(pdfBuffer);
    const rawText = parsed.text || "";

    // Build a Word document with the extracted text
    const paragraphs = rawText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map(
        (line) =>
          new Paragraph({
            children: [new TextRun({ text: line, size: 24, font: "Calibri" })],
            spacing: { after: 120 },
          })
      );

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: paragraphs,
        },
      ],
    });

    const uid = Date.now();
    const outputPath = `uploads/pdf-to-word-${uid}.docx`;
    const docxBuffer = await Packer.toBuffer(doc);
    fs.writeFileSync(outputPath, docxBuffer);

    const origBase = path.parse(file.originalname).name;
    safeDelete(inputPath);
    sendFile(
      res,
      outputPath,
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      `${origBase}_weFixPDF.docx`
    );
  } catch (err) {
    safeDelete(inputPath);
    const error = new Error(`PDF to Word conversion failed: ${err.message}`);
    error.statusCode = 500;
    throw error;
  }
}

// ─────────────────────────────────────────
// 8. REMOVE BACKGROUND
// POST /api/remove-background
// req.file = image file (.jpg/.jpeg/.png)
// Uses @imgly/background-removal-node (no API key needed, runs locally)
// Install: npm install @imgly/background-removal-node
// ─────────────────────────────────────────
async function removeBackground({ res, req, file }) {
  if (!file) return res.status(400).json({ error: "No image uploaded." });

  const inputPath = file.path;
  const ext = path.extname(file.originalname).toLowerCase();

  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
    safeDelete(inputPath);
    return res.status(400).json({ error: "Unsupported file type." });
  }

  try {
    const { removeBackground: removeBg } = require("@imgly/background-removal-node");

    const inputBuffer = fs.readFileSync(inputPath);
    const blob = new Blob([inputBuffer]);
    const resultBlob = await removeBg(blob);

    const arrayBuffer = await resultBlob.arrayBuffer();
    const outputBuffer = Buffer.from(arrayBuffer);

    const uid = Date.now();
    const outputPath = `uploads/nobg-${uid}.png`;
    fs.writeFileSync(outputPath, outputBuffer);

    const origBase = path.parse(file.originalname).name;
    safeDelete(inputPath);
    sendFile(res, outputPath, "image/png", `${origBase}_weFixPDF_nobg.png`);
  } catch (err) {
    safeDelete(inputPath);
    const error = new Error(`Background removal failed: ${err.message}`);
    error.statusCode = 500;
    throw error;
  }
}

// ─────────────────────────────────────────
// 9. WATERMARK REMOVER
// POST /api/remove-watermark
// req.file = image file
// Strategy: Detects near-white/near-transparent overlay text and uses
// Sharp inpainting (content-aware fill via blurring the watermark region).
// For PDFs, this re-renders without specific content layers.
//
// NOTE: True watermark removal requires AI (e.g. LaMa model).
// This implementation provides a basic "flatten & denoise" approach.
// For best results, integrate with an AI removal API.
// ─────────────────────────────────────────
async function removeWatermark({ res, req, file }) {
  if (!file) return res.status(400).json({ error: "No image uploaded." });

  const inputPath = file.path;
  const ext = path.extname(file.originalname).toLowerCase();

  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
    safeDelete(inputPath);
    return res.status(400).json({ error: "Unsupported file type." });
  }

  try {
    const sharp = require("sharp");

    const uid = Date.now();
    const outputPath = `uploads/nowatermark-${uid}${ext}`;
    const origBase = path.parse(file.originalname).name;

    /**
     * Basic approach:
     * 1. Convert to raw pixel data
     * 2. Apply a slight median blur to reduce text-like artifacts
     * 3. Flatten alpha (removes transparent watermarks)
     * 4. Re-sharpen to recover detail lost during blur
     *
     * This works well for light/transparent watermarks.
     * For opaque solid-color watermarks, an AI inpainting model is required.
     */
    await sharp(inputPath)
      .flatten({ background: { r: 255, g: 255, b: 255 } }) // flatten transparent layers
      .median(3)                                             // blur small text patterns
      .sharpen({ sigma: 0.8, m1: 0.5, m2: 2 })             // recover sharpness
      .toFile(outputPath);

    safeDelete(inputPath);
    sendFile(res, outputPath, mimeTypes[ext] || "image/jpeg", `${origBase}_weFixPDF_nowatermark${ext}`);
  } catch (err) {
    safeDelete(inputPath);
    const error = new Error(`Watermark removal failed: ${err.message}`);
    error.statusCode = 500;
    throw error;
  }
}

async function rotatePdf({ res, req, file }) {
  if (!file) return res.status(400).json({ error: "No PDF uploaded." });

  const inputPath = file.path;
  const angle = parseInt(req.body.angle) || 90;

  try {
    const bytes = fs.readFileSync(inputPath);
    const pdfDoc = await PDFDocument.load(bytes);
    const pages = pdfDoc.getPages();

    pages.forEach((page) => {
      const currentRotation = page.getRotation().angle;
      page.setRotation(degrees(currentRotation + angle));
    });

    const uid = Date.now();
    const outputPath = `uploads/rotated-${uid}.pdf`;
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);

    const origBase = path.parse(file.originalname).name;
    safeDelete(inputPath);
    sendFile(res, outputPath, "application/pdf", `${origBase}_rotated.pdf`);
  } catch (err) {
    safeDelete(inputPath);
    const error = new Error(`PDF Rotate failed: ${err.message}`);
    error.statusCode = 500;
    throw error;
  }
}

async function protectPdf({ res, req, file }) {
  if (!file) return res.status(400).json({ error: "No PDF uploaded." });
  const password = req.body.password;
  if (!password) {
    safeDelete(file.path);
    return res.status(400).json({ error: "Password is required to protect PDF." });
  }

  const inputPath = file.path;
  const uid = Date.now();
  const outputPath = `uploads/protected-${uid}.pdf`;

  try {
    // qpdf --encrypt user-password owner-password key-length [restrictions] -- input.pdf output.pdf
    // Using 256-bit AES encryption. execFileSync (no shell) keeps the password
    // out of any shell interpretation — prevents command injection.
    execFileSync("qpdf", ["--encrypt", password, password, "256", "--", inputPath, outputPath]);

    const origBase = path.parse(file.originalname).name;
    safeDelete(inputPath);
    sendFile(res, outputPath, "application/pdf", `${origBase}_protected.pdf`);
  } catch (err) {
    safeDelete(inputPath);
    const error = new Error(`PDF Protect failed: ${err.message}`);
    error.statusCode = 500;
    throw error;
  }
}

async function unlockPdf({ res, req, file }) {
  if (!file) return res.status(400).json({ error: "No PDF uploaded." });
  const password = req.body.password;
  if (!password) {
    safeDelete(file.path);
    return res.status(400).json({ error: "Password is required to unlock PDF." });
  }

  const inputPath = file.path;
  const uid = Date.now();
  const outputPath = `uploads/unlocked-${uid}.pdf`;

  try {
    // qpdf --password=pw --decrypt input.pdf output.pdf
    // execFileSync (no shell) prevents the password from injecting shell commands.
    execFileSync("qpdf", [`--password=${password}`, "--decrypt", inputPath, outputPath]);

    const origBase = path.parse(file.originalname).name;
    safeDelete(inputPath);
    sendFile(res, outputPath, "application/pdf", `${origBase}_unlocked.pdf`);
  } catch (err) {
    safeDelete(inputPath);
    const error = new Error(`PDF Unlock failed: ${err.message}`);
    error.statusCode = 500;
    throw error;
  }
}

// ─────────────────────────────────────────
// Exports
// ─────────────────────────────────────────
module.exports = {
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
  unlockPdf,
};