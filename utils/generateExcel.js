const ExcelJS = require("exceljs");

const generateExcel = async (res, data, fileName) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(fileName);

  // Header
  sheet.addRow(["S.No", "Name"]);

  // Data
  data.forEach((item, index) => {
    sheet.addRow([index + 1, item.name]);
  });

  // Send Response
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", `attachment; filename=${fileName}.xlsx`);
  await workbook.xlsx.write(res);
  res.end();
};

module.exports = generateExcel;
