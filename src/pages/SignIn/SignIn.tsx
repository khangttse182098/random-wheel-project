import style from "./SignIn.module.scss";
import { Input } from 'antd';
import login from "../../../public/login.jpg";

const SignIn = () => {
    return (
        <div className={style["container"]}>
            <div className={style["container__left"]}>
            <h2 className={style["container__title"]}>ĐĂNG NHẬP</h2>
                <form className={style["container__form"]}>
                    <div className={style["container__form__userName"]}>
                        <label>Tên người dùng <span className={style["must__field"]}>*</span></label>
                        <Input placeholder="Nhập vào tên người dùng" className={style["input"]}/>
                    </div>
                    <div className={style["container__form__password"]}>
                        <label>Mật khẩu <span className={style["must__field"]}>*</span> </label>
                        <Input placeholder="Nhập vào mật khẩu" className={style["input"]}/>
                    </div>
                    <button type="submit" className={style["container__form__button"]}>
                        ĐĂNG NHẬP
                    </button>
                </form>
            </div>
            <div className={style["container__right"]}>
                <img src={login} alt="" className={style["image"]}/>
            </div>
        </div>
    );
   
  };
  
export default SignIn;