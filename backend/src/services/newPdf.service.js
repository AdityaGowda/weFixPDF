const fs = require("fs");
const path = require("path");
const { PDFDocument, rgb, StandardFonts, degrees } = require("pdf-lib");
const pdfParse = require("pdf-parse");
const archiver = require("archiver");
const { execSync } = require("child_process");
const PDFKitDocument = require("pdfkit");

function safeDelete(filePath) {
  try { if (fs.existsSync(filePath)) fs.unlinkSync(filePath); } catch (err) {}
}

function sendFile(res, filePath, contentType, downloadName) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Content-Type", contentType);
  res.setHeader("Content-Disposition", `attachment; filename="${downloadName}"`);
  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
  stream.on("close", () => safeDelete(filePath));
}

async function removeMetadata({ res, req, file }) {
  if (!file) return res.status(400).json({ error: "No PDF uploaded." });
  const inputPath = file.path;
  try {
    const bytes = fs.readFileSync(inputPath);
    const pdfDoc = await PDFDocument.load(bytes);
    pdfDoc.setTitle('');
    pdfDoc.setAuthor('');
    pdfDoc.setSubject('');
    pdfDoc.setCreator('');
    pdfDoc.setProducer('');
    
    const uid = Date.now();
    const outputPath = `uploads/nometa-${uid}.pdf`;
    fs.writeFileSync(outputPath, await pdfDoc.save());

    const origBase = path.parse(file.originalname).name;
    safeDelete(inputPath);
    sendFile(res, outputPath, "application/pdf", `${origBase}_clean.pdf`);
  } catch (err) {
    safeDelete(inputPath);
    res.status(500).json({ error: `Remove Metadata failed: ${err.message}` });
  }
}

async function extractText({ res, req, file }) {
  if (!file) return res.status(400).json({ error: "No PDF uploaded." });
  const inputPath = file.path;
  try {
    const pdfBuffer = fs.readFileSync(inputPath);
    const parsed = await pdfParse(pdfBuffer);
    const rawText = parsed.text || "No text could be extracted.";

    const uid = Date.now();
    const outputPath = `uploads/extracted-${uid}.txt`;
    fs.writeFileSync(outputPath, rawText);

    const origBase = path.parse(file.originalname).name;
    safeDelete(inputPath);
    sendFile(res, outputPath, "text/plain", `${origBase}_text.txt`);
  } catch (err) {
    safeDelete(inputPath);
    res.status(500).json({ error: `Text extraction failed: ${err.message}` });
  }
}

async function autoRotatePdf({ res, req, file }) {
  if (!file) return res.status(400).json({ error: "No PDF uploaded." });
  const inputPath = file.path;
  try {
    const bytes = fs.readFileSync(inputPath);
    const pdfDoc = await PDFDocument.load(bytes);
    const pages = pdfDoc.getPages();

    pages.forEach((page) => {
      const currentRotation = page.getRotation().angle;
      if (currentRotation !== 0) {
        page.setRotation(degrees(0));
      }
    });

    const uid = Date.now();
    const outputPath = `uploads/autorotated-${uid}.pdf`;
    fs.writeFileSync(outputPath, await pdfDoc.save());

    const origBase = path.parse(file.originalname).name;
    safeDelete(inputPath);
    sendFile(res, outputPath, "application/pdf", `${origBase}_fixed.pdf`);
  } catch (err) {
    safeDelete(inputPath);
    res.status(500).json({ error: `Auto Rotate failed: ${err.message}` });
  }
}

