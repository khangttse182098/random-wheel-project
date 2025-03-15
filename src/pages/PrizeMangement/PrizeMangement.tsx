import { Button } from "antd";
import { ImCross } from "react-icons/im";
import style from "./PrizeMangement.module.scss";
import { FaPlus } from "react-icons/fa";
import Search from "antd/es/input/Search";
import AntDCustomTable from "../../components/cTableAntD/cTableAntD";
import { ColumnType } from "antd/es/table";
import useAppStore from "../../store/useAppStore";
import { RewardData } from "../../models/reward";

const PrizeMangement = () => {
  const { rewardList } = useAppStore.getState();
  const columns: ColumnType[] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_: string, __: any, index: number) => index + 1,
    },
    {
      title: "Tên giải",
      dataIndex: "rewardName",
    },
    {
      title: "Thứ tự lần quay",
      dataIndex: "rollingNumber",
    },
    {
      title: "Số người trúng/lần quay",
      dataIndex: "winnerNumber",
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
      <AntDCustomTable
        columns={columns}
        dataSource={rewardList as RewardData[]}
      />
    </div>
  );
};

export default PrizeMangement;
