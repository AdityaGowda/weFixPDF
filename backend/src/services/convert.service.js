const sharp = require("sharp");
const fs = require("fs");

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


    res.download(outputPath, `compressed-${file.originalname}`, () => {
      fs.unlinkSync(file.path);
      fs.unlinkSync(outputPath);
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Conversion failed" });
  }
}

async function imageConverter({res,req,file}){
    const inputPath = file.path;
    const uid = req.uid;

    const tool = req.params.tool;
    const originalName = file.originalname;

    const ext = path.extname(originalName).toLowerCase();


    let outputPath;
    let downloadName;
// ---------------- PNG -> JPG ----------------
if (tool === "png-to-jpg") {
  outputPath = `uploads/${uid}.jpg`;
  downloadName = originalName.replace(ext, ".jpg");

  await sharp(inputPath)
    .jpeg()
    .toFile(outputPath);
}

// ---------------- JPG -> PNG ----------------
else if (tool === "jpg-to-png") {
  outputPath = `uploads/${uid}.png`;
  downloadName = originalName.replace(ext, ".png");

  await sharp(inputPath)
    .png()
    .toFile(outputPath);
}

// ---------------- PNG -> WEBP ----------------
else if (tool === "png-to-webp") {
  outputPath = `uploads/${uid}.webp`;
  downloadName = originalName.replace(ext, ".webp");

  await sharp(inputPath)
    .webp()
    .toFile(outputPath);
}

   res.download(outputPath, downloadName, () => {
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
}



module.exports = {
imageCompressor,
imageConverter
};
