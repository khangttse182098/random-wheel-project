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
    if (!chooseEvent && (user.password == "" || user.userName == "")) {
      navigate("/home/event-manage", {
        replace: true,
      });
    }
    console.log(chooseEvent);
  }, [chooseEvent, navigate, user]);

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
