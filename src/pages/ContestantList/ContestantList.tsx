import { ImCross } from "react-icons/im";
import { FaDownload } from "react-icons/fa6";
import { FaRegCheckCircle, FaRegFileExcel } from "react-icons/fa";
import { ColumnType } from "antd/es/table";
import style from "./ContestantList.module.scss";
import { Button, Popconfirm } from "antd";
import { FaPlus } from "react-icons/fa";
import Search from "antd/es/input/Search";
import AntDCustomTable from "../../components/cTableAntD/cTableAntD";
import { useCallback, useEffect, useState } from "react";
import { Participant, UpdateParticipantData } from "../../models/participant";
import {
  getParticipantList,
  updateParticipant,
} from "../../service/participant/api";
import { toast } from "react-toastify";
import { AiOutlineEdit } from "react-icons/ai";
import { MdAutoDelete } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import useAppStore from "../../store/useAppStore";

const ContestantList = () => {
  const [participantData, setParticipantData] = useState<Participant[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingRecord, setEditingRecord] = useState<Participant | null>(null);
  const { chooseEvent } = useAppStore((state) => state);
  const eventID = chooseEvent?.id;

  const fetchParticipantList = useCallback(async () => {
    try {
      const res = await getParticipantList();
      const data = res.data.data;
      setParticipantData(data);
    } catch (error) {
      toast.error("Lỗi khi lấy danh sách người tham gia");
    }
  }, []);

  useEffect(() => {
    fetchParticipantList();
  }, []);

  const handleEditDetails = (record: Participant) => {
    setEditingKey(record.id);
    setEditingRecord({ ...record });
  };

  const handleUpdateParticipant = useCallback(
    async (id: string) => {
      try {
        if (!editingRecord) {
          toast.error("Không có dữ liệu để cập nhật!");
          return;
        }

        const originalRecord = participantData.find((item) => item.id === id);
        if (!originalRecord) return;

        // Chỉ lấy 3 trường cần cập nhật
        const payload: UpdateParticipantData = {
          code: originalRecord.code,
          fullName: originalRecord.fullName,
          department: originalRecord.department,
          status: originalRecord.status,
          eventId: eventID!,
        };

        if (editingRecord.code !== originalRecord.code) {
          payload.code = editingRecord.code;
        }
        if (editingRecord.fullName !== originalRecord.fullName) {
          payload.fullName = editingRecord.fullName;
        }
        if (editingRecord.department !== originalRecord.department) {
          payload.department = editingRecord.department;
        }
        if (editingRecord.status !== originalRecord.status) {
          payload.status = editingRecord.status;
        }

        if (Object.keys(payload).length === 0) {
          toast.info("Không có thay đổi nào để cập nhật.");
          setEditingKey(null);
          setEditingRecord(null);
          return;
        }

        await updateParticipant(id, payload);
        toast.success("Cập nhật người tham dự thành công");
        setEditingKey(null);
        setEditingRecord(null);
        fetchParticipantList();
      } catch (error) {
        toast.error("Lỗi khi cập nhật dữ liệu");
      }
    },
    [editingRecord, fetchParticipantList]
  );

  const handleCancelEdit = () => {
    setEditingKey(null);
  };

  const columns: ColumnType<Participant>[] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",

      render: (_: any, __: any, index: number) => index + 1,
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
      dataIndex: "department",
    },
    {
      title: "Chức năng",
      render: (_, record) =>
        editingKey === record.id ? (
          <div
            style={{ display: "flex", justifyContent: "center", gap: "12px" }}
          >
            <FaRegCheckCircle
              style={{ fontSize: "25px", color: "green", cursor: "pointer" }}
              onClick={() => handleUpdateParticipant(record.id)}
            />
            <IoIosCloseCircleOutline
              style={{ fontSize: "25px", color: "red", cursor: "pointer" }}
              onClick={handleCancelEdit}
            />
          </div>
        ) : (
          <div
            style={{ display: "flex", justifyContent: "center", gap: "12px" }}
          >
            <AiOutlineEdit
              size={30}
              style={{ color: "orange", cursor: "pointer" }}
              onClick={() => handleEditDetails(record)}
            />
            <Popconfirm
              title="Xóa lịch hẹn"
              description="Bạn có chắc chắn muốn xóa lịch hẹn này?"
              // onConfirm={() => handleDeleteTimeslot(record.time_slot_id)}
              okText="Có"
              cancelText="Không"
            >
              <MdAutoDelete
                style={{ cursor: "pointer" }}
                color="red"
                size={30}
              />
            </Popconfirm>
          </div>
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
      <AntDCustomTable columns={columns} dataSource={participantData} />
    </div>
  );
};

export default ContestantList;
