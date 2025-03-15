import { useEffect } from "react";
import { FaGear } from "react-icons/fa6";
import { MdOutlineFactCheck } from "react-icons/md";
import { TfiMenuAlt } from "react-icons/tfi";
import { NavLink, Outlet, useNavigate } from "react-router";
import useAppStore from "../../store/useAppStore";
import style from "./EventMenu.module.scss";

const EventMenu = () => {
  const { chooseEvent, user } = useAppStore((state) => state);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.password == "" || user.userName == "") {
      console.log("Navigate to /");
      navigate("/", {
        replace: true,
        state: { error: "Bạn cần đăng nhập!" },
      });
      return;
    }

    if (!chooseEvent) {
      navigate("/event-manage", {
        replace: true,
        state: { error: "Bạn cần chọn sự kiện" },
      });
      return;
    }
  }, [user, navigate, chooseEvent]);

  // Prevent rendering if the user is not logged in or no event is selected
  if (user.password === "" || user.userName === "" || !chooseEvent) {
    return null; // Stop rendering the component
  }

  return (
    <div className={style["container"]}>
      <h1 className={style["title"]}>{chooseEvent?.name}</h1>
      <nav className={style["header-nav"]}>
        <NavLink
          to="/event-setting"
          className={({ isActive }) =>
            isActive
              ? `${style["nav-link"]} ${style["active"]}`
              : style["nav-link"]
          }
        >
          <FaGear />
          CÀI ĐẶT SỰ KIỆN
        </NavLink>
        <NavLink
          to="/prize-manage"
          className={({ isActive }) =>
            isActive
              ? `${style["nav-link"]} ${style["active"]}`
              : style["nav-link"]
          }
        >
          <MdOutlineFactCheck />
          QUẢN LÝ GIẢI QUAY
        </NavLink>
        <NavLink
          to="/contestant-list"
          className={({ isActive }) =>
            isActive
              ? `${style["nav-link"]} ${style["active"]}`
              : style["nav-link"]
          }
        >
          <TfiMenuAlt />
          DANH SÁCH NGƯỜI THAM DỰ
        </NavLink>
        <NavLink
          to="/winner-list"
          className={({ isActive }) =>
            isActive
              ? `${style["nav-link"]} ${style["active"]}`
              : style["nav-link"]
          }
        >
          <TfiMenuAlt />
          DANH SÁCH TRÚNG GIẢI
        </NavLink>
        <NavLink
          to="/spin-page"
          className={({ isActive }) =>
            isActive
              ? `${style["nav-link"]} ${style["active"]}`
              : style["nav-link"]
          }
        >
          <TfiMenuAlt />
          LINK QUAY SỐ
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default EventMenu;
