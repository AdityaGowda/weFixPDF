const path = require("path");
const crypto = require("crypto");
const { imageCompressor, imageConverter } = require("../services/convert.service");


exports.convertFile = async (req, res) => {
  const service = req.body.service;
  const file = req.file;
  const uniqueId = req.uid;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
 const outputPath = path.join("uploads", `compressed-${uniqueId}.jpg`);

  try {
    if(service=='image-compressor'){ 
      return imageCompressor({req,res,file,outputPath});
    }else{
      return  imageConverter({ req, res, file: req.file });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Conversion failed" });
  }
};


