import { Button, Form, Input, Modal, Popconfirm } from "antd";
import Search from "antd/es/input/Search";
import { ColumnType } from "antd/es/table";
import { useCallback, useState } from "react";
import { CiCircleAlert } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";
import AntDCustomTable from "../../components/cTableAntD/cTableAntD";
import { CreateRewardData, RewardData } from "../../models/reward";
import {
  createAward,
  deleteAward,
  getRewardList,
} from "../../service/event/api";
import useAppStore from "../../store/useAppStore";
import style from "./PrizeMangement.module.scss";

const PrizeMangement = () => {
  const [form] = Form.useForm();
  const { rewardList, setRewardList } = useAppStore((state) => state);
  const { chooseEvent } = useAppStore((state) => state);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);

  const handleCreatePrize = useCallback(async () => {
    try {
      const name = form.getFieldValue("name");
      const rollingNumber = form.getFieldValue("rollingNumber");
      const winnerNumber = form.getFieldValue("winnerNumber");
      const payload: CreateRewardData = {
        eventId: chooseEvent!.id,
        rewardName: name,
        rollingNumber,
        winnerNumber,
        createdAt: new Date().toISOString(),
      };
      await createAward(payload);
      const updatedRewardList = await getRewardList(chooseEvent!.id);
      setRewardList(updatedRewardList.data.data);
      setShowModal(false);
      toast.success("Tạo giải thưởng thành công");
    } catch (error: any) {
      toast.error("Tạo giải thưởng thất bại");
    }
  }, [rewardList, setRewardList, chooseEvent, form]);

  // handle search
  const handleSearchValue = (value: string) => {
    if (value.trim() === "") {
      // Reset to the original reward list when the search value is empty
      setRewardList(useAppStore.getState().rewardList || []);
      return;
    }

    const filteredRewards =
      rewardList?.filter((reward) => {
        return (
          reward.rewardName.includes(value) ||
          reward.status.includes(value) ||
          reward.rollingNumber === parseInt(value) ||
          reward.winnerNumber === parseInt(value)
        );
      }) || [];

    setRewardList(filteredRewards);
  };

  // handle one and many
  const handleDeleteReward = async (id: string) => {
    try {
      await deleteAward([id]);
      toast.success("Xóa giải thưởng thành công");
      const newRewardList = rewardList!.filter(
        (item) => item.id != parseInt(id)
      );
      setRewardList(newRewardList);
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      setShowModalConfirm(false);
    }
  };

  const handleDeleteAllRewards = async () => {
    try {
      const idsToDelete = rewardList!
        .map((item) => item.id.toString())
        .filter((id): id is string => id !== undefined);
      await deleteAward(idsToDelete);
      toast.success("Xóa danh sách giải thưởng thành công");
      setRewardList([]);
      setShowModalConfirm(false);
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      setShowModalConfirm(false);
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
      render: (_, record) => (
        <Popconfirm
          color="danger"
          title="Xóa giải thưởng"
          description="Bạn có chắc muốn xóa giải thưởng này không?"
          onConfirm={() => handleDeleteReward(record.id!.toString())}
          okText="Có"
          cancelText="Không"
        >
          <Button type="primary" danger style={{ fontWeight: "bold" }}>
            <ImCross /> Xóa
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
            icon={<FaPlus />}
            onClick={() => setShowModal(true)}
          >
            Tạo mới
          </Button>
          <Button
            className={style["button__add"]}
            color="danger"
            variant="solid"
            icon={<ImCross />}
            onClick={() => setShowModalConfirm(true)}
          >
            Xoá tất cả
          </Button>
        </div>
        {/* search */}
        <Search
          className={style["search__input"]}
          onChange={(e) => handleSearchValue(e.target.value)}
        />
      </div>
      {/* table */}
      <AntDCustomTable
        columns={columns}
        dataSource={rewardList as RewardData[]}
      />
      <Modal
        onCancel={() => {
          setShowModal(false);
        }}
        open={showModal}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Hủy
          </Button>,
          <Button type="primary" onClick={() => handleCreatePrize()}>
            Tạo
          </Button>,
        ]}
      >
        <Form form={form} labelCol={{ span: 24 }} style={{ rowGap: "16px" }}>
          <h2 style={{ textAlign: "center" }}>Tạo giải thưởng</h2>
          <Form.Item
            name="name"
            label="Tên giải"
            style={{ marginBottom: "16px" }}
          >
            <Input placeholder="Nhập tên giải" />
          </Form.Item>
          <Form.Item
            name="rollingNumber"
            label="Thứ tự lần quay"
            style={{ marginBottom: "16px" }}
          >
            <Input placeholder="Thứ tự lần quay" />
          </Form.Item>
          <Form.Item
            name="winnerNumber"
            label="Số người trúng/lần quay"
            style={{ marginBottom: "16px" }}
          >
            <Input placeholder="Nhập số người trúng" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal for confirm delete awards */}
      <Modal
        onCancel={() => {
          setShowModalConfirm(false);
        }}
        open={showModalConfirm}
        footer={[
          <div
            style={{ display: "flex", justifyContent: "center", gap: "12px" }}
          >
            <Button
              key="back"
              onClick={() => {
                setShowModalConfirm(false);
              }}
            >
              Hủy
            </Button>
            <Button type="primary" onClick={() => handleDeleteAllRewards()}>
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
            Bạn có chắc muốn xóa toàn bộ danh sách giải thưởng không?
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PrizeMangement;
