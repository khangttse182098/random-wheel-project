import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import useAppStore from "../../store/useAppStore";
import style from "../../pages/SpinPage/SpinPage.module.scss";

interface RollingSlotProps {
  value: string;
  delay: number;
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

const getAnimationPosition = (position: number) => {
  return position * -200;
};

const RollingSlot: React.FC<RollingSlotProps> = ({ value, delay }) => {
  const slotRef = useRef<HTMLUListElement>(null);
  const { setIsSlotSpinning } = useAppStore((state) => state);
  useEffect(() => {
    const position = charList.indexOf(value);
    const randomY = getAnimationPosition(position);
    if (position != -1) {
      gsap.fromTo(
        slotRef.current,
        { y: -14200 }, // Bắt đầu dịch chuyển lên trên (-100px) và ẩn đi
        {
          y: randomY, // Trả về vị trí gốc
          duration: 3, // animation khoảng 1.5s
          ease: "power3.inOut", // Hiệu ứng chuyển động
          delay: delay,
          onStart: () => {
            setIsSlotSpinning(true);
          },
          onComplete: () => {
            setIsSlotSpinning(false);
          },
        }
      );
    }
  }, [value, delay, setIsSlotSpinning]);

  return (
    <div className={style["slot"]}>
      <ul ref={slotRef} className={style["slot-number"]}>
        {charList.map((char) => (
          <li>{char}</li>
        ))}
        {charList.map((char) => (
          <li>{char}</li>
        ))}
      </ul>
    </div>
  );
};

export default RollingSlot;
