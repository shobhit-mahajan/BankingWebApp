const Deposit = require("../models/Deposit");
const Bank = require("../models/Bank");
const Site = require("../models/Site");
const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");

exports.addDeposit = async (req, res) => {
  try {
    const { userName, amount, utr, bank, site, remark } = req.body;

    const existingUTR = await Deposit.findOne({ utr });
    if (existingUTR) {
      return res.status(400).json({ error: "UTR must be unique." });
    }

    const deposit = new Deposit({ userName, amount, utr, bank, site, remark });
    await deposit.save();

    // Update bank balance
    const bankData = await Bank.findOneAndUpdate(
      { name: bank },
      { $inc: { totalBalance: amount } }, // Increment total balance by the deposit amount
      { new: true }
    );
    res.status(201).json({ message: "Deposit added successfully.", bank: bankData  });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

exports.getDeposits = async (req, res) => {
  try {
    const deposits = await Deposit.find();
    res.json(deposits);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

exports.downloadDepositsPDF = async (req, res) => {
  try {
    const deposits = await Deposit.find();

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=deposits.pdf");

    doc.pipe(res);
    doc.fontSize(18).text("Deposits Report", { align: "center" });
    doc.moveDown();

    deposits.forEach((deposit, index) => {
      doc.text(
        `${index + 1}. ${deposit.userName} deposited ${deposit.amount} to ${deposit.bank}.`,
        { align: "left" }
      );
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

exports.downloadDepositsExcel = async (req, res) => {
  try {
    const deposits = await Deposit.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Deposits");

    worksheet.columns = [
      { header: "User Name", key: "userName" },
      { header: "Amount", key: "amount" },
      { header: "Bank", key: "bank" },
      { header: "UTR", key: "utr" },
      { header: "Site", key: "site" },
      { header: "Remark", key: "remark" },
      { header: "Date", key: "date" },
    ];

    deposits.forEach((deposit) => {
      worksheet.addRow(deposit);
    });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=deposits.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

exports.validateUTR = async (req, res) => {
  const { utr } = req.body;

  try {
    // Check if a transaction with the same UTR already exists
    const existingTransaction = await Deposit.findOne({ utr });
    res.json({ isUnique: !existingTransaction }); // Return true if no match, meaning it's unique
  } catch (error) {
    res.status(500).json({ message: "Error validating UTR", error });
  }
};