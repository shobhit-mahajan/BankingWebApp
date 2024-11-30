const Bank = require("../models/Bank");
const generateExcel = require("../utils/generateExcel");
const generatePDF = require("../utils/generatePDF");


exports.addBank = async (req, res) => {
  try {
    const { bankName } = req.body;
    const bank = new Bank({ bankName });
    await bank.save();
    res.status(201).json(bank);
  } catch (error) {
    res.status(500).json({ message: "Error adding bank" });
  }
};

exports.getBanks = async (req, res) => {
  try {
    const banks = await Bank.find();
    res.json(banks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching banks" });
  }
};

exports.exportBanksToExcel = async (req, res) => {
  try {
    const banks = await Bank.find();
    generateExcel(res, banks, "banks");
  } catch (error) {
    res.status(500).json({ message: "Error generating Excel file" });
  }
};

exports.exportBanksToPDF = async (req, res) => {
  try {
    const banks = await Bank.find();
    generatePDF(res, banks, "Banks List");
  } catch (error) {
    res.status(500).json({ message: "Error generating PDF file" });
  }
};

exports.deleteBank = async (req, res) => {
  const { id } = req.params;
  try {
    await Bank.findByIdAndDelete(id);
    res.status(200).json({ message: "Bank deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting bank!", error });
  }
};
exports.updateBank = async (req, res) => {
  const { id } = req.params;
  const { bankName } = req.body;
  try {
    const updatedBank = await Bank.findByIdAndUpdate(
      id,
      { bankName },
      { new: true } // Returns the updated document
    );
    res.status(200).json(updatedBank);
  } catch (error) {
    res.status(500).json({ message: "Error updating bank!", error });
  }
};
exports.getSummary = async (req, res) => {
  try {
    const totalBanks = await Bank.countDocuments();
    const totalDeposit = await Bank.aggregate([{ $group: { _id: null, total: { $sum: "$deposit" } } }]);
    const totalWithdrawal = await Bank.aggregate([{ $group: { _id: null, total: { $sum: "$withdrawal" } } }]);
    const totalBalance = await Bank.aggregate([{ $group: { _id: null, total: { $sum: "$currentBalance" } } }]);

    res.json({
      totalBanks,
      totalDeposit: totalDeposit[0]?.total || 0,
      totalWithdrawal: totalWithdrawal[0]?.total || 0,
      totalBalance: totalBalance[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching summary data", error });
  }
};

