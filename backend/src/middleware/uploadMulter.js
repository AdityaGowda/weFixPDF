const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

const UPLOAD_DIR = "uploads/";
// Ensure the upload directory exists so multer never fails on a fresh checkout.
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: UPLOAD_DIR,

  filename: (req, file, cb) => {
    const uid = crypto.randomUUID();
    const ext = path.extname(file.originalname).toLowerCase();
    req.uid = uid;
    cb(null, `${uid}${ext}`);
  },
});

const allowedExtensions = [
  ".jpg", ".jpeg", ".png", ".webp",   // images
  ".heic", ".heif",                    // iPhone HEIC
  ".pdf",                              // PDF
  ".doc", ".docx",                     // Word
];

const upload = multer({
  storage,

  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      return cb(new Error(`Invalid file type: ${ext}. Allowed: ${allowedExtensions.join(", ")}`));
    }
    cb(null, true);
  },

  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB — PDFs and Word docs can be large
  },
});

module.exports = upload;