import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import Search from "antd/es/input/Search";
import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FaPlus, FaRegCheckCircle, FaWrench } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import AntDCustomTable from "../../components/cTableAntD/cTableAntD";
import {
  CreateEventData,
  EventData,
  UpdateEventData,
} from "../../models/event";
import { addEvent, getEventList, updateEvent } from "../../service/event/api";
import useAppStore from "../../store/useAppStore";
import { formatDate } from "../../utils/dateUtils";
import style from "./EventMangement.module.scss";
import { useForm } from "antd/es/form/Form";
import { getParticipantList } from "../../service/participant/api";

const EventMangement = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [form] = useForm();
  const [eventData, setEventData] = useState<EventData[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingRecord, setEditingRecord] = useState<EventData | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { addChooseEvent, setParticipantList } = useAppStore((state) => state);

  //get event list
  const fetchEventList = useCallback(async () => {
    try {
      const res = await getEventList();
      const data = res.data.data;
      setEventData(data);
    } catch (error) {
      toast.error("Lỗi khi lấy danh sách sự kiện");
    }
  }, []);

  //get contestant list
  const fetchParticipantList = useCallback(
    async (eventID: string) => {
      try {
        const res = await getParticipantList(eventID!);
        const data = res.data.data;
        setParticipantList(data);
      } catch (error) {
        toast.error("Lỗi khi lấy danh sách người tham gia");
      }
    },
    [setParticipantList]
  );

  //load error if any
  useEffect(() => {
    if (location.state?.error) {
      toast.error(location.state.error);

      // Clear the error from location.state
      navigate(location.pathname, { replace: true, state: {} });
    }
    fetchEventList();
  });

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
          status: originalRecord.status,
        };

        if (editingRecord.name !== originalRecord.name) {
          payload.name = editingRecord.name;
        }
        if (editingRecord.expiryDate !== originalRecord.expiryDate) {
          payload.expiryDate = editingRecord.expiryDate;
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

  const handleCreateEvent = useCallback(async () => {
    try {
      const name = form.getFieldValue("name");
      const expiryDate = form.getFieldValue("expiryDate");
      const payload: CreateEventData = {
        name: name,
        createdAt: new Date().toISOString(),
        expiryDate: expiryDate.toISOString(),
      };
      await addEvent(payload);
      toast.success("Tạo sự kiện thành công!");
      setShowModal(false);
      fetchEventList();
      form.resetFields();
    } catch (error) {
      toast.error("Lỗi khi tạo sự kiện!");
    }
  }, [eventData]);

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
      render: (_, record) =>
        editingKey === record.id ? (
          <Input
            value={editingRecord?.name}
            onChange={(e) =>
              setEditingRecord((prev) =>
                prev ? { ...prev, name: e.target.value } : prev
              )
            }
          />
        ) : (
          <div>{record.name}</div>
        ),
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      render: (_, record) => {
        if (editingKey === record.id) {
          return (
            <Select
              value={editingRecord?.status}
              onChange={(value) =>
                setEditingRecord((prev) =>
                  prev ? { ...prev, status: value } : prev
                )
              }
            >
              <Select.Option value={true}>Hoạt động</Select.Option>
              <Select.Option value={false}>Tạm ngưng</Select.Option>
            </Select>
          );
        }

        // Hiển thị trạng thái với màu sắc và icon khi không chỉnh sửa
        let color = "#66a3ff";
        let text = "Hoạt động";
        let icon = <FaRegCheckCircle style={{ marginRight: "5px" }} />;

        if (record.status === false) {
          color = "#ff6666";
          text = "Tạm ngưng";
          icon = <IoIosCloseCircleOutline style={{ marginRight: "5px" }} />;
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
      render: (_, record) => formatDate(record.createdAt),
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "expiryDate",
      render: (_, record) =>
        editingKey === record.id ? (
          <DatePicker
            value={dayjs(editingRecord?.expiryDate)}
            format="DD/MM/YYYY"
            onChange={(time: any) =>
              setEditingRecord((prev) =>
                prev ? { ...prev, expiryDate: time } : prev
              )
            }
          />
        ) : (
          formatDate(record.expiryDate)
        ),
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
                  id: eventData.id,
                  name: eventData.name,
                  created_at: eventData.createdAt,
                  expiry_date: eventData.expiryDate,
                });
                fetchParticipantList(eventData.id);
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
          onClick={() => {
            setShowModal(true);
          }}
        >
          Tạo sự kiện
        </Button>
        {/* search */}
        <Search className={style["search__input"]} />
      </div>
      {/* table */}
      <AntDCustomTable columns={columns} dataSource={eventData} />
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
          <Button type="primary" onClick={() => handleCreateEvent()}>
            Tạo
          </Button>,
        ]}
      >
        <Form form={form} labelCol={{ span: 24 }} style={{ rowGap: "16px" }}>
          <Form.Item
            name="name"
            label="Tên sự kiện"
            style={{ marginBottom: "16px" }}
          >
            <Input placeholder="Nhập tên sự kiện" />
          </Form.Item>
          <Form.Item
            name="expiryDate"
            label="Ngày hết hạn"
            style={{ marginBottom: "16px" }}
          >
            <DatePicker
              format="DD/MM/YYYY"
              placeholder="Chọn ngày hết hạn"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EventMangement;
