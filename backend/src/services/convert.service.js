const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

const mimeTypes = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp"
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

    const qualityLevel = Math.min(Math.max(Number(req.body.quality) || 80, 10), 100);

    const uid = Date.now();
    const outputPath = `uploads/compressed-${uid}${ext}`;
    const fileBaseName = path.parse(file.originalname).name;
    const downloadName = `${fileBaseName}_wefixPDF_compressed${ext}`;

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
    console.error(err);
    return res.status(500).json({ error: "Compression failed" });
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
      downloadName = `${fileBaseName}_wefixPDF_png-to-jpg.jpg`;
      await sharp(inputPath).jpeg({ quality: 80 }).toFile(outputPath);

    } else if (tool === "jpg-to-png" && (inputExt === ".jpg" || inputExt === ".jpeg")) {
      outputExt = ".png";
      outputPath = `uploads/converted-${uid}${outputExt}`;
      downloadName = `${fileBaseName}_wefixPDF_jpg-to-png.png`;
      await sharp(inputPath).png().toFile(outputPath);

    } else if (tool === "png-to-webp" && inputExt === ".png") {
      outputExt = ".webp";
      outputPath = `uploads/converted-${uid}${outputExt}`;
      downloadName = `${fileBaseName}_wefixPDF_png-to-webp.webp`;
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
    console.error(err);
    return res.status(500).json({ error: "Conversion failed" });
  }
}

module.exports = {
  imageCompressor,
  imageConverter
};