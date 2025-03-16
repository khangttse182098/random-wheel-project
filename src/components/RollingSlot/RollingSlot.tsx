import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import style from "../../pages/SpinPage/SpinPage.module.scss";
import useAppStore from "../../store/useAppStore";

interface RollingSlotProps {
  currentCode: string;
  delay: number;
  previousCode: string;
}

const charList = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const getAnimationPosition = (position: number, previousCode: number) => {
  return {
    start: previousCode * -200 - 7200,
    end: position * -200,
  };
};

const RollingSlot: React.FC<RollingSlotProps> = ({
  currentCode,
  delay,
  previousCode,
}) => {
  const slotRef = useRef<HTMLUListElement>(null);
  const { eventSetting } = useAppStore.getState();

  useEffect(() => {
    const valuePosition = charList.indexOf(currentCode);
    const previousCodePosition = charList.indexOf(previousCode);

    const { start, end } = getAnimationPosition(
      valuePosition,
      previousCodePosition
    );
    if (valuePosition != -1) {
      gsap.fromTo(
        slotRef.current,
        { y: start },
        {
          y: end,
          duration: 3,
          ease: "power3.inOut",
          delay: delay,
        }
      );
    }
  }, [currentCode, previousCode, delay]);

  return (
    <div
      className={style["slot"]}
      style={
        {
          "--slotBg": eventSetting?.numberBackgroundColor,
        } as React.CSSProperties
      }
    >
      <ul ref={slotRef} className={style["slot-number"]}>
        {charList.map((char, index) => (
          <li key={index}>{char}</li>
        ))}
        {charList.map((char, index) => (
          <li key={index}>{char}</li>
        ))}
      </ul>
    </div>
  );
};

export default RollingSlot;
