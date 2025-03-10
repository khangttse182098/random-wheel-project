import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <ToastContainer />
  </>
);