async function comparePdf({ res, req, files }) {
  const inputPaths = (files || []).map((f) => f.path);
  if (inputPaths.length < 2) {
    inputPaths.forEach(safeDelete);
    return res.status(400).json({ error: "Please upload 2 PDF files." });
  }

  try {
    const text1 = (await pdfParse(fs.readFileSync(inputPaths[0]))).text || "";
    const text2 = (await pdfParse(fs.readFileSync(inputPaths[1]))).text || "";

    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    
    let htmlDiff = '<html><head><style>body{font-family:sans-serif;line-height:1.6;padding:20px} .del{background:#ffebee;color:#c62828;text-decoration:line-through;padding:2px} .add{background:#e8f5e9;color:#2e7d32;padding:2px}</style></head><body><h1>Comparison Report</h1><pre style="white-space: pre-wrap;">';
    
    htmlDiff += '<h2>File 1 (Removed Lines):</h2>';
    for(let i=0; i<Math.min(lines1.length, 500); i++) {
       if(!lines2.includes(lines1[i]) && lines1[i].trim().length > 0) {
           htmlDiff += `<div class="del">- ${lines1[i]}</div>`;
       }
    }
    htmlDiff += '<h2>File 2 (Added Lines):</h2>';
    for(let i=0; i<Math.min(lines2.length, 500); i++) {
       if(!lines1.includes(lines2[i]) && lines2[i].trim().length > 0) {
           htmlDiff += `<div class="add">+ ${lines2[i]}</div>`;
       }
    }
    
    htmlDiff += '</pre></body></html>';

    const uid = Date.now();
    const outputPath = `uploads/compare-${uid}.html`;
    fs.writeFileSync(outputPath, htmlDiff);

    inputPaths.forEach(safeDelete);
    sendFile(res, outputPath, "text/html", `weFixPDF_compare_report.html`);
  } catch (err) {
    inputPaths.forEach(safeDelete);
    res.status(500).json({ error: `Compare failed: ${err.message}` });
  }
}

async function redactPdf({ res, req, file }) {
  if (!file) return res.status(400).json({ error: "No PDF uploaded." });
  const inputPath = file.path;
  try {
    let areas = [];
    try { if (req.body.areas) areas = JSON.parse(req.body.areas); } catch (e) {}
    
    const bytes = fs.readFileSync(inputPath);
    const pdfDoc = await PDFDocument.load(bytes);
    const pages = pdfDoc.getPages();
    
    areas.forEach(a => {
      if (a.page > 0 && a.page <= pages.length) {
         const p = pages[a.page - 1];
         const { height } = p.getSize();
         p.drawRectangle({
            x: a.x,
            y: height - a.y - a.height,
            width: a.width,
            height: a.height,
            color: rgb(0,0,0)
         });
      }
    });

    const uid = Date.now();
    const outputPath = `uploads/redacted-${uid}.pdf`;
    fs.writeFileSync(outputPath, await pdfDoc.save());

    const origBase = path.parse(file.originalname).name;
    safeDelete(inputPath);
    sendFile(res, outputPath, "application/pdf", `${origBase}_redacted.pdf`);
  } catch (err) {
    safeDelete(inputPath);
    res.status(500).json({ error: `Redaction failed: ${err.message}` });
  }
}

async function pdfToHtml({ res, req, file }) {
  if (!file) return res.status(400).json({ error: "No PDF uploaded." });
  const inputPath = file.path;
  try {
    const pdfBuffer = fs.readFileSync(inputPath);
    const parsed = await pdfParse(pdfBuffer);
    const rawText = parsed.text || "";
    
    const htmlLines = rawText.split('\n').map(l => `<p>${l}</p>`).join('');
    const finalHtml = `<html><head><meta charset="utf-8"/><style>body{max-width:800px;margin:auto;font-family:sans-serif;padding:20px;}</style></head><body>${htmlLines}</body></html>`;

    const uid = Date.now();
    const outputPath = `uploads/pdf2html-${uid}.html`;
    fs.writeFileSync(outputPath, finalHtml);

    const origBase = path.parse(file.originalname).name;
    safeDelete(inputPath);
    sendFile(res, outputPath, "text/html", `${origBase}_converted.html`);
  } catch (err) {
    safeDelete(inputPath);
    res.status(500).json({ error: `HTML Conversion failed: ${err.message}` });
  }
}

