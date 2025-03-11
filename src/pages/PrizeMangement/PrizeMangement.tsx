import { Button } from "antd";
import style from "./PrizeMangement.module.scss";
import { FaPlus } from "react-icons/fa";
import Search from "antd/es/input/Search";
import AntDCustomTable from "../../components/cTableAntD/cTableAntD";
import { ColumnType } from "antd/es/table";

const PrizeMangement = () => {
  const columns: ColumnType[] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text: string, record: any, index: number) => index + 1,
    },
    {
      title: "Tên giải",
      dataIndex: "name",
    },
    {
      title: "Thứ tự lần quay",
      dataIndex: "rolling_order",
    },
    {
      title: "Số người trúng/lần quay",
      dataIndex: "numberWinner",
    },
  ];

  return (
    <div className={style["container"]}>
      {/* create event */}
      <div className={style["function__container"]}>
        <Button
          className={style["button__add"]}
          color="primary"
          variant="solid"
          icon={<FaPlus />}
        >
          Tạo mới
        </Button>
        {/* search */}
        <Search className={style["search__input"]} />
      </div>
      {/* table */}
      <AntDCustomTable columns={columns} dataSource={[]} />{" "}
    </div>
  );
};

export default PrizeMangement;
