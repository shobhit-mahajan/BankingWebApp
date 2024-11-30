const Site = require("../models/Site");
const generateExcel = require("../utils/generateExcel");
const generatePDF = require("../utils/generatePDF");

exports.addSite = async (req, res) => {
  try {
    const { name } = req.body;
    const site = new Site({ name });
    await site.save();
    res.status(201).json(site);
  } catch (error) {
    res.status(500).json({ message: "Error adding site" });
  }
};

exports.getSites = async (req, res) => {
  try {
    const sites = await Site.find();
    res.json(sites);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Sites" });
  }
};

exports.exportSitesToExcel = async (req, res) => {
  try {
    const sites = await Site.find();
    generateExcel(res, sites, "site");
  } catch (error) {
    res.status(500).json({ message: "Error generating Excel file" });
  }
};

exports.exportSitesToPDF = async (req, res) => {
  try {
    const sites = await Site.find();
    generatePDF(res, sites, "Site List");
  } catch (error) {
    res.status(500).json({ message: "Error generating PDF file" });
  }
};
