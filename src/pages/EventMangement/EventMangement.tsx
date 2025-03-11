import { Button } from "antd";
import AntDCustomTable from "../../components/cTableAntD/cTableAntD";
import { ColumnType } from "antd/es/table";
import style from "./EventMangement.module.scss";
import { FaPlus, FaRegCheckCircle } from "react-icons/fa";
import Search from "antd/es/input/Search";
import { ImCancelCircle } from "react-icons/im";
import { FaWrench } from "react-icons/fa";
import { useNavigate } from "react-router";
import useAppStore, { EventType } from "../../store/useAppStore";

const EventMangement = () => {
  const navigate = useNavigate();
  const { addChooseEvent } = useAppStore((state) => state);
  const columns: ColumnType[] = [
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
      dataIndex: "created_at",
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "expiry_date",
    },
    {
      title: "Chức năng",
      render: (_, record) => {
        const { status, index, ...eventData } = record;
        return (
          <div className={style["button__container"]}>
            <Button
              className={style["edit__button"]}
              color="green"
              variant="solid"
            >
              Link quay số
            </Button>
            <Button
              icon={<FaWrench />}
              className={style["edit__button"]}
              color="danger"
              variant="solid"
              onClick={() => {
                addChooseEvent(eventData as EventType);
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

  const dataSource = [
    {
      key: "1",
      name: "Sự kiện A",
      status: "active",
      created_at: "2025-01-01",
      expiry_date: "2025-12-31",
    },
    {
      key: "2",
      name: "Sự kiện B",
      status: "disabled",
      created_at: "2024-05-15",
      expiry_date: "2024-11-15",
    },
    {
      key: "3",
      name: "Sự kiện C",
      status: "active",
      created_at: "2025-03-01",
      expiry_date: "2025-06-01",
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
      <AntDCustomTable columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default EventMangement;
