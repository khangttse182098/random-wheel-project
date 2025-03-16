import { Button, Input, Modal, Popconfirm } from "antd";
import Search from "antd/es/input/Search";
import { ColumnType } from "antd/es/table";
import { useCallback, useRef, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { CiCircleAlert } from "react-icons/ci";
import { FaRegCheckCircle, FaRegFileExcel, FaRegSave } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdAutoDelete } from "react-icons/md";
import { toast } from "react-toastify";
import AntDCustomTable from "../../components/cTableAntD/cTableAntD";
import {
  CreateParticipantData,
  Participant,
  UpdateParticipantData,
} from "../../models/participant";
import {
  createParticipant,
  deleteParticipant,
  updateParticipant,
} from "../../service/participant/api";
import useAppStore from "../../store/useAppStore";
import { exportExcelTemplate } from "../../utils/excelTemplate";
import { importExcelFile } from "../../utils/excelUtil";
import style from "./ContestantList.module.scss";

const ContestantList = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  // const [participantData, setParticipantData] = useState<Participant[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingRecord, setEditingRecord] = useState<Participant | null>(null);
  const { chooseEvent, participantList, setParticipantList } = useAppStore(
    (state) => state
  );
  const eventID = chooseEvent?.id;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImportExcel = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const importedData = await importExcelFile<Participant>(file, (row) => ({
      code: String(row.getCell(1).value || ""),
      fullName: String(row.getCell(2).value || ""),
      department: String(row.getCell(3).value || ""),
    }));

    setParticipantList(importedData);
  };

  const handleExportTemplate = () => {
    exportExcelTemplate(
      "Danh_sach_nguoi_tham_du",
      "Participants",
      [
        { key: "code", title: "Mã quay số", width: 20 },
        { key: "fullName", title: "Họ và tên", width: 30 },
        { key: "department", title: "Phòng ban", width: 25 },
      ],
      [
        { code: "PLS001", fullName: "Nguyễn Văn A", department: "Dev" },
        { code: "PLS002", fullName: "Trần Thị B", department: "Nhân sự" },
        { code: "PLS003", fullName: "Hoàng Văn C", department: "Dev" },
        { code: "PLS004", fullName: "Ngô Gia D", department: "Nhân sự" },
        { code: "PLS005", fullName: "Lê Hoàng E", department: "Tester" },
      ]
    );
  };

  // handle search
  const handleSearchValue = (value: string) => {
    if (value.trim() === '') {
      // Reset to the original participant list when the search value is empty
      setParticipantList(useAppStore.getState().participantList || []);
      return;
    }
    
    const filteredParticipants = participantList?.filter((participant) => {
      return participant.fullName.includes(value) 
        || participant.code.includes(value) 
        || participant.department.includes(value);
    }) || [];
  
    setParticipantList(filteredParticipants);
  }

  const handleSaveParticipantList = useCallback(async () => {
    if (participantList!.length === 0) {
      toast.info("Không có dữ liệu để lưu");
      return;
    }
    try {
      const savedData: CreateParticipantData[] = participantList!.map(
        (item) => ({
          code: item.code,
          fullName: item.fullName,
          department: item.department,
          status: true,
          eventId: eventID!,
        })
      );
      await createParticipant(savedData);
      toast.success("Lưu danh sách người tham dự thành công");
    } catch (error) {
      toast.error("Lỗi khi lưu danh sách người tham dự");
    }
  }, [participantList, eventID]);

  const handleDeleteParticipant = async (id: string) => {
    try {
      await deleteParticipant([id]);
      toast.success("Xóa người tham dự thành công");
      const newParticipantList = participantList!.filter(
        (item) => item.id != id
      );
      setParticipantList(newParticipantList);
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  };

  const handleDeleteAllParticipant = async () => {
    try {
      const idsToDelete = participantList!
        .map((item) => item.id)
        .filter((id): id is string => id !== undefined);
      await deleteParticipant(idsToDelete);
      toast.success("Xóa người tham dự thành công");
      setParticipantList([]);
      setShowModal(false);
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      setShowModal(false);
    }
  };

  const handleEditDetails = (record: Participant) => {
    setEditingKey(record.id!);
    setEditingRecord({ ...record });
  };

  const handleUpdateParticipant = useCallback(
    async (id: string) => {
      try {
        if (!editingRecord) {
          toast.error("Không có dữ liệu để cập nhật!");
          return;
        }

        const originalRecord = participantList!.find((item) => item.id === id);
        if (!originalRecord) return;

        // Chỉ lấy 3 trường cần cập nhật
        const payload: UpdateParticipantData = {
          code: originalRecord.code,
          fullName: originalRecord.fullName,
          department: originalRecord.department,
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

        //update participantList locally
        const newParticipantList = participantList!.map((item) => {
          if (item.id == id) return { ...item, ...payload };
          return item;
        });
        setParticipantList(newParticipantList);
      } catch (error) {
        toast.error("Lỗi khi cập nhật dữ liệu");
      }
    },
    [editingRecord, eventID, participantList, setParticipantList]
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
      render: (_, record) =>
        editingKey === record.id ? (
          <Input
            value={editingRecord?.code}
            onChange={(e) =>
              setEditingRecord((prev) =>
                prev ? { ...prev, code: e.target.value } : prev
              )
            }
          />
        ) : (
          <div>{record.code}</div>
        ),
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
      render: (_, record) =>
        editingKey === record.id ? (
          <Input
            value={editingRecord?.fullName}
            onChange={(e) =>
              setEditingRecord((prev) =>
                prev ? { ...prev, fullName: e.target.value } : prev
              )
            }
          />
        ) : (
          <div>{record.fullName}</div>
        ),
    },
    {
      title: "Phòng ban",
      dataIndex: "department",
      render: (_, record) =>
        editingKey === record.id ? (
          <Input
            value={editingRecord?.department}
            onChange={(e) =>
              setEditingRecord((prev) =>
                prev ? { ...prev, department: e.target.value } : prev
              )
            }
          />
        ) : (
          <div>{record.department}</div>
        ),
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
              onClick={() => handleUpdateParticipant(record.id!)}
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
              title="Xóa người tham dự"
              description="Bạn có chắc chắn muốn xóa người tham dự này?"
              onConfirm={() => handleDeleteParticipant(record.id!)}
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
            icon={<FaRegSave />}
            onClick={handleSaveParticipantList}
          >
            Lưu
          </Button>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleImportExcel}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <Button
            className={style["button__add"]}
            color="primary"
            variant="solid"
            icon={<FaRegFileExcel />}
            onClick={() => fileInputRef.current?.click()}
          >
            Import excel
          </Button>
          <Button
            className={style["button__add"]}
            color="primary"
            variant="solid"
            icon={<FaDownload />}
            onClick={handleExportTemplate}
          >
            Tải mẫu excel
          </Button>
          <Button
            onClick={() => setShowModal(true)}
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
      <AntDCustomTable columns={columns} dataSource={participantList!} />
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
            <Button type="primary" onClick={() => handleDeleteAllParticipant()}>
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
            Bạn có chắc muốn xóa toàn bộ danh sách người tham dự không?
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ContestantList;
