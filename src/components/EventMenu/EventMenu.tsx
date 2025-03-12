import { useEffect } from "react";
import style from "./EventMenu.module.scss";
import { TfiMenuAlt } from "react-icons/tfi";
import { FaGear } from "react-icons/fa6";
import { MdOutlineFactCheck } from "react-icons/md";
import useAppStore from "../../store/useAppStore";
import { Link, Outlet, useNavigate } from "react-router";

const EventMenu = () => {
  const { chooseEvent } = useAppStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!chooseEvent) {
      navigate(-1);
    }
    console.log(chooseEvent);
  }, [chooseEvent, navigate]);

  return (
    <div className={style["container"]}>
      <h1 className={style["title"]}>{chooseEvent?.name}</h1>
      <nav className={style["header-nav"]}>
        <Link to="/event-setting" className={style["nav-link"]}>
          <FaGear />
          CÀI ĐẶT SỰ KIỆN
        </Link>
        <Link to="/prize-manage" className={style["nav-link"]}>
          <MdOutlineFactCheck />
          QUẢN LÝ GIẢI QUAY
        </Link>
        <Link to="/contestant-list" className={style["nav-link"]}>
          <TfiMenuAlt />
          DANH SÁCH NGƯỜI THAM DỰ
        </Link>
        <Link to="/winner-list" className={style["nav-link"]}>
          <TfiMenuAlt />
          DANH SÁCH TRÚNG GIẢI
        </Link>
        <Link to="/spin-page" className={style["nav-link"]}>
          <TfiMenuAlt />
          LINK QUAY SỐ
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default EventMenu;
