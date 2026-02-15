const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMulter");
const { convertFile } = require("../controllers/convert.controller");



router.post("/:tool", upload.single("file"), convertFile);


module.exports = router;
