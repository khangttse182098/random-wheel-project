import style from "./Header.module.scss";
import { TfiMenuAlt } from "react-icons/tfi";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router";

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style["header-content"]}>
        <h1 className={style["header-title"]}>PlusSpin</h1>
        <nav className={style["header-nav"]}>
          <NavLink
            to="/event-manage"
            className={({ isActive }) =>
              isActive ||
              window.location.pathname.includes("/event-setting") ||
              window.location.pathname.includes("/prize-manage") ||
              window.location.pathname.includes("/contestant-list") ||
              window.location.pathname.includes("/winner-list") ||
              window.location.pathname.includes("/spin-page")
                ? `${style["nav-link"]} ${style["active"]}`
                : style["nav-link"]
            }
          >
            <TfiMenuAlt />
            QUẢN LÝ SỰ KIỆN
          </NavLink>
          <NavLink
            to="/account-info"
            className={({ isActive }) =>
              isActive
                ? `${style["nav-link"]} ${style["active"]}`
                : style["nav-link"]
            }
          >
            <FaUser />
            THÔNG TIN TÀI KHOẢN
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
