import { Button, TimePicker } from "antd";
import Search from "antd/es/input/Search";
import { ColumnType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FaPlus, FaRegCheckCircle, FaWrench } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import AntDCustomTable from "../../components/cTableAntD/cTableAntD";
import { EventData, UpdateEventData } from "../../models/event";
import { getEventList, updateEvent } from "../../service/event/api";
import useAppStore from "../../store/useAppStore";
import { formatDate } from "../../utils/dateUtils";
import style from "./EventMangement.module.scss";
import dayjs from "dayjs";

const EventMangement = () => {
  const [eventData, setEventData] = useState<EventData[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingRecord, setEditingRecord] = useState<EventData | null>(null);
  const navigate = useNavigate();
  const { addChooseEvent } = useAppStore((state) => state);

  const fetchEventList = useCallback(async () => {
    try {
      const res = await getEventList();
      const data = res.data.data;
      setEventData(data);
    } catch (error) {
      toast.error("Lỗi khi lấy danh sách sự kiện");
    }
  }, []);

  useEffect(() => {
    fetchEventList();
  }, []);

  const handleUpdateEvent = useCallback(
    async (id: string) => {
      try {
        if (!editingRecord) {
          toast.error("Không có dữ liệu để cập nhật!");
          return;
        }

        const originalRecord = eventData.find((item) => item.id === id);
        if (!originalRecord) return;

        // Chỉ lấy 3 trường cần cập nhật
        const payload: UpdateEventData = {
          name: originalRecord.name,
          expiryDate: originalRecord.expiryDate,
          status: originalRecord.status === "Active" ? true : false,
        };

        if (editingRecord.name !== originalRecord.name) {
          payload.name = editingRecord.name;
        }
        if (editingRecord.expiryDate !== originalRecord.expiryDate) {
          payload.expiryDate = editingRecord.expiryDate;
        }
        if (editingRecord.status !== originalRecord.status) {
          payload.status = editingRecord.status === "Active" ? true : false;
        }

        if (Object.keys(payload).length === 0) {
          toast.info("Không có thay đổi nào để cập nhật.");
          setEditingKey(null);
          setEditingRecord(null);
          return;
        }

        await updateEvent(id, payload);
        toast.success("Cập nhật sự kiện thành công");
        setEditingKey(null);
        setEditingRecord(null);
        fetchEventList();
      } catch (error) {
        toast.error("Lỗi khi cập nhật dữ liệu");
      }
    },
    [editingRecord, fetchEventList]
  );

  const handleEditDetails = (record: EventData) => {
    setEditingKey(record.id);
    setEditingRecord({ ...record });
  };

  const handleCancelEdit = () => {
    setEditingKey(null);
  };

  const columns: ColumnType<EventData>[] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Tên sự kiện",
      dataIndex: "name",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      render: (_, record) => {
        let color = "#66a3ff";
        let text = "Đang hoạt động";
        let icon = <FaRegCheckCircle style={{ marginRight: "5px" }} />;
        if (record.status === "disabled") {
          color = "#ff6666";
          text = "Không hoạt động";
          icon = <ImCancelCircle style={{ marginRight: "5px" }} />;
        }
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              borderRadius: "8px",
              backgroundColor: color,
              color: "#fff",
              fontWeight: "bold",
              padding: "5px 10px",
              width: "fit-content",
              margin: "auto",
            }}
          >
            {icon}
            {text}
          </div>
        );
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (_, record) =>
        editingKey === record.createdAt ? (
          <TimePicker
            value={dayjs(editingRecord?.createdAt)}
            onChange={(time: any) =>
              setEditingRecord((prev) =>
                prev ? { ...prev, createdAt: time } : prev
              )
            }
          />
        ) : (
          formatDate(record.createdAt)
        ),
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "expiryDate",
      render: (_, record) => {
        return <div>{formatDate(record.expiryDate)}</div>;
      },
    },
    {
      title: "Chức năng",
      render: (_, record) => {
        const { status, ...eventData } = record;
        return (
          <div className={style["button__container"]}>
            <Button
              className={style["edit__button"]}
              color="green"
              variant="solid"
            >
              Link quay số
            </Button>
            {editingKey === record.id ? (
              <div style={{ display: "flex", gap: "12px" }}>
                <FaRegCheckCircle
                  style={{
                    fontSize: "25px",
                    color: "green",
                    cursor: "pointer",
                  }}
                  onClick={() => handleUpdateEvent(record.id)}
                />
                <IoIosCloseCircleOutline
                  style={{ fontSize: "25px", color: "red", cursor: "pointer" }}
                  onClick={handleCancelEdit}
                />
              </div>
            ) : (
              <div style={{ display: "flex", gap: "12px" }}>
                <AiOutlineEdit
                  size={30}
                  style={{ color: "orange", cursor: "pointer" }}
                  onClick={() => handleEditDetails(record)}
                />
              </div>
            )}
            <Button
              icon={<FaWrench />}
              className={style["edit__button"]}
              color="danger"
              variant="solid"
              onClick={() => {
                addChooseEvent({
                  name: eventData.name,
                  created_at: eventData.createdAt,
                  expiry_date: eventData.expiryDate,
                });
                navigate("/event-setting");
              }}
            >
              Cấu hình
            </Button>
          </div>
        );
      },
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
      <AntDCustomTable columns={columns} dataSource={eventData} />
    </div>
  );
};

export default EventMangement;
