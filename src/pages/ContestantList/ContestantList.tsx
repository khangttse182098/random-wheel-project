import { ImCross } from "react-icons/im";
import { FaDownload } from "react-icons/fa6";
import { FaRegFileExcel } from "react-icons/fa";
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
      render: (_: string, __: any, index: number) => index,
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
            color="primary"
            variant="solid"
            icon={<FaRegFileExcel />}
          >
            Import excel
          </Button>
          <Button
            className={style["button__add"]}
            color="primary"
            variant="solid"
            icon={<FaDownload />}
          >
            Tải mẫu excel
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

export default ContestantList;
