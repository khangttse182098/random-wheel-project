import EventMenu from "../../components/EventMenu/EventMenu";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import useAppStore from "../../store/useAppStore";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const EventConfigLayout = () => {
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
      <EventMenu />
      <Footer />
    </div>
  );
};

export default EventConfigLayout;
