const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"];

const mimeTypes = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".heic": "image/heic",
  ".heif": "image/heif"
};

function validateFile(ext) {
  return allowedExtensions.includes(ext.toLowerCase());
}

function safeDelete(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.error("File cleanup error:", err);
  }
}

async function imageCompressor({ res, req, file }) {
  try {
    const inputPath = file.path;
    const ext = path.extname(file.originalname).toLowerCase();

    if (!validateFile(ext)) {
      safeDelete(inputPath);
      return res.status(400).json({ error: "Unsupported file type" });
    }

    const quality = { high: 80, medium: 50, low: 20 }
    const qualityLevel = Math.min(Math.max(Number(quality[req.body.quality]) || 80, 10), 100);

    const uid = Date.now();
    const outputPath = `uploads/compressed-${uid}${ext}`;
    const fileBaseName = path.parse(file.originalname).name;
    const downloadName = `${fileBaseName}_weFixPDF_compressed${ext}`;

    let image = sharp(inputPath);
    const meta = await image.metadata();

    const config = {
      jpg: { quality: qualityLevel, mozjpeg: true },
      jpeg: { quality: qualityLevel, mozjpeg: true },
      webp: { quality: qualityLevel },
      png: { compressionLevel: Math.floor(qualityLevel / 10), palette: true }
    };

    const format = meta.format;

    if (!config[format]) {
      safeDelete(inputPath);
      return res.status(400).json({ error: "Invalid image format" });
    }

    await image[format](config[format]).toFile(outputPath);

    // Secure headers
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Content-Type", mimeTypes[ext]);
    res.setHeader("Content-Disposition", `attachment; filename="${downloadName}"`);

    const fileStream = fs.createReadStream(outputPath);

    fileStream.pipe(res);

    fileStream.on("close", () => {
      safeDelete(inputPath);
      safeDelete(outputPath);
    });

  } catch (err) {
    safeDelete(file.path);
    const error = new Error(`Image compression failed: ${err.message}`);
    error.statusCode = 500;
    throw error;
  }
}

async function imageConverter({ res, req, file }) {
  try {
    const inputPath = file.path;
    const tool = req.params.tool;
    const originalName = file.originalname;
    const inputExt = path.extname(originalName).toLowerCase();

    if (!validateFile(inputExt)) {
      safeDelete(inputPath);
      return res.status(400).json({ error: "Unsupported file type" });
    }

    const uid = Date.now();
    const fileBaseName = path.parse(originalName).name;

    let outputExt;
    let outputPath;
    let downloadName;

    if (tool === "png-to-jpg" && inputExt === ".png") {
      outputExt = ".jpg";
      outputPath = `uploads/converted-${uid}${outputExt}`;
      downloadName = `${fileBaseName}_weFixPDF_png-to-jpg.jpg`;
      await sharp(inputPath).jpeg({ quality: 80 }).toFile(outputPath);

    } else if (tool === "jpg-to-png" && (inputExt === ".jpg" || inputExt === ".jpeg")) {
      outputExt = ".png";
      outputPath = `uploads/converted-${uid}${outputExt}`;
      downloadName = `${fileBaseName}_weFixPDF_jpg-to-png.png`;
      await sharp(inputPath).png().toFile(outputPath);

    } else if (tool === "png-to-webp" && inputExt === ".png") {
      outputExt = ".webp";
      outputPath = `uploads/converted-${uid}${outputExt}`;
      downloadName = `${fileBaseName}_weFixPDF_png-to-webp.webp`;
      await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);

    } else {
      safeDelete(inputPath);
      return res.status(400).json({ error: "Tool not supported or invalid input format" });
    }

    // Secure headers
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Content-Type", mimeTypes[outputExt]);
    res.setHeader("Content-Disposition", `attachment; filename="${downloadName}"`);

    const fileStream = fs.createReadStream(outputPath);

    fileStream.pipe(res);

    fileStream.on("close", () => {
      safeDelete(inputPath);
      safeDelete(outputPath);
    });

  } catch (err) {
    safeDelete(file.path);
    const error = new Error(`Image conversion failed: ${err.message}`);
    error.statusCode = 500;
    throw error;
  }
}

/**
 * HEIC to JPG converter
 * Sharp has built-in HEIC/HEIF support via libvips.
 * Converts iPhone HEIC photos to universally compatible JPG.
 */
async function heicToJpg({ res, req, file }) {
  try {
    const inputPath = file.path;
    const ext = path.extname(file.originalname).toLowerCase();

    if (ext !== ".heic" && ext !== ".heif") {
      safeDelete(inputPath);
      return res.status(400).json({ error: "Please upload a HEIC or HEIF file" });
    }

    const uid = Date.now();
    const fileBaseName = path.parse(file.originalname).name;
    const outputPath = `uploads/heic-to-jpg-${uid}.jpg`;
    const downloadName = `${fileBaseName}_weFixPDF_heic-to-jpg.jpg`;

    await sharp(inputPath)
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(outputPath);

    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Content-Disposition", `attachment; filename="${downloadName}"`);

    const fileStream = fs.createReadStream(outputPath);
    fileStream.pipe(res);

    fileStream.on("close", () => {
      safeDelete(inputPath);
      safeDelete(outputPath);
    });

  } catch (err) {
    console.error("HEIC to JPG error:", err);
    return res.status(500).json({ error: "HEIC conversion failed. Make sure the file is a valid HEIC image." });
  }
}

async function resizeImage({ res, req, file }) {
  try {
    const inputPath = file.path;
    const ext = path.extname(file.originalname).toLowerCase();

    if (!validateFile(ext)) {
      safeDelete(inputPath);
      return res.status(400).json({ error: "Unsupported file type" });
    }

    let image = sharp(inputPath);
    const { width, height, cropX, cropY, cropWidth, cropHeight } = req.body;

    if (cropWidth && cropHeight && cropX !== undefined && cropY !== undefined) {
      image = image.extract({ left: parseInt(cropX), top: parseInt(cropY), width: parseInt(cropWidth), height: parseInt(cropHeight) });
    }

    if (width || height) {
      image = image.resize(width ? parseInt(width) : null, height ? parseInt(height) : null, { fit: 'inside' });
    }

    const uid = Date.now();
    const outputPath = `uploads/resized-${uid}${ext}`;
    const fileBaseName = path.parse(file.originalname).name;
    const downloadName = `${fileBaseName}_weFixPDF_resized${ext}`;

    await image.toFile(outputPath);

    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Content-Type", mimeTypes[ext]);
    res.setHeader("Content-Disposition", `attachment; filename="${downloadName}"`);

    const fileStream = fs.createReadStream(outputPath);
    fileStream.pipe(res);

    fileStream.on("close", () => {
      safeDelete(inputPath);
      safeDelete(outputPath);
    });

  } catch (err) {
    console.error("Resize image error:", err);
    safeDelete(file.path);
    return res.status(500).json({ error: "Image resize failed." });
  }
}

module.exports = {
  imageCompressor,
  imageConverter,
  heicToJpg,
  resizeImage
};