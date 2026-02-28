const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function imageCompressor({res,req,file,outputPath}){

  try{
    
 let image = sharp(file.path);
 const meta = await image.metadata()
 const { format } = meta
 const qualityLevel=Number(req.body.quality);


 const config = {
  jpg: { quality: qualityLevel ,mozjpeg: true},
  jpeg: { quality: qualityLevel,mozjpeg: true },
  webp: { quality: qualityLevel },
  png: { compressionLevel: Math.trunc(qualityLevel/10), palette: true, },

}

await image[format](config[format])
   if (meta.width) {
      image = image.resize({
        width: Math.round(meta.width * 0.9),
        withoutEnlargement: true,
      });
    }
    await image.toFile(outputPath);


    // Add requested headers
    res.setHeader("X-Content-Type-Options", "nosniff");
    const fileBaseName = path.parse(file.originalname).name;
    const fileExt = path.extname(file.originalname);
    const downloadName = `${fileBaseName}_wefixPDF_image-compressor${fileExt}`;
    res.setHeader("Content-Disposition", `attachment; filename="${downloadName}"`);

    const mimeTypes = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".webp": "image/webp",
      ".pdf": "application/pdf"
    };
    res.setHeader("Content-Type", mimeTypes[fileExt.toLowerCase()] || "application/octet-stream");


    res.download(outputPath, downloadName, () => {
      fs.unlinkSync(file.path);
      fs.unlinkSync(outputPath);
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Conversion failed" });
  }
}

async function imageConverter({ res, req, file }) {
  try {
    const inputPath = file.path;
    const uid = req.uid;
    const tool = req.params.tool;
    const originalName = file.originalname;
    const ext = path.extname(originalName).toLowerCase();

    let outputPath;
    const fileBaseName = path.parse(originalName).name;

    const converters = {
      "png-to-jpg": async () => {
        outputPath = `uploads/converted-${uid}.jpg`;
        downloadName = `${fileBaseName}_wefixPDF_png-to-jpg.jpg`;
        await sharp(inputPath).jpeg({ quality: 80 }).toFile(outputPath);
      },

      "jpg-to-png": async () => {
        outputPath = `uploads/converted-${uid}.png`;
        downloadName = `${fileBaseName}_wefixPDF_jpg-to-png.png`;
        await sharp(inputPath).png().toFile(outputPath);
      },

      "png-to-webp": async () => {
        outputPath = `uploads/converted-${uid}.webp`;
        downloadName = `${fileBaseName}_wefixPDF_png-to-webp.webp`;
        await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
      },
    };

    if (!converters[tool]) {
      return res.status(400).json({ error: "Tool not supported" });
    }

    await converters[tool]();

    // Add requested headers
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Content-Disposition", `attachment; filename="${downloadName}"`);

    const outputExt = path.extname(downloadName).toLowerCase();
    const mimeTypes = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".webp": "image/webp",
      ".pdf": "application/pdf"
    };
    res.setHeader("Content-Type", mimeTypes[outputExt] || "application/octet-stream");

    return res.download(outputPath, downloadName, () => {
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
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
