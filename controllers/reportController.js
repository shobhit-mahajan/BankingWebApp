const Deposit = require("../models/Deposit");
const Withdraw = require("../models/Withdraw");
const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");

// Helper function to format transactions
const formatTransactions = (transactions, type) =>
  transactions.map((transaction) => ({
    site: transaction.site,
    bank: transaction.bank,
    userName: transaction.userName,
    transactionType: type,
    amount: transaction.amount,
    date: transaction.date,
  }));

// Fetch Bank-Wise Report
exports.getBankWiseReport = async (req, res) => {
  const { bank, startDate, endDate } = req.body;

  try {
    let deposits = [];
    let withdrawals = [];

    if (bank === "all") {
      deposits = await Deposit.find({
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
      withdrawals = await Withdraw.find({
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
    } else {
      deposits = await Deposit.find({
        bank,
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
      withdrawals = await Withdraw.find({
        bank,
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
    }

    const transactions = [
      ...formatTransactions(deposits, "Deposit"),
      ...formatTransactions(withdrawals, "Withdraw"),
    ];

    if (!transactions.length) {
      return res.status(404).json({ message: "No data found for the selected criteria." });
    }

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bank-wise report.", error });
  }
};

// Fetch Site-Wise Report
exports.getSiteWiseReport = async (req, res) => {
  const { site, startDate, endDate } = req.body;

  try {
    let deposits = [];
    let withdrawals = [];

    if (site === "all") {
      deposits = await Deposit.find({
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
      withdrawals = await Withdraw.find({
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
    } else {
      deposits = await Deposit.find({
        site,
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
      withdrawals = await Withdraw.find({
        site,
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
    }

    const transactions = [
      ...formatTransactions(deposits, "Deposit"),
      ...formatTransactions(withdrawals, "Withdraw"),
    ];

    if (!transactions.length) {
      return res.status(404).json({ message: "No data found for the selected criteria." });
    }

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching site-wise report.", error });
  }
};

// Export Bank-Wise Report to Excel
exports.exportBankWiseReportToExcel = async (req, res) => {
  const { bank, startDate, endDate } = req.query;

  try {
    let deposits = [];
    let withdrawals = [];

    if (bank === "all") {
      deposits = await Deposit.find({
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
      withdrawals = await Withdraw.find({
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
    } else {
      deposits = await Deposit.find({
        bank,
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
      withdrawals = await Withdraw.find({
        bank,
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
    }

    const transactions = [
      ...formatTransactions(deposits, "Deposit"),
      ...formatTransactions(withdrawals, "Withdraw"),
    ];

    if (!transactions.length) {
      return res.status(404).json({ message: "No data found for the selected criteria." });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Bank-Wise Report");

    worksheet.columns = [
      { header: "Bank", key: "bank" },
      { header: "User Name", key: "userName" },
      { header: "Transaction Type", key: "transactionType" },
      { header: "Amount", key: "amount" },
      { header: "Date", key: "date" },
    ];

    transactions.forEach((transaction) => {
      worksheet.addRow(transaction);
    });

    res.setHeader("Content-Disposition", "attachment; filename=bankwise-report.xlsx");
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ message: "Error exporting bank-wise report to Excel.", error });
  }
};

// Export Bank-Wise Report to PDF
exports.exportBankWiseReportToPDF = async (req, res) => {
  const { bank, startDate, endDate } = req.query;

  try {
    let deposits = [];
    let withdrawals = [];

    if (bank === "all") {
      deposits = await Deposit.find({
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
      withdrawals = await Withdraw.find({
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
    } else {
      deposits = await Deposit.find({
        bank,
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
      withdrawals = await Withdraw.find({
        bank,
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
    }

    const transactions = [
      ...formatTransactions(deposits, "Deposit"),
      ...formatTransactions(withdrawals, "Withdraw"),
    ];

    if (!transactions.length) {
      return res.status(404).json({ message: "No data found for the selected criteria." });
    }

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=bankwise-report.pdf");

    doc.pipe(res);
    doc.fontSize(18).text("Bank-Wise Report", { align: "center" });
    doc.moveDown();

    transactions.forEach((transaction, index) => {
      doc.text(
        `${index + 1}. Bank: ${transaction.bank}, User: ${transaction.userName}, Type: ${transaction.transactionType}, Amount: ${transaction.amount}, Date: ${transaction.date}`,
        { align: "left" }
      );
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ message: "Error exporting bank-wise report to PDF.", error });
  }
};

// Export Site-Wise Report to Excel
exports.exportSiteWiseReportToExcel = async (req, res) => {
  const { site, startDate, endDate } = req.query;

  try {
    let deposits = [];
    let withdrawals = [];

    if (site === "all") {
      deposits = await Deposit.find({
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
      withdrawals = await Withdraw.find({
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
    } else {
      deposits = await Deposit.find({
        site,
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
      withdrawals = await Withdraw.find({
        site,
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
    }

    const transactions = [
      ...formatTransactions(deposits, "Deposit"),
      ...formatTransactions(withdrawals, "Withdraw"),
    ];

    if (!transactions.length) {
      return res.status(404).json({ message: "No data found for the selected criteria." });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Site-Wise Report");

    worksheet.columns = [
      { header: "Site", key: "site" },
      { header: "User Name", key: "userName" },
      { header: "Transaction Type", key: "transactionType" },
      { header: "Amount", key: "amount" },
      { header: "Date", key: "date" },
    ];

    transactions.forEach((transaction) => {
      worksheet.addRow(transaction);
    });

    res.setHeader("Content-Disposition", "attachment; filename=sitewise-report.xlsx");
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ message: "Error exporting site-wise report to Excel.", error });
  }
};

// Export Site-Wise Report to PDF
exports.exportSiteWiseReportToPDF = async (req, res) => {
  const { site, startDate, endDate } = req.query;

  try {
    let deposits = [];
    let withdrawals = [];

    if (site === "all") {
      deposits = await Deposit.find({
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
      withdrawals = await Withdraw.find({
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
    } else {
      deposits = await Deposit.find({
        site,
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
      withdrawals = await Withdraw.find({
        site,
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
    }

    const transactions = [
      ...formatTransactions(deposits, "Deposit"),
      ...formatTransactions(withdrawals, "Withdraw"),
    ];

    if (!transactions.length) {
      return res.status(404).json({ message: "No data found for the selected criteria." });
    }

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=sitewise-report.pdf");

    doc.pipe(res);
    doc.fontSize(18).text("Site-Wise Report", { align: "center" });
    doc.moveDown();

    transactions.forEach((transaction, index) => {
      doc.text(
        `${index + 1}. Site: ${transaction.site}, User: ${transaction.userName}, Type: ${transaction.transactionType}, Amount: ${transaction.amount}, Date: ${transaction.date}`,
        { align: "left" }
      );
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ message: "Error exporting site-wise report to PDF.", error });
  }
};
