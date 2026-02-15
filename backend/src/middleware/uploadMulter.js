const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/",

  filename: (req, file, cb) => {

    const uniqueId = crypto.randomUUID();
    const uid = uniqueId;

    // extract original extension
    const ext = path.extname(file.originalname).toLowerCase();
    req.uid = uid;
    // rename file to UID + extension
    cb(null, `${uid}${ext}`);
  },
});

const upload = multer({
  storage,

  fileFilter: (req, file, cb) => {
    const allowed = [".jpg", ".jpeg", ".png", ".webp", ".pdf"];
    const ext = path.extname(file.originalname).toLowerCase();
console.log(ext,!allowed.includes(ext))
    if (!allowed.includes(ext)) {
      return cb(new Error("Invalid file type"));
    }

    cb(null, true);
  },

  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

module.exports=upload