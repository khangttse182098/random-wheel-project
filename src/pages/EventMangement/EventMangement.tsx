import { Button } from "antd";
import AntDCustomTable from "../../components/cTableAntD/cTableAntD";
import { ColumnType } from "antd/es/table";
import style from "./EventMangement.module.scss";
import { FaPlus } from "react-icons/fa";
import Search from "antd/es/input/Search";

const EventMangement = () => {
  const columns: ColumnType[] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text: string, record: any, index: number) => index,
    },
    {
      title: "Tên sự kiện",
      dataIndex: "name",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "expiry_date",
    },
    {
      title: "Chức năng",
    },
  ];
  return (
    <div className={style["container"]}>
      {/* title */}
      <h1 className={style["header"]}>QUẢN LÝ SỰ KIỆN</h1>
      {/* create event */}
      <div className={style["function__container"]}>
        <Button
          className={style["button__add"]}
          color="primary"
          variant="solid"
          icon={<FaPlus />}
        >
          Tạo sự kiện
        </Button>
        {/* search */}
        <Search className={style["search__input"]} />
      </div>
      {/* table */}
      <AntDCustomTable
        columns={columns}
        dataSource={[]}
        textColor="black"
        tableColor="white"
      />
    </div>
  );
};

export default EventMangement;
