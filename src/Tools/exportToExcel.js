import * as XLSX from 'xlsx';

const exportToExcel = (data, fileName, datasetName="Sheet1") => {
  // Create a worksheet from the data array
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, datasetName);

  // Generate and download the Excel file
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

export default exportToExcel;