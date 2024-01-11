import React from "react";
import { HiOutlineDownload } from "react-icons/hi";
// import * as XLSX from "xlsx";

const ExportBtn = ({ text = "Export Excel", genrateExcel }) => {
  const handleExport = () => {
    // Create a new workbook
    // const workbook = XLSX.utils.book_new();
    // Convert data to worksheet
    // const worksheet = XLSX.utils.json_to_sheet(data);
    // Add the worksheet to the workbook
    // XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
    // Save the workbook as an Excel file
    // XLSX.writeFile(workbook, "exported_data.xlsx");
  };

  return (
    <button
      onClick={() => {
        genrateExcel();
      }}
      className="export-btn"
    >
      <HiOutlineDownload />
      <span>{text}</span>
    </button>
  );
};

export default ExportBtn;
