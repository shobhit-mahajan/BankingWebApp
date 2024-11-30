const express = require("express");
const {
  addBank,
  getBanks,
  exportBanksToExcel,
  exportBanksToPDF,
  deleteBank,
  updateBank,
  getSummary,
} = require("../controllers/bankController");

const router = express.Router();

router.post("/", addBank);
router.get("/", getBanks);
router.get("/export/excel", exportBanksToExcel);
router.get("/export/pdf", exportBanksToPDF);
router.get("/summary", getSummary);
router.delete("/:id", deleteBank);
router.put("/:id", updateBank);

module.exports = router;
