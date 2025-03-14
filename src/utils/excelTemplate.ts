import ExcelJS from "exceljs";
import saveAs from "file-saver";

/**
 * Xuất file Excel với tùy chỉnh cột, tiêu đề, và dữ liệu mẫu
 * @param fileName Tên file xuất ra
 * @param sheetName Tên sheet trong Excel
 * @param columns Danh sách cột với key, title, width
 * @param sampleData Dữ liệu mẫu (nếu có)
 */
export const exportExcelTemplate = async (
  fileName: string,
  sheetName: string,
  columns: { key: string; title: string; width?: number }[],
  sampleData?: any[]
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  // Tạo tiêu đề cột
  const headerRow = worksheet.addRow(columns.map((col) => col.title));

  // Custom style cho tiêu đề cột
  headerRow.eachCell((cell, colNumber) => {
    cell.font = { bold: true, color: { argb: "FFFFFF" } }; // Màu chữ trắng
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "0073e6" }, // Màu nền xanh dương
    };
    cell.alignment = { horizontal: "center", vertical: "middle" };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    worksheet.getColumn(colNumber).width = columns[colNumber - 1].width || 20; // Set width
  });

  // Thêm dữ liệu mẫu nếu có
  if (sampleData && sampleData.length > 0) {
    sampleData.forEach((row) => {
      worksheet.addRow(columns.map((col) => row[col.key] || ""));
    });
  }

  // Xuất file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `${fileName}.xlsx`);
};
