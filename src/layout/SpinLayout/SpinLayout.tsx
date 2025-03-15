import { useEffect } from "react";
import SpinPage from "../../pages/SpinPage/SpinPage";
import useAppStore from "../../store/useAppStore";
import style from "./SpinLayout.module.scss";
import { useNavigate } from "react-router";

const SpinLayout = () => {
  const { eventSetting, user } = useAppStore.getState();
  const navigate = useNavigate();
  useEffect(() => {
    if (user.password == "" || user.userName == "") {
      navigate("/", {
        replace: true,
        state: { error: "Bạn cần đăng nhập!" },
      });
    }
  }, [user, navigate]);

  if (user.password == "" || user.userName == "") {
    return null;
  }
  return (
    <div
      className={style["page-container"]}
      style={
        {
          "--bg": `url(${eventSetting?.backgroundImage})`,
        } as React.CSSProperties
      }
    >
      <SpinPage />
    </div>
  );
};

export default SpinLayout;
