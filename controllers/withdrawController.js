const Withdraw = require("../models/Withdraw");
const Bank = require("../models/Bank");
const Site = require("../models/Site");
const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");

// Add Withdrawal
exports.addWithdraw = async (req, res) => {
  try {
    const { userName, amount, utr, bank, site, remark } = req.body;

    // Check if UTR is unique
    const existingUTR = await Withdraw.findOne({ utr });
    if (existingUTR) {
      return res.status(400).json({ error: "UTR must be unique." });
    }

    // Create a new withdrawal record
    const withdraw = new Withdraw({ userName, amount, utr, bank, site, remark });
    await withdraw.save();

    // Check if the bank has enough balance for withdrawal
    const bankData = await Bank.findOne({ name: bank });
    if (!bankData || bankData.totalBalance < amount) {
      return res.status(400).json({ error: "Insufficient bank balance." });
    }

    // Update the bank balance by deducting the withdrawal amount
    const updatedBankData = await Bank.findOneAndUpdate(
      { name: bank },
      { $inc: { totalBalance: -amount } }, // Decrement total balance by withdrawal amount
      { new: true }
    );

    res.status(201).json({ message: "Withdrawal processed successfully.", bank: updatedBankData });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// Get all Withdrawals
exports.getWithdraws = async (req, res) => {
  try {
    const withdraws = await Withdraw.find();
    res.json(withdraws);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// Download Withdrawals as PDF
exports.downloadWithdrawsPDF = async (req, res) => {
  try {
    const withdraws = await Withdraw.find();

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=withdrawals.pdf");

    doc.pipe(res);
    doc.fontSize(18).text("Withdrawals Report", { align: "center" });
    doc.moveDown();

    withdraws.forEach((withdraw, index) => {
      doc.text(
        `${index + 1}. ${withdraw.userName} withdrew ${withdraw.amount} from ${withdraw.bank}.`,
        { align: "left" }
      );
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ error: "Error generating PDF." });
  }
};

// Download Withdrawals as Excel
exports.downloadWithdrawsExcel = async (req, res) => {
  try {
    const withdraws = await Withdraw.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Withdrawals");

    worksheet.columns = [
      { header: "User Name", key: "userName" },
      { header: "Amount", key: "amount" },
      { header: "Bank", key: "bank" },
      { header: "UTR", key: "utr" },
      { header: "Site", key: "site" },
      { header: "Remark", key: "remark" },
      { header: "Date", key: "date" },
    ];

    withdraws.forEach((withdraw) => {
      worksheet.addRow(withdraw);
    });

    res.setHeader("Content-Disposition", "attachment; filename=withdrawals.xlsx");
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ error: "Error generating Excel file." });
  }
};

// Validate UTR for uniqueness
exports.validateutr = async (req, res) => {
  const { utr } = req.body;

  try {
    // Check if a transaction with the same UTR already exists
    const existingTransaction = await Withdraw.findOne({ utr });
    res.json({ isUnique: !existingTransaction }); // Return true if no match, meaning it's unique
  } catch (error) {
    res.status(500).json({ message: "Error validating UTR", error });
  }
};
