import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Outlet, useNavigate } from "react-router";
import useAppStore from "../../store/useAppStore";
import { useEffect } from "react";

const HomeLayout = () => {
  const { user } = useAppStore.getState();
  const navigate = useNavigate();
  useEffect(() => {
    if (user.password == "" || user.userName == "") {
      console.log("Navigate to /");

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
      <Footer />
    </div>
  );
};

export default HomeLayout;
