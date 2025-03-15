import SpinPage from "../../pages/SpinPage/SpinPage";
import useAppStore from "../../store/useAppStore";
import style from "./SpinLayout.module.scss";

const SpinLayout = () => {
  const { eventSetting } = useAppStore.getState();
  console.log(eventSetting);

  return (
    <div
      className={style["page-container"]}
      style={
        {
          "--bg": `url(${eventSetting?.backgroundImage})`,
        } as React.CSSProperties
      }
    >
      <SpinPage />
    </div>
  );
};

export default SpinLayout;
