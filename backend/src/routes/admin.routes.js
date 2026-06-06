const express = require("express");
const router = express.Router();
const admin = require("../controllers/admin.controller");
const adminAuth = require("../middleware/adminAuth");

// Every admin endpoint mutates or exposes raw DB tables — require the secret.
router.use(adminAuth);

router.get("/tables", admin.getTables);
router.get("/data/:table", admin.getTableData);
router.post("/data/:table", admin.createRecord);
router.put("/data/:table/:id", admin.updateRecord);
router.delete("/data/:table/:id", admin.deleteRecord);
router.post("/copy/:table/:id", admin.copyRecord);
router.post("/create/:table", admin.createRecord);

module.exports = router;
