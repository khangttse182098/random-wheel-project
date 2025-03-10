import { createBrowserRouter, RouterProvider } from "react-router";
import EventMangement from "./pages/EventMangement/EventMangement";
import EventSetting from "./pages/EventSetting/EventSetting";
import PrizeMangement from "./pages/PrizeMangement/PrizeMangement";
import ContestantList from "./pages/ContestantList/ContestantList";
import WinnerList from "./pages/WinnerList/WinnerList";
import HomeLayout from "./layout/HomeLayout/HomeLayout";
import AccountInfo from "./pages/AccountInfo/AccountInfo";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <EventMangement />,
        },
        {
          path: "/account-info",
          element: <AccountInfo />,
        },
      ],
    },
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
  ]);
  return <RouterProvider router={router} />;
}

export default App;
