const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

const bankRoutes = require("./routes/bankRoutes");
const siteRoutes = require("./routes/siteRoutes");
const transaction = require("./routes/transactions")
const reportRoutes = require('./routes/reportRoutes')

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Database Connection
connectDB();

// Routes
app.use("/api/banks", bankRoutes);
app.use("/api/sites", siteRoutes);
app.use("/api/transaction",transaction);
app.use("/api/reports", reportRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
