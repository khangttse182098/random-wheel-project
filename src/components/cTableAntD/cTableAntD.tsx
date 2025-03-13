import Table, { ColumnType } from "antd/es/table";
import { useMemo } from "react";
import "./cTableAntD.scss";
import { getSorter } from "../../utils/sort";

interface AntDComponentProps<T> {
  dataSource: T[];
  columns: ColumnType<T>[];
  bordered?: boolean;
  columnFlex?: number;
  textColor?: string;
  isSort?: boolean;
  isPagination?: boolean;
}

const AntDCustomTable = <T extends Record<string, any>>({
  dataSource = [],
  columns,
  bordered = true,
  columnFlex = 1,
  textColor = "white",
  isSort = true,
  isPagination = true,
}: AntDComponentProps<T>) => {
  const processedColumns = useMemo(() => {
    return columns.map((col) => ({
      ...col,
      sorter:
        col.sorter !== false && col.dataIndex
          ? getSorter(col.dataIndex as keyof T)
          : col.sorter,
      width: col.width || undefined,
      onHeaderCell: () => ({
        style: {
          flex: col.width ? `0 0 ${col.width}px` : `${columnFlex} 1 0`,
          minWidth: col.width ? col.width : 100, // Tránh cột quá bé
          maxWidth: col.width ? col.width : "auto",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      }),
    }));
  }, [columns, columnFlex]);

  return (
    <div
      style={
        {
          "--table-text-color": textColor,
        } as React.CSSProperties
      }
    >
      <Table
        dataSource={dataSource}
        columns={isSort ? processedColumns : columns}
        bordered={bordered}
        pagination={isPagination ? { pageSize: 7 } : false}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default AntDCustomTable;
