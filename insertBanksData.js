// insertBanksData.js
const mongoose = require('mongoose');
const Bank = require('./models/Bank'); // Path to your Bank model

// Your banks data
const banksData = [
  { bankName: 'poonam', initialBalance: 0, deposit: 0, withdrawal: 0, currentBalance: 0 },
  { bankName: 'aarzo', initialBalance: 0, deposit: 18880, withdrawal: 18880, currentBalance: 0 },
  { bankName: 'rai shuttering', initialBalance: 0, deposit: 152350, withdrawal: 152350, currentBalance: 0 },
  { bankName: 'paramjeet bom', initialBalance: 0, deposit: 5700, withdrawal: 5700, currentBalance: 0 },
  { bankName: 'Dep portal', initialBalance: 0, deposit: 0, withdrawal: 0, currentBalance: 0 },
  { bankName: 'WD portal', initialBalance: 0, deposit: 0, withdrawal: 0, currentBalance: 0 },
  { bankName: 'Chandan', initialBalance: 0, deposit: 0, withdrawal: 0, currentBalance: 0 },
  { bankName: 'Ganesh', initialBalance: 0, deposit: 0, withdrawal: 0, currentBalance: 0 },
  { bankName: 'aman', initialBalance: 0, deposit: 0, withdrawal: 0, currentBalance: 0 },
  { bankName: 'shanu', initialBalance: 0, deposit: 0, withdrawal: 0, currentBalance: 0 },
  { bankName: 'shiva', initialBalance: 100000, deposit: 0, withdrawal: 0, currentBalance: 100000 },
  { bankName: 'saurabh', initialBalance: 93875, deposit: 0, withdrawal: 0, currentBalance: 93875 },
  { bankName: 'Branch Kharch', initialBalance: 0, deposit: 0, withdrawal: 0, currentBalance: 0 },
  { bankName: 'Money Out', initialBalance: 0, deposit: 0, withdrawal: 0, currentBalance: 0 },
  { bankName: 'Bonus', initialBalance: 0, deposit: 0, withdrawal: 0, currentBalance: 0 },
  { bankName: 'Extra', initialBalance: 0, deposit: 1850, withdrawal: 1850, currentBalance: 1850 },
  { bankName: 'Mistake', initialBalance: 0, deposit: 0, withdrawal: 0, currentBalance: 0 },
  { bankName: 'jack', initialBalance: 0, deposit: 0, withdrawal: 0, currentBalance: 0 },
  { bankName: 'gaurabh delhi', initialBalance: 0, deposit: 0, withdrawal: 0, currentBalance: 0 },
];

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://mahajanshobhit38:mahajanshobhit38@bankingwebapp.2mem2.mongodb.net/?retryWrites=true&w=majority&appName=BankingWebApp');
    console.log('Database connected');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

// Function to insert banks data
const insertBanksData = async () => {
  try {
    await Bank.insertMany(banksData);
    console.log('Bank data inserted successfully');
    process.exit(); // Exit after the operation
  } catch (err) {
    console.error('Error inserting bank data:', err);
    process.exit(1);
  }
};

// Connect to the database and insert data
connectDB().then(insertBanksData);
