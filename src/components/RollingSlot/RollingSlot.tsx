import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import style from "../../pages/SpinPage/SpinPage.module.scss";

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
          y: end, // Trả về vị trí gốc
          duration: 3, // animation khoảng 1.5s
          ease: "power3.inOut", // Hiệu ứng chuyển động
          delay: delay,
        }
      );
    }
  }, [currentCode, previousCode, delay]);

  return (
    <div className={style["slot"]}>
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
