import { ImCross } from "react-icons/im";
import { FaRegFileExcel } from "react-icons/fa";
import { ColumnType } from "antd/es/table";
import style from "./WinnerList.module.scss";
import { Button } from "antd";
import Search from "antd/es/input/Search";
import AntDCustomTable from "../../components/cTableAntD/cTableAntD";

const WinnerList = () => {
  const columns: ColumnType[] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_: string, __: any, index: number) => index + 1,
    },
    {
      title: "Ngày trúng thưởng",
      dataIndex: "awards_date",
    },
    {
      title: "Tên giải",
      dataIndex: "name",
    },
    {
      title: "Lần quay",
      dataIndex: "rolling_order",
    },
    {
      title: "Họ tên",
      dataIndex: "full_name",
    },
    {
      title: "Phòng ban",
      dataIndex: "departure",
    },
    {
      title: "Mã quay số",
      dataIndex: "winner_number",
    },
    {
      title: "Chức năng",
      dataIndex: "",
    },
  ];
  return (
    <div className={style["container"]}>
      {/* create event */}
      <div className={style["function__container"]}>
        <div className={style["button__list"]}>
          <Button
            className={style["button__add"]}
            color="primary"
            variant="solid"
            icon={<FaRegFileExcel />}
          >
            Xuất excel
          </Button>
          <Button
            className={style["button__add"]}
            color="danger"
            variant="solid"
            icon={<ImCross />}
          >
            Xoá tất cả
          </Button>
        </div>
        {/* search */}
        <Search className={style["search__input"]} />
      </div>
      {/* table */}
      <AntDCustomTable columns={columns} dataSource={[]} />
    </div>
  );
};

export default WinnerList;
