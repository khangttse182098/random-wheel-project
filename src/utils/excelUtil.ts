import ExcelJS from "exceljs";
import { toast } from "react-toastify";

/**
 * Hàm import dữ liệu từ file Excel
 * @param file File Excel được tải lên
 * @param mapRowToObject Hàm ánh xạ từng dòng Excel thành object
 * @returns Mảng dữ liệu được chuyển đổi từ file Excel
 */
export const importExcelFile = async <T>(
  file: File,
  mapRowToObject: (row: ExcelJS.Row, rowNumber: number) => T | null
): Promise<T[]> => {
  try {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    return new Promise<T[]>((resolve, reject) => {
      reader.onload = async (e) => {
        if (!e.target?.result) return reject("Lỗi khi đọc file Excel.");

        const buffer = e.target.result as ArrayBuffer;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);
        const worksheet = workbook.worksheets[0];
        
        const importedData: T[] = [];
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber === 1) return; // Bỏ qua hàng tiêu đề
          const item = mapRowToObject(row, rowNumber);
          if (item) importedData.push(item);
        });

        toast.success("Import danh sách thành công!");
        resolve(importedData);
      };

      reader.onerror = () => {
        toast.error("Lỗi khi đọc file Excel.");
        reject("Lỗi khi đọc file Excel.");
      };
    });
  } catch (error) {
    toast.error("Lỗi trong quá trình xử lý file.");
    return [];
  }
};
