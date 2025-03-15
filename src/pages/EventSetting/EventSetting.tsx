import type { CheckboxProps, ColorPickerProps, GetProp } from "antd";
import {
  Button,
  Checkbox,
  Col,
  ColorPicker,
  Divider,
  Image,
  Modal,
  Row,
  Typography,
  Upload,
} from "antd";
import { ColumnType } from "antd/es/table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaCheck, FaWrench } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";
import AntDCustomTable from "../../components/cTableAntD/cTableAntD";
import { getConfigureEvent } from "../../service/event/api";
import useAppStore from "../../store/useAppStore";
import style from "./EventSetting.module.scss";

type Color = Extract<
  GetProp<ColorPickerProps, "value">,
  string | { cleared: any }
>;
const EventSetting = () => {
  // information for checkbox
  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const [settingEventData, setSettingEventData] = useState(null);
  const { chooseEvent } = useAppStore((state) => state);
  const eventID = chooseEvent?.id;
  const [colorBg, setColorBg] = useState<Color>("#1677ff");
  const [colorButton, setColorButton] = useState<Color>("#1677ff");
  const [colorDigit, setColorDigit] = useState<Color>("#1677ff");
  const [colorText, setColorText] = useState<Color>("#1677ff");

  const bgColor = useMemo<string>(
    () => (typeof colorBg === "string" ? colorBg : colorBg!.toHexString()),
    [colorBg]
  );

  const btnStyle: React.CSSProperties = {
    backgroundColor: bgColor,
    color: "white",
    border: "none",
    width: "100%",
    height: "40px",
    marginTop: "2px",
  };

  const bgColorButton = useMemo<string>(
    () =>
      typeof colorButton === "string"
        ? colorButton
        : colorButton!.toHexString(),
    [colorButton]
  );

  const btnStyleColorButton: React.CSSProperties = {
    backgroundColor: bgColorButton,
    color: "white",
    border: "none",
    width: "100%",
    height: "40px",
    marginTop: "2px",
  };

  const bgColorDigit = useMemo<string>(
    () =>
      typeof colorDigit === "string" ? colorDigit : colorDigit!.toHexString(),
    [colorDigit]
  );

  const btnStyleColorDigit: React.CSSProperties = {
    backgroundColor: bgColorDigit,
    color: "white",
    border: "none",
    width: "100%",
    height: "40px",
    marginTop: "2px",
  };

  const bgColorText = useMemo<string>(
    () =>
      typeof colorText === "string" ? colorText : colorText!.toHexString(),
    [colorText]
  );

  const btnStyleColorText: React.CSSProperties = {
    backgroundColor: bgColorText,
    color: "white",
    border: "none",
    width: "100%",
    height: "40px",
    marginTop: "2px",
  };

  // information for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenShow, setIsModalOpenShow] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [logoImage, setLogoImage] = useState<string | null>(null);

  // Handle file upload
  // const handleUpload = (info: any, setImage: any) => {
  //   if (info.file.status === "done") {
  //     setImage(URL.createObjectURL(info.file.originFileObj));
  //   }
  // };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showModalShow = () => {
    setIsModalOpenShow(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleOKShow = () => {
    setIsModalOpenShow(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelShow = () => {
    setIsModalOpenShow(false);
  };

  const fetchEventSetting = useCallback(async () => {
    try {
      const res = await getConfigureEvent(eventID!);
      const data = res.data.data;
      setSettingEventData(data);
    } catch (error) {
      toast.error("Lỗi khi lấy cấu hình sự kiện");
    }
  }, [eventID]);

  const transformedData = settingEventData ? [settingEventData] : [];

  useEffect(() => {
    //get slot count from zustand participant list

    fetchEventSetting();
  }, [fetchEventSetting]);

  const firstColumn: ColumnType[] = [
    {
      title: "Logo",
      dataIndex: "logo",
      render: (_, record) => <Image width={50} src={record.logo} />,
    },
    {
      title: "Hình nền",
      dataIndex: "backgroundImage",
      render: (_, record) => <Image width={100} src={record.backgroundImage} />,
    },
    // Trường này ko ảnh hưởng gì (cân nhắc xóa)
    {
      title: "Màu nền",
      dataIndex: "backgroundColor",
      render: (_, record) => (
        <div
          style={{
            backgroundColor: record.backgroundColor,
          }}
          className={style["color__opt"]}
        ></div>
      ),
    },
    {
      title: "Màu nút bấm",
      dataIndex: "buttonColor",
      render: (_, record) => (
        <div
          style={{
            backgroundImage: record.buttonColor,
            backgroundColor: record.buttonColor,
          }}
          className={style["color__opt"]}
        ></div>
      ),
    },
    {
      title: "Màu nền các số",
      dataIndex: "numberBackgroundColor",
      render: (_, record) => (
        <div
          style={{
            backgroundImage: record.numberBackgroundColor,
            backgroundColor: record.numberBackgroundColor,
          }}
          className={style["color__opt"]}
        ></div>
      ),
    },
    {
      title: "Màu chữ",
      dataIndex: "textColor",
      render: (_, record) => (
        <div
          style={{
            backgroundColor: record.textColor,
          }}
          className={style["color__opt"]}
        ></div>
      ),
    },
    {
      title: "",
      dataIndex: "setting",
      render: () => (
        <Button
          icon={<FaWrench />}
          className={style["setting__opt"]}
          color="danger"
          variant="solid"
          onClick={showModalShow}
        >
          Cài đặt
        </Button>
      ),
    },
  ];

  const secondColumn: ColumnType[] = [
    {
      title: "Hiển thị hình nền",
      dataIndex: "showBackground",
      render: (_, record) => (
        <>
          {record.showBackground === true ? (
            <FaCheck color="green" size={25} style={{ margin: "auto" }} />
          ) : (
            <ImCross color="red" size={25} style={{ margin: "auto" }} />
          )}
        </>
      ),
    },
    {
      title: "Hiển thị logo",
      dataIndex: "showLogo",
      render: (_, record) => (
        <>
          {record.showLogo === true ? (
            <FaCheck color="green" size={25} style={{ margin: "auto" }} />
          ) : (
            <ImCross color="red" size={25} style={{ margin: "auto" }} />
          )}
        </>
      ),
    },
    {
      title: "Hiển thị tên sự kiện",
      dataIndex: "showEventName",
      render: (_, record) => (
        <>
          {record.showEventName === true ? (
            <FaCheck color="green" size={25} style={{ margin: "auto" }} />
          ) : (
            <ImCross color="red" size={25} style={{ margin: "auto" }} />
          )}
        </>
      ),
    },
    {
      title: "",
      dataIndex: "setting",
      render: () => (
        //  render modal here
        <Button
          icon={<FaWrench />}
          className={style["setting__opt"]}
          color="danger"
          variant="solid"
          onClick={showModal}
        >
          Cài đặt
        </Button>
      ),
    },
  ];

  const thirdColumn: ColumnType[] = [
    {
      title: "Số lượng ô",
      dataIndex: "numberOfSlots",
    },
    {
      title: "Loại quay số",
      dataIndex: "spinCategory",
    },
  ];

  return (
    <div className={style["container"]}>
      <div className={style["wrapper"]}>
        <p className={style["title"]}>Cài đặt trình bày</p>
        <Divider className={style["divider"]} />
        <AntDCustomTable
          columns={firstColumn}
          dataSource={transformedData}
          isSort={false}
          isPagination={false}
        />
      </div>
      <div className={style["wrapper"]}>
        <p className={style["title"]}>Cài đặt hiển thị</p>
        <Divider className={style["divider"]} />
        <AntDCustomTable
          columns={secondColumn}
          dataSource={transformedData}
          isSort={false}
          isPagination={false}
        />
      </div>
      <div className={style["wrapper"]}>
        <p className={style["title"]}>Kiểu quay số</p>
        <Divider className={style["divider"]} />
        <AntDCustomTable
          columns={thirdColumn}
          dataSource={transformedData}
          isSort={false}
          isPagination={false}
        />
      </div>
      {/*display setting modal */}
      <Modal
        title="CÀI ĐẶT HIỂN THỊ"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <hr></hr>
        <div className={style["display__setting"]}>
          <Checkbox style={{ fontSize: "20px" }} onChange={onChange}>
            Hiển thị hình nền
          </Checkbox>
          <Checkbox style={{ fontSize: "20px" }} onChange={onChange}>
            Hiển thị logo công ty
          </Checkbox>
          <Checkbox style={{ fontSize: "20px" }} onChange={onChange}>
            Hiển thị tên sự kiên
          </Checkbox>
        </div>
        <div className={style["display__setting__button"]}>
          <Button
            type="primary"
            style={{ backgroundColor: "#c82333" }}
            onClick={handleCancel}
          >
            Đóng
          </Button>
          <Button
            type="primary"
            onClick={handleOk}
            style={{
              backgroundColor: "rgb(21, 120, 21)",
              borderColor: "#28a745",
            }}
          >
            Xác nhận
          </Button>
        </div>
      </Modal>
      {/* modal for CÀI ĐẶT TRÌNH BÀY */}
      <Modal
        open={isModalOpenShow}
        onOk={handleOKShow}
        onCancel={handleCancelShow}
        footer={null}
        centered
        width={600}
      >
        <Typography.Title level={4}>CÀI ĐẶT TRÌNH BÀY</Typography.Title>

        <hr></hr>

        {/* Image Upload Sections */}
        <Row gutter={16} style={{ marginBottom: 16, marginTop: 10 }}>
          <Col span={16}>
            <Typography.Text>
              Ảnh nền (Kích thước khuyến nghị: 1920px X 1080px. Dung lượng {"≤"}{" "}
              5Mb)
            </Typography.Text>
            <Upload
              showUploadList={false}
              customRequest={({ file, onSuccess }) => {
                if (file && onSuccess) {
                  setTimeout(() => onSuccess("ok"), 1000);
                  setBackgroundImage(URL.createObjectURL(file as Blob));
                }
              }}
            >
              <Button style={{ marginLeft: "10px" }}>Chọn ảnh</Button>
            </Upload>
          </Col>
          <Col span={8}>
            {backgroundImage && (
              <img
                src={backgroundImage}
                alt="Background"
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
            )}
          </Col>
        </Row>

        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={16}>
            <Typography.Text>
              Logo công ty (Kích thước khuyến nghị: 250px X 250px. Dung lượng{" "}
              {"≤"} 5Mb)
            </Typography.Text>
            <Upload
              showUploadList={false}
              customRequest={({ file, onSuccess }) => {
                if (file && onSuccess) {
                  setTimeout(() => onSuccess("ok"), 1000);
                  setLogoImage(URL.createObjectURL(file as Blob));
                }
              }}
            >
              <Button style={{ marginLeft: "10px" }}>Chọn ảnh</Button>
            </Upload>
          </Col>
          <Col span={8}>
            {logoImage && (
              <img
                src={logoImage}
                alt="Logo"
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
            )}
          </Col>
        </Row>

        {/* Color Picker Sections */}
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <Typography.Text>Màu nền</Typography.Text>
            <ColorPicker showText value={colorBg} onChange={setColorBg}>
              <Button style={btnStyle}>{bgColor.toUpperCase()}</Button>
            </ColorPicker>
          </Col>
          <Col span={12}>
            <Typography.Text>Màu chữ</Typography.Text>
            <ColorPicker showText value={colorText} onChange={setColorText}>
              <Button style={btnStyleColorText}>
                {bgColorText.toUpperCase()}
              </Button>
            </ColorPicker>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <Typography.Text>Màu nút bấm</Typography.Text>
            <ColorPicker showText value={colorButton} onChange={setColorButton}>
              <Button style={btnStyleColorButton}>
                {bgColorButton.toUpperCase()}
              </Button>
            </ColorPicker>
          </Col>
          <Col span={12}>
            <Typography.Text>Màu nền các số</Typography.Text>
            <ColorPicker showText value={colorDigit} onChange={setColorDigit}>
              <Button style={btnStyleColorDigit}>
                {bgColorDigit.toUpperCase()}
              </Button>
            </ColorPicker>
          </Col>
        </Row>

        {/* Action Buttons */}
        <div style={{ textAlign: "right", marginTop: 16 }}>
          <Button
            type="primary"
            style={{
              backgroundColor: "#c82333",
              color: "#fff",
              marginRight: 8,
            }}
            onClick={handleCancelShow}
          >
            Đóng
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "rgb(21, 120, 21)" }}
            onClick={handleOKShow}
          >
            Lưu
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default EventSetting;
