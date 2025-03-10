import { Outlet } from "react-router";
import EventMenu from "../../components/EventMenu/EventMenu";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const EventConfigLayout = () => {
  return (
    <div>
      <Header />
      <EventMenu />
      <Outlet />
      <Footer />
    </div>
  );
};

export default EventConfigLayout;
