const express = require("express");
const { addSite, getSites, exportSitesToExcel, exportSitesToPDF } = require("../controllers/siteController");

const router = express.Router();

router.post("/", addSite);
router.get("/", getSites);
router.get("/export/excel", exportSitesToExcel);
router.get("/export/pdf", exportSitesToPDF);

module.exports = router;
