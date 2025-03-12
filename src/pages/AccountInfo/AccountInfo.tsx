import style from "./AccountInfo.module.scss";
import { HiPencilAlt } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { useState } from 'react';
import { Button, Modal, Input  } from 'antd';

const AccountInfo = () => {

  const [isModalOpenPassword, setIsModalOpenPassword] = useState(false);
  const [isModalOpenInformation, setIsModalOpenInformation] = useState(false);

  const showModalPassword = () => {
    setIsModalOpenPassword(true);
  };

  const handleOkPassword = () => {
    setIsModalOpenPassword(false);
  };

  const handleCancelPassword = () => {
    setIsModalOpenPassword(false);
  };

  const showModalInformation = () => {
    setIsModalOpenInformation(true);
  };

  const handleOkInformation = () => {
    setIsModalOpenInformation(false);
  };

  const handleCancelInformation = () => {
    setIsModalOpenInformation(false);
  };

  return (
    <div className={style["container"]}>
        <h2 className={style["title"]}>THÔNG TIN TÀI KHOẢN</h2>
        <div className={style["account__info"]}>
            <div className={style["left__panel"]}>
                <div className={style["info__box"]}>
                    <p><FaUser /> <strong>Tên người dùng:</strong> Lê Văn A</p>
                    <p><FaPhoneAlt /><strong>Số điện thoại:</strong> 0988777699</p>
                    <p><MdEmail/><strong>Email:</strong> example@email.com</p>
                    <p><FaLocationDot /><strong>Địa chỉ:</strong> Hà Nội, Việt Nam</p>
                </div>
                <div className={style["buttons"]}>
                    <button className={style["red__btn"]} onClick={showModalPassword}>
                      <HiPencilAlt style={{ marginRight: "4px" }}/>
                      Đổi mật khẩu
                      </button>
                    <button className={style["red__btn"]} onClick={showModalInformation}> <HiPencilAlt style={{ marginRight: "4px" }}/> 
                    Sửa thông tin</button>
                    <button className={style["yellow__btn"]}> <FaPhoneAlt style={{ marginRight: "4px" }} /> Yêu cầu hỗ trợ</button>
                </div>
            </div>
            <div className={style["right__panel"]}>
                <div className={style["support__box"]}>
                    <h3>Hướng dẫn sử dụng phần mềm quay số ngẫu nhiên</h3>
                    <div>
                        <p>1. <strong>Truy cập và tạo tài khoản:</strong></p>
                        <ul>
                            <li>Bước 1 : Truy cập vào trang web : user.xspin.vn</li>
                            <li>Bước 2 : Điền thông tin vào các trường dữ liệu và nhấn nút “ ĐĂNG KÝ”</li>
                            <li>Sau khi bạn đăng ký tài khoản, hệ thống sẽ tự động đăng nhập vào trang quản lý của bạn</li>
                        </ul>
                    </div>
                    <div>
                      <p>2. <strong>Tạo sự kiện</strong></p>
                      <ul>
                          <li>Bạn click vào menu "QUẢN LÝ SỰ KIỆN" để tạo một Quay số ngẫu nhiên</li>
                          <li>Nhập "Tên sự kiện"  và bấm nút “XÁC NHẬN”</li>
                          <li>Sau khi tạo xong sự kiện, bạn sẽ thấy tên sự kiện của mình nằm trong danh sách sự kiện mà bạn quản lý với đầy đủ chi tiết thông tin. Ở phần chức năng của mỗi sự kiện đều có 
                            2 button mà các bạn cần lưu ý</li>
                          <li>Nút "LINK QUAY SỐ": Sau khi cài đặt cấu hình theo ý muốn bạn bấm vào nút quay số để vào trang quay số chính thức cho khách hàng. Hệ thống có tạo sẵn dữ liệu thử nghiệm cho bạn 
                            có cái nhìn trực quan</li>
                          <li>Nút "CẤU HÌNH": Khi bạn bấm vào cấu hình, tất cả các thông tin tùy chỉnh theo yêu cầu của bạn có trong mục này bao gồm: Nâng cấp gói, cài đặt sự kiện, quản lý giải quay, 
                            danh sách khách hàng, danh sách trúng giải</li>
                      </ul>
                    </div>
                </div>
                
            </div>
        </div>
        {/* PASSWORD MODAL */}
        <Modal title="ĐỔI MẬT KHẨU" open={isModalOpenPassword} 
        onOk={handleOkPassword} 
        onCancel={handleCancelPassword} footer={null}>
          <hr></hr>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "15px" }}>
        <label>Nhập mật khẩu cũ</label>
        <Input.Password placeholder="Nhập mật khẩu cũ" />

        <label>Nhập mật khẩu mới</label>
        <Input.Password placeholder="Nhập mật khẩu mới" />

        <label>Nhập lại mật khẩu mới</label>
        <Input.Password placeholder="Nhập lại mật khẩu mới" />

        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
          <Button type="primary" style={{ backgroundColor: "#c82333" }} onClick={handleCancelPassword}>Đóng</Button>
          <Button type="primary" onClick={handleOkPassword} style={{ backgroundColor: "rgb(21, 120, 21)", borderColor: "#28a745" }}>
            Xác nhận
          </Button>
        </div>
      </div>
    </Modal>
    {/* INFORMATION MODAL */}
    <Modal title="CẬP NHẬT THÔNG TIN" open={isModalOpenInformation} onOk={handleOkInformation} onCancel={handleCancelInformation} footer={null}>
          <hr></hr>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "15px" }}>
        <label>Tên người dùng</label>
        <Input placeholder="Nhập tên người dùng mới" />

        <label>Số điện thoại</label>
        <Input placeholder="Nhập số điện thoại mới" />

        <label>Email</label>
        <Input  placeholder="Nhập email mới" />

        <label>Địa chỉ</label>
        <Input placeholder="Nhập địa chỉ mới" />

        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
          <Button type="primary" style={{ backgroundColor: "#c82333" }} onClick={handleCancelInformation}>Đóng</Button>
          <Button type="primary" onClick={handleOkInformation} style={{ backgroundColor: "rgb(21, 120, 21)", borderColor: "#28a745" }}>
            Xác nhận
          </Button>
        </div>
      </div>
    </Modal>
    </div>
  )
};

export default AccountInfo;
