const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
  bankName: { type: String, required: true },
  initialBalance: { type: Number, default: 0 },
  deposit: { type: Number, default: 0 },
  withdrawal: { type: Number, default: 0 },
  currentBalance: { type: Number, default: 0 },
});

module.exports = mongoose.model('Bank', bankSchema);
