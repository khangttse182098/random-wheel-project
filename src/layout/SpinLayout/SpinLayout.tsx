import { useCallback, useEffect } from "react";
import SpinPage from "../../pages/SpinPage/SpinPage";
import useAppStore from "../../store/useAppStore";
import style from "./SpinLayout.module.scss";
import { useNavigate } from "react-router";

const SpinLayout = () => {
  const { eventSetting, user, setUser } = useAppStore((state) => state);
  const navigate = useNavigate();

  //navigate to login page if not login yet
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const userNameFromURL = searchParams.get("user");
    if (userNameFromURL && !user.userName) {
      setUser({ userName: userNameFromURL, password: "dummyPassword" }); // Replace with actual validation logic
    }

    if (!userNameFromURL && (user.password === "" || user.userName === "")) {
      navigate("/", { replace: true, state: { error: "Bạn cần đăng nhập!" } });
    }
  }, [user, navigate, setUser]);

  //render background image or background color conditionally
  const handleShowBackground = useCallback(() => {
    if (eventSetting?.showBackground) {
      return `url(${eventSetting?.backgroundImage})`;
    } else {
      return `url(${eventSetting?.backgroundColor})`;
    }
  }, [eventSetting]);

  //render nothing of have not login
  if (user.password == "" || user.userName == "") {
    return null;
  }

  return user.userName ? (
    <div
      className={style["page-container"]}
      style={
        {
          "--bg": handleShowBackground(),
        } as React.CSSProperties
      }
    >
      <SpinPage />
    </div>
  ) : null;
};

export default SpinLayout;
