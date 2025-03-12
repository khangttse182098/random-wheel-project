import { createBrowserRouter, RouterProvider } from "react-router";
import EventConfigLayout from "./layout/EventConfigLayout/EventConfigLayout";
import HomeLayout from "./layout/HomeLayout/HomeLayout";
import SpinLayout from "./layout/SpinLayout/SpinLayout";
import AccountInfo from "./pages/AccountInfo/AccountInfo";
import ContestantList from "./pages/ContestantList/ContestantList";
import EventMangement from "./pages/EventMangement/EventMangement";
import EventSetting from "./pages/EventSetting/EventSetting";
import PrizeMangement from "./pages/PrizeMangement/PrizeMangement";
import SignIn from "./pages/SignIn/SignIn";
import WinnerList from "./pages/WinnerList/WinnerList";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/event-manage",
          element: <EventMangement />,
        },
        {
          path: "/account-info",
          element: <AccountInfo />,
        },
      ],
    },
    {
      path: "/",
      element: <EventConfigLayout />,
      children: [
        {
          path: "/event-setting",
          element: <EventSetting />,
        },
        {
          path: "/prize-manage",
          element: <PrizeMangement />,
        },
        {
          path: "/contestant-list",
          element: <ContestantList />,
        },
        {
          path: "/winner-list",
          element: <WinnerList />,
        },
      ],
    },
    {
      path: "/login",
      element: <SignIn />,
    },
    {
      path: "/spin-page",
      element: <SpinLayout />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
