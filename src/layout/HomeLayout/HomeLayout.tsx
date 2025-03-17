import Header from "../../components/Header/Header";
import { Outlet, useNavigate } from "react-router";
import useAppStore from "../../store/useAppStore";
import { useEffect } from "react";

const HomeLayout = () => {
  const { user } = useAppStore((state) => state);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.password == "" || user.userName == "") {
      navigate("/", {
        replace: true,
        state: { error: "Bạn cần đăng nhập!" },
      });
    }
  }, [user, navigate]);
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
