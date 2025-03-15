import style from "./SignIn.module.scss";
import { Form, Input } from "antd";
import login from "../../../public/login.jpg";
import { useForm } from "antd/es/form/Form";
import { useCallback, useEffect } from "react";
import { LoginData } from "../../models/login";
import { loginFunction } from "../../service/auth/api";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import useAppStore from "../../store/useAppStore";

const SignIn = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAppStore.getState();

  //check if there is error message thrown out
  useEffect(() => {
    if (location.state?.error) {
      toast.error(location.state.error);

      // Clear the error from location.state
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const loginEvent = useCallback(async () => {
    try {
      const userName = form.getFieldValue("username");
      const password = form.getFieldValue("password");
      const payload: LoginData = {
        userName: userName,
        password: password,
      };
      console.log(payload);
      const response = await loginFunction(payload);
      if (response.data.code === 200) {
        //Show login success message
        toast.success("Đăng nhập thành công");

        //set user to zustand
        setUser(payload);

        form.resetFields();
        navigate("/event-manage");
      } else {
        toast.error("Tài khoản hoặc mật khẩu không đúng!");
      }
    } catch (error) {
      toast.error("Lỗi khi tạo sự kiện!");
    }
  }, [form]);

  return (
    <div className={style["container"]}>
      <div className={style["container__left"]}>
        <h2 className={style["container__title"]}>ĐĂNG NHẬP</h2>
        <Form form={form} labelCol={{ span: 24 }}>
          <Form.Item
            name="username"
            label={
              <span style={{ color: "#5a93d1", fontSize: "18px" }}>
                Tên người dùng <span className={style["must__field"]}> * </span>
              </span>
            }
          >
            <Input
              placeholder="Nhập vào tên người dùng"
              className={style["input"]}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={
              <span style={{ color: "#5a93d1", fontSize: "18px" }}>
                Mật khẩu <span className={style["must__field"]}> * </span>
              </span>
            }
          >
            <Input.Password
              placeholder="Nhập vào mật khẩu"
              className={style["input"]}
            />
          </Form.Item>
          <button
            type="submit"
            className={style["container__form__button"]}
            onClick={() => loginEvent()}
          >
            ĐĂNG NHẬP
          </button>
        </Form>
      </div>
      <div className={style["container__right"]}>
        <img src={login} alt="" className={style["image"]} />
      </div>
    </div>
  );
};

export default SignIn;
