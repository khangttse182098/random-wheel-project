import style from "./Header.module.scss";
import { TfiMenuAlt } from "react-icons/tfi";
import { FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style["header-content"]}>
        <h1 className={style["header-title"]}>PlusSpin</h1>
        <nav className={style["header-nav"]}>
          <a href="/event-manage" className={style["nav-link"]}>
            <TfiMenuAlt />
            QUẢN LÝ SỰ KIỆN
          </a>
          <a href="/account-info" className={style["nav-link"]}>
            <FaUser />
            THÔNG TIN TÀI KHOẢN
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
