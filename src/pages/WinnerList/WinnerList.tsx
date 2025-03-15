import { ImCross } from "react-icons/im";
import { FaRegFileExcel } from "react-icons/fa";
import { ColumnType } from "antd/es/table";
import style from "./WinnerList.module.scss";
import { Button } from "antd";
import Search from "antd/es/input/Search";
import AntDCustomTable from "../../components/cTableAntD/cTableAntD";
import useAppStore from "../../store/useAppStore";
import { WinnerData } from "../../models/winner";

const WinnerList = () => {
  const { winnerList } = useAppStore.getState();
  const columns: ColumnType[] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_: string, __: any, index: number) => index + 1,
    },
    {
      title: "Ngày trúng thưởng",
      dataIndex: "awardDate",
    },
    {
      title: "Tên giải",
      dataIndex: "rewardName",
    },
    {
      title: "Lần quay",
      dataIndex: "rollingOrder",
    },
    {
      title: "Họ tên",
      dataIndex: "participantName",
    },
    {
      title: "Phòng ban",
      dataIndex: "department",
    },
    {
      title: "Mã quay số",
      dataIndex: "code",
    },
    {
      title: "Chức năng",
      dataIndex: "",
      render: () => (
        <Button
          icon={<ImCross />}
          className={style["setting__opt"]}
          color="danger"
          variant="solid"
        >
          Hủy kết quả
        </Button>
      ),
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
      <AntDCustomTable
        columns={columns}
        dataSource={winnerList as WinnerData[]}
      />
    </div>
  );
};

export default WinnerList;
