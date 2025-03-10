import style from "./EventMenu.module.scss";
import { TfiMenuAlt } from "react-icons/tfi";
import { FaGear } from "react-icons/fa6";
import { MdOutlineFactCheck } from "react-icons/md";

const EventMenu = () => {
  return (
    <div className={style["container"]}>
      <h1 className={style["title"]}>Sự kiện ABC</h1>
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
