import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface RollingSlotProps {
  value: number;
  delay: number;
}

const getRandomEvenHundred = () => {
  const min = -7200;
  const max = 0;
  const step = 200; // The step size (even hundred)

  // Generate a random integer between 0 and (max-min)/step
  const randomMultiplier = Math.floor(Math.random() * ((max - min) / step + 1));

  // Calculate the final number
  return min + randomMultiplier * step;
};

const RollingSlot: React.FC<RollingSlotProps> = ({ value, delay }) => {
  const slotRef = useRef<HTMLUListElement>(null);
  // const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // let interval: NodeJS.Timeout;
    // if (slotRef.current) {
    const randomY = getRandomEvenHundred();
    gsap.fromTo(
      slotRef.current,
      { y: -14200, opacity: 1 }, // Bắt đầu dịch chuyển lên trên (-100px) và ẩn đi
      {
        y: randomY, // Trả về vị trí gốc
        opacity: 1, // Hiển thị lại
        duration: 3, // animation khoảng 1.5s
        ease: "power2.inOut", // Hiệu ứng chuyển động
        delay: delay,
        // repeat: -1,
        // onStart: () => {
        //   interval = setInterval(() => {
        //     setDisplayValue((prev) => (prev + 1) % 10);
        //   }, 100);
        // },
        // onComplete: () => {
        //   clearInterval(interval);
        //   setDisplayValue(value);
        // },
      }
    );
    // }
  }, [value, delay]);

  return (
    <div className="slot">
      <ul ref={slotRef} className="slot-number">
        <li>0</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>A</li>
        <li>B</li>
        <li>C</li>
        <li>D</li>
        <li>E</li>
        <li>F</li>
        <li>G</li>
        <li>H</li>
        <li>I</li>
        <li>J</li>
        <li>K</li>
        <li>L</li>
        <li>M</li>
        <li>N</li>
        <li>O</li>
        <li>P</li>
        <li>Q</li>
        <li>R</li>
        <li>S</li>
        <li>T</li>
        <li>U</li>
        <li>V</li>
        <li>W</li>
        <li>X</li>
        <li>Y</li>
        <li>Z</li>
        <li>0</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>A</li>
        <li>B</li>
        <li>C</li>
        <li>D</li>
        <li>E</li>
        <li>F</li>
        <li>G</li>
        <li>H</li>
        <li>I</li>
        <li>J</li>
        <li>K</li>
        <li>L</li>
        <li>M</li>
        <li>N</li>
        <li>O</li>
        <li>P</li>
        <li>Q</li>
        <li>R</li>
        <li>S</li>
        <li>T</li>
        <li>U</li>
        <li>V</li>
        <li>W</li>
        <li>X</li>
        <li>Y</li>
        <li>0</li>
      </ul>
    </div>
  );
};

export default RollingSlot;
