import { Button, Modal, Popconfirm } from "antd";
import Search from "antd/es/input/Search";
import { ColumnType } from "antd/es/table";
import { useState } from "react";
import { CiCircleAlert } from "react-icons/ci";
import { FaRegFileExcel } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";
import AntDCustomTable from "../../components/cTableAntD/cTableAntD";
import { WinnerData } from "../../models/winner";
import { deleteWinnerList } from "../../service/participant/api";
import useAppStore from "../../store/useAppStore";
import { formatDate } from "../../utils/dateUtils";
import style from "./WinnerList.module.scss";

const WinnerList = () => {
  const { winnerList, setWinnerList } = useAppStore((state) => state);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleDeleteAttendanceReward = async (id: string) => {
    try {
      await deleteWinnerList([id]);
      const newWinnerList = winnerList!.filter(
        (item) => item.attendanceRewardId != parseInt(id)
      );
      setWinnerList(newWinnerList);
      toast.success("Xóa người trúng giải thành công");
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  };

  const handleDeleteAllAttendanceRewards = async () => {
    try {
      const idsToDelete = winnerList!
        .map((item) => item.attendanceRewardId.toString())
        .filter(
          (attendanceRewardId): attendanceRewardId is string =>
            attendanceRewardId !== undefined
        );
      await deleteWinnerList(idsToDelete);
      toast.success("Xóa danh sách người trúng giải thành công");
      setWinnerList([]);
      setShowModal(false);
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  };

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
      render: (_: any, record) => {
        return <div>{formatDate(record.awardDate)}</div>;
      },
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
      render: (_, record) => (
        <Popconfirm
          color="danger"
          title="Xóa người trúng giải"
          description="Bạn có chắc muốn xóa người trúng giải này không?"
          onConfirm={() =>
            handleDeleteAttendanceReward(record.attendanceRewardId!.toString())
          }
          okText="Có"
          cancelText="Không"
        >
          <Button type="primary" danger style={{ fontWeight: "bold" }}>
            <ImCross /> Hủy kết quả
          </Button>
        </Popconfirm>
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
            onClick={() => setShowModal(true)}
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
      <Modal
        onCancel={() => {
          setShowModal(false);
        }}
        open={showModal}
        footer={[
          <div
            style={{ display: "flex", justifyContent: "center", gap: "12px" }}
          >
            <Button
              key="back"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Hủy
            </Button>
            <Button
              type="primary"
              onClick={() => handleDeleteAllAttendanceRewards()}
            >
              Ok
            </Button>
          </div>,
        ]}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <CiCircleAlert size={50} color="orange" />
          <h2>Xóa tất cả</h2>
          <div style={{ fontSize: "23px", textAlign: "center" }}>
            Bạn có chắc muốn xóa toàn bộ danh sách người trúng giải không?
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WinnerList;
