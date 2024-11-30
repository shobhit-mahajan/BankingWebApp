const express = require("express");
const {
  getBankWiseReport,
  exportBankWiseReportToExcel,
  exportBankWiseReportToPDF,
  getSiteWiseReport,
} = require("../controllers/reportController");

const router = express.Router();

router.post("/bankwise", getBankWiseReport);
router.get("/bankwise/excel", exportBankWiseReportToExcel);
router.get("/bankwise/pdf", exportBankWiseReportToPDF);
router.post("/sitewise", getSiteWiseReport);
router.get("/sitewise/excel", exportBankWiseReportToExcel);
router.get("/sitewise/pdf", exportBankWiseReportToPDF);

module.exports = router;
