import { Button } from "antd";
import { ImCross } from "react-icons/im";
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
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "Chức năng",
      dataIndex: "function",
      render: () => (
        <Button
          icon={<ImCross />}
          className={style["setting__opt"]}
          color="danger"
          variant="solid"
        >
          Xoá
        </Button>
      ),
    },
  ];

  const data = [
    {
      name: "lmao",
      rolling_order: 2,
      numberWinner: 5,
      status: "Chưa quay",
    },
    {
      name: "lmao",
      rolling_order: 2,
      numberWinner: 5,
      status: "Chưa quay",
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
            icon={<FaPlus />}
          >
            Tạo mới
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
      <AntDCustomTable columns={columns} dataSource={data} />{" "}
    </div>
  );
};

export default PrizeMangement;
