const express = require("express");
const {
  addDeposit,
  getDeposits,
  downloadDepositsPDF,
  downloadDepositsExcel,
  validateUTR
} = require("../controllers/depositController");

const { addWithdraw, getWithdraws, downloadWithdrawsPDF, downloadWithdrawsExcel, validateutr } = require("../controllers/withdrawController");

const router = express.Router();

router.post("/deposits", addDeposit);
router.get("/deposits", getDeposits);
router.get("/deposits/pdf", downloadDepositsPDF);
router.get("/deposits/excel", downloadDepositsExcel);
router.post('/deposits/validate-utr',validateUTR)
router.post("/withdraws", addWithdraw);
router.get("/withdraws", getWithdraws);
router.get("/withdraws/pdf", downloadWithdrawsPDF);
router.get("/withdraws/excel", downloadWithdrawsExcel);
router.post('/deposits/validate-utr',validateUTR)
router.post('/withdraws/validate-utr',validateutr)

module.exports = router;
