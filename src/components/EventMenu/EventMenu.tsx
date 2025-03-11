import { useEffect } from "react";
import style from "./EventMenu.module.scss";
import { TfiMenuAlt } from "react-icons/tfi";
import { FaGear } from "react-icons/fa6";
import { MdOutlineFactCheck } from "react-icons/md";
import useAppStore from "../../store/useAppStore";
import { useNavigate } from "react-router";

const EventMenu = () => {
  const { chooseEvent } = useAppStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!chooseEvent) {
      navigate(-1);
    }
  }, [chooseEvent, navigate]);

  if (!chooseEvent) {
    return null; // or a loading spinner, or some other fallback UI
  }

  return (
    <div className={style["container"]}>
      <h1 className={style["title"]}>{chooseEvent?.name}</h1>
      <nav className={style["header-nav"]}>
        <a href="/event-setting" className={style["nav-link"]}>
          <FaGear />
          CÀI ĐẶT SỰ KIỆN
        </a>
        <a href="/prize-manage" className={style["nav-link"]}>
          <MdOutlineFactCheck />
          QUẢN LÝ GIẢI QUAY
        </a>
        <a href="/contestant-list" className={style["nav-link"]}>
          <TfiMenuAlt />
          DANH SÁCH NGƯỜI THAM DỰ
        </a>
        <a href="/winner-list" className={style["nav-link"]}>
          <TfiMenuAlt />
          DANH SÁCH TRÚNG GIẢI
        </a>
      </nav>
    </div>
  );
};

export default EventMenu;
