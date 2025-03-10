import { ColumnType } from "antd/es/table";
import style from "./ContestantList.module.scss";
import { Button } from "antd";
import { FaPlus } from "react-icons/fa";
import Search from "antd/es/input/Search";
import AntDCustomTable from "../../components/cTableAntD/cTableAntD";

const ContestantList = () => {
  const columns: ColumnType[] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text: string, record: any, index: number) => index,
    },
    {
      title: "Mã quay số",
      dataIndex: "code",
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
    },
    {
      title: "Phòng ban",
      dataIndex: "departure",
    },
    {
      title: "Chức năng",
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

export default ContestantList;