async function pdfToEpub({ res, req, file }) {
  if (!file) return res.status(400).json({ error: "No PDF uploaded." });
  const inputPath = file.path;
  try {
    const pdfBuffer = fs.readFileSync(inputPath);
    const parsed = await pdfParse(pdfBuffer);
    const rawText = parsed.text || "No text available";
    
    const uid = Date.now();
    const zipPath = `uploads/epub-${uid}.epub`;
    
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { store: true });
    
    output.on("close", () => {
       safeDelete(inputPath);
       sendFile(res, zipPath, "application/epub+zip", `${path.parse(file.originalname).name}.epub`);
    });
    archive.pipe(output);
    
    archive.append("application/epub+zip", { name: "mimetype" });
    
    const containerXML = `<?xml version="1.0" encoding="UTF-8"?><container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>`;
    archive.append(containerXML, { name: "META-INF/container.xml" });
    
    const contentOPF = `<?xml version="1.0" encoding="utf-8"?><package xmlns="http://www.idpf.org/2007/opf" unique-identifier="uuid_id" version="2.0"><metadata xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:title>Generated eBook</dc:title><dc:language>en</dc:language></metadata><manifest><item id="chap1" href="chap1.html" media-type="application/xhtml+xml"/></manifest><spine><itemref idref="chap1"/></spine></package>`;
    archive.append(contentOPF, { name: "content.opf" });
    
    const htmlLines = rawText.split('\n').map(l => `<p>${l.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</p>`).join('');
    const chapHtml = `<?xml version="1.0" encoding="utf-8"?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><title>Chapter 1</title></head><body>${htmlLines}</body></html>`;
    archive.append(chapHtml, { name: "chap1.html" });
    
    await archive.finalize();
  } catch (err) {
    safeDelete(inputPath);
    res.status(500).json({ error: `EPUB Conversion failed: ${err.message}` });
  }
}

async function epubToPdf({ res, req, file }) {
  if (!file) return res.status(400).json({ error: "No EPUB uploaded." });
  const inputPath = file.path;
  try {
    const rawHtml = execSync(`unzip -p "${inputPath}" "*.html" "*.xhtml" "*.htm" 2>/dev/null || true`, { encoding: "utf8", maxBuffer: 1024 * 1024 * 50 });
    
    let text = rawHtml.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, "");
    text = text.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
    text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
    text = text.replace(/<\/?(p|div|h1|h2|h3|h4|h5|h6|br|li|tr)[^>]*>/gi, "\n\n");
    text = text.replace(/<[^>]+>/g, " ");
    text = text.replace(/&[a-zA-Z#0-9]+;/gi, " ");
    text = text.replace(/\n\s*\n/g, "\n\n").trim();

    if (!text) text = "No readable text found in EPUB. It may be an image-only archive.";

    const uid = Date.now();
    const outputPath = `uploads/epub2pdf-${uid}.pdf`;

    await new Promise((resolve, reject) => {
       const doc = new PDFKitDocument({ margin: 50 });
       const stream = fs.createWriteStream(outputPath);
       doc.pipe(stream);
       doc.fontSize(16).text('Converted from EPUB', { align: 'center' });
       doc.moveDown();
       doc.fontSize(12).text(text);
       doc.end();
       stream.on('finish', resolve);
       stream.on('error', reject);
    });

    const origBase = path.parse(file.originalname).name;
    safeDelete(inputPath);
    sendFile(res, outputPath, "application/pdf", `${origBase}_converted.pdf`);
  } catch (err) {
    safeDelete(inputPath);
    res.status(500).json({ error: `EPUB to PDF failed: ${err.message}` });
  }
}

module.exports = {
  removeMetadata,
  extractText,
  autoRotatePdf,
  comparePdf,
  redactPdf,
  pdfToHtml,
  pdfToEpub,
  epubToPdf
};
