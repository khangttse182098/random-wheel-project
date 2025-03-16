import React, { useState } from "react";
import RollingSlot from "../../components/RollingSlot/RollingSlot";
import style from "./SpinPage.module.scss";
import "./select.scss";
import useAppStore from "../../store/useAppStore";
import { Select } from "antd";
import { TiArrowSortedDown } from "react-icons/ti";

const SpinPage = () => {
  const { participantList, eventSetting, rewardList } = useAppStore.getState();
  const codeList = participantList!.map((item) => item.code);
  const [code, setCode] = useState<string[]>(
    Array(codeList[0].length).fill("")
  );
  const [previousCode, setPreviousCode] = useState<string[]>(
    Array(codeList[0].length).fill("0")
  );
  const [spinKey, setSpinKey] = useState(0);
  const [isSpinDisabled, setIsSpinDisabled] = useState(false);

  const handldeGetRandomCode = () => {
    const selectedCode = codeList[Math.floor(Math.random() * codeList.length)];
    console.log(selectedCode);

    return selectedCode.split("");
  };

  //handle spin action
  const spin = () => {
    const randomCode = handldeGetRandomCode();
    //set previousCode
    setPreviousCode(spinKey ? code : previousCode);

    //set new code
    setCode(randomCode);
    setSpinKey((prevKey) => prevKey + 1); // Update the key to force re-mount

    //disabled spin button
    setIsSpinDisabled(true);

    //set waitting time before spinning again
    setTimeout(() => {
      setIsSpinDisabled(false);
    }, (code.length - 0.7) * 3 * 0.3 * 1000);
  };

  return (
    <div className={style["container"]}>
      <div className={style["img-container"]}>
        {eventSetting?.showLogo ? (
          <img src={eventSetting?.logo} alt="logo" />
        ) : null}
      </div>
      <h2
        style={
          { "--titleText": eventSetting?.textColor } as React.CSSProperties
        }
        className={style["title"]}
      >
        {eventSetting?.showEventName ? eventSetting.eventName : <>&nbsp;</>}
      </h2>
      <div
        className={style["slot-machine"]}
        style={
          { "--borderColor": eventSetting?.textColor } as React.CSSProperties
        }
      >
        {code.map((num, index) => (
          <RollingSlot
            key={`${spinKey}-${index}`}
            currentCode={num}
            delay={index * 0.3}
            previousCode={previousCode[index]}
          />
        ))}
      </div>
      <div className={style["button-container"]}>
        <Select
          defaultValue="Chọn giải quay"
          suffixIcon={
            <TiArrowSortedDown size={20} color={eventSetting?.textColor} />
          }
          className={style["select-reward"]}
          style={
            {
              "--selectBg": eventSetting?.buttonColor,
              "--selectText": eventSetting?.textColor,
            } as React.CSSProperties
          }
          // onChange={handleChange}
          options={rewardList?.map((item) => ({
            value: item.rewardName,
            label: item.rewardName,
          }))}
        />
        <div
          className={style["remaining-slot"]}
          style={
            {
              "--buttonBg": eventSetting?.buttonColor,
              "--buttonText": eventSetting?.textColor,
            } as React.CSSProperties
          }
        >
          <span>Lượt quay còn lại</span>
        </div>
        <button
          onClick={spin}
          disabled={isSpinDisabled}
          style={
            {
              "--buttonBg": eventSetting?.buttonColor,
              "--buttonText": eventSetting?.textColor,
            } as React.CSSProperties
          }
          className={style["button"]}
        >
          Quay
        </button>
      </div>
    </div>
  );
};

export default SpinPage;
