import type { ColorPickerProps, GetProp } from "antd";
import {
  Button,
  Checkbox,
  Col,
  ColorPicker,
  Divider,
  Form,
  Image,
  Modal,
  Row,
  Spin,
  Typography,
  Upload,
} from "antd";
import { ColumnType } from "antd/es/table";
import { useMemo, useState } from "react";
import { FaCheck, FaWrench } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";
import AntDCustomTable from "../../components/cTableAntD/cTableAntD";
import { UpdateEventSettingData } from "../../models/eventSetting";
import { updateEventSetting } from "../../service/event/api";
import { uploadImage } from "../../service/imageUpload/api"; // Import the uploadImage function
import useAppStore from "../../store/useAppStore";
import style from "./EventSetting.module.scss";

type Color = Extract<
  GetProp<ColorPickerProps, "value">,
  string | { cleared: any }
>;
const EventSetting = () => {
  const { eventSetting, setEventSetting } = useAppStore((state) => state);

  // information for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenShow, setIsModalOpenShow] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showModalShow = () => {
    setIsModalOpenShow(true);
    setBackgroundImage(eventSetting?.backgroundImage || null);
    setLogoImage(eventSetting?.logo || null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelShow = () => {
    setIsModalOpenShow(false);
  };

  const handleUpload = async (file: File, setImage: (url: string) => void) => {
    try {
      setIsLoadingImage((prev) => !prev);
      const result = await uploadImage(file);
      setImage(result.secure_url);
      setIsLoadingImage((prev) => !prev);
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Image upload failed");
    }
  };

  const transformedData = eventSetting ? [eventSetting] : [];

  // -------------------------------------- Phần Cài đặt trình bày ---------------------------------------
  const [colorBg, setColorBg] = useState<Color>(eventSetting!.backgroundColor);
  const [colorButton, setColorButton] = useState<Color>(
    eventSetting!.buttonColor
  );
  const [colorDigit, setColorDigit] = useState<Color>(
    eventSetting!.numberBackgroundColor
  );
  const [colorText, setColorText] = useState<Color>(eventSetting!.textColor);
  const extractColorsFromGradient = (gradient: string): string[] => {
    const regex = /#([0-9a-f]{3,6})/gi;
    return gradient.match(regex) || [];
  };

  // Màu nền
  const bgColor = useMemo<string>(
    () => (typeof colorBg === "string" ? colorBg : colorBg.toHexString()),
    [colorBg]
  );
  const btnStyle: React.CSSProperties = {
    backgroundColor: bgColor,
    color: "black",
    border: "variant",
    width: "100%",
    height: "40px",
    marginTop: "2px",
  };

  // Màu nút bấm
  const bgColorButton = useMemo<string>(
    () =>
      typeof colorButton === "string"
        ? colorButton
        : colorButton!.toHexString(),
    [colorButton]
  );
  const btnStyleColorButton: React.CSSProperties = useMemo(() => {
    const isGradient = bgColorButton.startsWith("linear-gradient");
    return {
      backgroundImage: isGradient ? bgColorButton : undefined,
      backgroundColor: isGradient ? undefined : bgColorButton,
      color: "white",
      border: "variant",
      width: "100%",
      height: "40px",
      marginTop: "2px",
    };
  }, [bgColorButton]);
  const buttonColors = useMemo<string[]>(
    () => extractColorsFromGradient(bgColorButton),
    [bgColorButton]
  );

  // Màu nền các số
  const bgColorDigit = useMemo<string>(
    () =>
      typeof colorDigit === "string" ? colorDigit : colorDigit!.toHexString(),
    [colorDigit]
  );
  const btnStyleColorDigit: React.CSSProperties = useMemo(() => {
    const isGradient = bgColorDigit.startsWith("linear-gradient");
    return {
      backgroundImage: isGradient ? bgColorDigit : undefined,
      backgroundColor: isGradient ? undefined : bgColorDigit,
      color: "white",
      border: "variant",
      width: "100%",
      height: "40px",
      marginTop: "2px",
    };
  }, [bgColorDigit]);
  const btnDigitColors = useMemo<string[]>(
    () => extractColorsFromGradient(bgColorDigit),
    [bgColorDigit]
  );

  // Màu chữ
  const bgColorText = useMemo<string>(
    () =>
      typeof colorText === "string" ? colorText : colorText!.toHexString(),
    [colorText]
  );
  const btnStyleColorText: React.CSSProperties = {
    backgroundColor: bgColorText,
    color: "black",
    border: "variant",
    width: "100%",
    height: "40px",
    marginTop: "2px",
  };
  // ----------------------------------------------------------------------------------------------------

  // -------------------------------------- Phần Cài đặt hiển thị ---------------------------------------
  const [showBackground, setShowBackground] = useState<boolean>(
    eventSetting!.showBackground
  );
  const [showLogo, setShowLogo] = useState<boolean>(eventSetting!.showLogo);
  const [showEventName, setShowEventName] = useState<boolean>(
    eventSetting!.showEventName
  );
  // ----------------------------------------------------------------------------------------------------

  // ----------------------------------------- Phần update ----------------------------------------------
  const handleUpdateEventSetting = async () => {
    try {
      const payload: UpdateEventSettingData = {
        logo: logoImage || eventSetting!.logo,
        backgroundImage: backgroundImage || eventSetting!.backgroundImage,
        backgroundColor: bgColor,
        buttonColor: bgColorButton,
        numberBackgroundColor: bgColorDigit,
        textColor: bgColorText,
        showBackground,
        showLogo,
        showEventName,
      };

      setEventSetting({ ...eventSetting!, ...payload });
      await updateEventSetting(eventSetting!.id, payload);
      toast.success("Cập nhật cấu hình sự kiện thành công");
    } catch (error) {
      toast.error("Lỗi khi cấu hình sự kiện");
    }
  };

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
        onCancel={handleCancel}
        footer={null}
      >
        <hr></hr>
        <div className={style["display__setting"]}>
          <Checkbox
            style={{ fontSize: "20px" }}
            defaultChecked={showBackground}
            onChange={(e) => setShowBackground(e.target.checked)}
          >
            Hiển thị hình nền
          </Checkbox>
          <Checkbox
            style={{ fontSize: "20px" }}
            defaultChecked={showLogo}
            onChange={(e) => setShowLogo(e.target.checked)}
          >
            Hiển thị logo công ty
          </Checkbox>
          <Checkbox
            style={{ fontSize: "20px" }}
            defaultChecked={showEventName}
            onChange={(e) => setShowEventName(e.target.checked)}
          >
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
            onClick={() => {
              handleUpdateEventSetting();
              setIsModalOpen(false);
            }}
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
        onCancel={handleCancelShow}
        footer={null}
        centered
        width={600}
      >
        <Typography.Title level={4}>CÀI ĐẶT TRÌNH BÀY</Typography.Title>

        <hr></hr>

        {isLoadingImage ? (
          <Spin
            style={{
              position: "absolute",
              marginLeft: "480px",
              marginTop: "70px",
            }}
          />
        ) : null}
        {/* Image Upload Sections */}
        <Row gutter={16} style={{ marginBottom: 16, marginTop: 10 }}>
          <Col span={16}>
            <Typography.Text>
              Ảnh nền (Kích thước khuyến nghị: 1920px X 1080px. Dung lượng {"≤"}{" "}
              5Mb)
            </Typography.Text>
            <Form.Item name="backgroundImage">
              <Upload
                showUploadList={false}
                customRequest={({ file }) =>
                  handleUpload(file as File, setBackgroundImage)
                }
              >
                <Button style={{ marginLeft: "10px" }}>Chọn ảnh</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={8}>
            {backgroundImage && (
              <Image
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
            <Form.Item name="logo">
              <Upload
                showUploadList={false}
                customRequest={({ file }) =>
                  handleUpload(file as File, setLogoImage)
                }
              >
                <Button style={{ marginLeft: "10px" }}>Chọn ảnh</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={8}>
            {logoImage && (
              <Image
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
            <ColorPicker
              showText
              value={colorBg}
              onChange={(value) => setColorBg(value)}
            >
              <Button style={btnStyle}>{bgColor.toUpperCase()}</Button>
            </ColorPicker>
          </Col>
          <Col span={12}>
            <Typography.Text>Màu chữ</Typography.Text>
            <Form.Item name="colorText">
              <ColorPicker
                showText
                value={colorText}
                onChange={(value) => setColorText(value)}
              >
                <Button style={btnStyleColorText}>
                  {bgColorText.toUpperCase()}
                </Button>
              </ColorPicker>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <Typography.Text>Màu nút bấm</Typography.Text>
            <ColorPicker showText value={colorButton} onChange={setColorButton}>
              <Button style={btnStyleColorButton}>
                {buttonColors.join(" & ").toUpperCase()}
              </Button>
            </ColorPicker>
          </Col>
          <Col span={12}>
            <Typography.Text>Màu nền các số</Typography.Text>
            <ColorPicker showText value={colorDigit} onChange={setColorDigit}>
              <Button style={btnStyleColorDigit}>
                {btnDigitColors.join(" & ").toUpperCase()}
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
            onClick={() => {
              handleUpdateEventSetting();
              setIsModalOpenShow(false);
            }}
            disabled={isLoadingImage}
          >
            Lưu
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default EventSetting;
