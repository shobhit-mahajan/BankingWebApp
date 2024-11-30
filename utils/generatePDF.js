const PDFDocument = require("pdfkit");

const generatePDF = (res, data, title) => {
  const doc = new PDFDocument();
  doc.pipe(res);

  // Title
  doc.fontSize(20).text(title, { align: "center" }).moveDown();

  // Data
  data.forEach((item, index) => {
    doc.fontSize(12).text(`${index + 1}. ${item.name}`);
  });

  // Finalize
  doc.end();
};

module.exports = generatePDF;
