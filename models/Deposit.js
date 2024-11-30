const mongoose = require("mongoose");

const depositSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  amount: { type: Number, required: true },
  utr: { type: String, required: true, unique: true },
  bank: { type: String, required: true },
  site: { type: String, required: true },
  remark: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Deposit", depositSchema);
