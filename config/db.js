const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://mahajanshobhit38:mahajanshobhit38@bankingwebapp.2mem2.mongodb.net/?retryWrites=true&w=majority&appName=BankingWebApp");
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
