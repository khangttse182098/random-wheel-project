import { Button, Form, Input, Modal } from "antd";
import { ImCross } from "react-icons/im";
import style from "./PrizeMangement.module.scss";
import { FaPlus } from "react-icons/fa";
import Search from "antd/es/input/Search";
import AntDCustomTable from "../../components/cTableAntD/cTableAntD";
import { ColumnType } from "antd/es/table";
import useAppStore from "../../store/useAppStore";
import { CreateRewardData, RewardData } from "../../models/reward";
import { toast } from "react-toastify";
import { useCallback, useState } from "react";
import { createAward } from "../../service/event/api";

const PrizeMangement = () => {
  const [form] = Form.useForm();
  const { rewardList, setRewardList } = useAppStore.getState();
  const { chooseEvent } = useAppStore((state) => state);

  const [showModal, setShowModal] = useState<boolean>(false);

  
  const handleCreatePrize = useCallback(async () => {
    try {
      const name = form.getFieldValue("name");
      const rollingNumber = form.getFieldValue("rollingNumber");
      const winnerNumber = form.getFieldValue("winnerNumber");
      const payload: CreateRewardData = {
        eventId: chooseEvent!.id,
        name,
        rollingNumber,
        winnerNumber,
        createdAt: new Date().toISOString(),
      };
      await createAward(payload);
      setShowModal(false);
      toast.success("Tạo giải thưởng thành công");
    } catch (error: any) {
      toast.error("Tạo giải thưởng thất bại");
    }
  }, [rewardList, setRewardList, chooseEvent, form]);

  // handle search
  const handleSearchValue = (value: string) => {
    if (value.trim() === '') {
      // Reset to the original reward list when the search value is empty
      setRewardList(useAppStore.getState().rewardList || []);
      return;
    }
  
    const filteredRewards = rewardList?.filter((reward) => {
      return reward.rewardName.includes(value) 
        || reward.status.includes(value) 
        || reward.rollingNumber === parseInt(value) 
        || reward.winnerNumber === parseInt(value);
    }) || [];
  
    setRewardList(filteredRewards);
      
  }

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
            onClick={() => setShowModal(true)}
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
        <Search className={style["search__input"]} onChange={(e) => handleSearchValue(e.target.value)}/>
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
    </div>
  );
};

export default PrizeMangement;
