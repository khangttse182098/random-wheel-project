import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { ColumnType } from "antd/es/table";
import { FaWrench } from "react-icons/fa";
import AntDCustomTable from "../../components/cTableAntD/cTableAntD";
import { Button, Divider, Image, Modal } from "antd";
import style from "./EventSetting.module.scss";
import logoImg from "../../assets/logo.png";
import backgroundImg from "../../assets/background.jpg";
import { useState } from "react";
import SpinningWheel from "../../components/SpinningWheel/SpinningWheel";
import FlipCounter from "../../components/SpinningWheel/SpinningWheel";

const EventSetting = () => {
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
            backgroundColor: record.buttonColor,
          }}
          className={style["color__opt"]}
        ></div>
      ),
    },
    {
      title: "Màu nền các số",
      dataIndex: "numberColor",
      render: (_, record) => (
        <div
          style={{
            backgroundColor: record.numberColor,
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
        >
          Cài đặt
        </Button>
      ),
    },
  ];
  const firstData = [
    {
      logo: logoImg,
      backgroundImage: backgroundImg,
      backgroundColor: "white",
      buttonColor: "blue",
      numberColor: "red",
      textColor: "white",
    },
  ];

  const secondColumn: ColumnType[] = [
    {
      title: "Hiển thị hình nền",
      dataIndex: "isShowBackground",
      render: (_, record) => (
        <>
          {record.isShowBackground ? (
            <FaCheck color="green" size={25} style={{ margin: "auto" }} />
          ) : (
            <ImCross color="red" size={25} style={{ margin: "auto" }} />
          )}
        </>
      ),
    },
    {
      title: "Hiển thị logo",
      dataIndex: "isShowLogo",
      render: (_, record) => (
        <>
          {record.isShowLogo ? (
            <FaCheck color="green" size={25} style={{ margin: "auto" }} />
          ) : (
            <ImCross color="red" size={25} style={{ margin: "auto" }} />
          )}
        </>
      ),
    },
    {
      title: "Hiển thị tên sự kiện",
      dataIndex: "isShowEventName",
      render: (_, record) => (
        <>
          {record.isShowEventName ? (
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
        <Button
          icon={<FaWrench />}
          className={style["setting__opt"]}
          color="danger"
          variant="solid"
        >
          Cài đặt
        </Button>
      ),
    },
  ];

  const secondData = [
    {
      isShowBackground: true,
      isShowLogo: false,
      isShowEventName: false,
    },
  ];

  const thirdColumn: ColumnType[] = [
    {
      title: "Số lượng ô",
      dataIndex: "numberSize",
    },
    {
      title: "Loại quay số",
      dataIndex: "wheelType",
      render: (_, record) => {
        if (record.wheelType == 0) return <span>Bao gồm cả số và chữ</span>;
        else if (record.wheelType == 1) return <span>Chỉ bao gồm số</span>;
        else if (record.wheelType == 2) return <span>Chỉ bao gồm chữ</span>;
      },
    },
    {
      title: "Kiểu quay số",
      dataIndex: "spinningType",
      render: (_, record) => (
        <>{!record.spinningType ? "Quay từng chữ số" : "Quay tất cả chữ số"}</>
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
        >
          Cài đặt
        </Button>
      ),
    },
  ];

  const thirdData = [
    {
      numberSize: 5,
      wheelType: 0,
      spinningType: 0,
    },
  ];
  return (
    <div className={style["container"]}>
      <div className={style["wrapper"]}>
        <p className={style["title"]}>Cài đặt trình bày</p>
        <Divider className={style["divider"]} />
        <AntDCustomTable
          columns={firstColumn}
          dataSource={firstData}
          isSort={false}
          isPagination={false}
        />
      </div>
      <div className={style["wrapper"]}>
        <p className={style["title"]}>Cài đặt hiển thị</p>
        <Divider className={style["divider"]} />
        <AntDCustomTable
          columns={secondColumn}
          dataSource={secondData}
          isSort={false}
          isPagination={false}
        />
      </div>
      <div className={style["wrapper"]}>
        <p className={style["title"]}>Cài đặt kiểu quay số</p>
        <Divider className={style["divider"]} />
        <AntDCustomTable
          columns={thirdColumn}
          dataSource={thirdData}
          isSort={false}
          isPagination={false}
        />
      </div>
    </div>
  );
};

export default EventSetting;
