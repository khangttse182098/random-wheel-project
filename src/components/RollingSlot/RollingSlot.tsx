import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface RollingSlotProps {
  value: number;
  delay: number;
}

const RollingSlot: React.FC<RollingSlotProps> = ({ value, delay }) => {
  const slotRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (slotRef.current) {
      gsap.fromTo(
        slotRef.current,
        { y: -100, opacity: 0 }, // Bắt đầu dịch chuyển lên trên (-100px) và ẩn đi
        {
          y: 0, // Trả về vị trí gốc
          opacity: 1, // Hiển thị lại
          duration: 1.5, // animation khoảng 1.5s
          ease: "power2.out", // Hiệu ứng chuyển động
          delay: delay,
          onComplete: () => setDisplayValue(value), // Cập nhật số hiển thị sau animation
        }
      );
    }
  }, [value, delay]);

  return (
    <div className="slot">
      <div ref={slotRef} className="slot-number">
        {displayValue}
      </div>
    </div>
  );
};

export default RollingSlot;
