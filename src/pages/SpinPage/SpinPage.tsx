import { useState } from "react";
import RollingSlot from "../../components/RollingSlot/RollingSlot";
import style from "./SpinPage.module.scss";
import useAppStore from "../../store/useAppStore";

const mockData = ["AI4SZ", "01234", "LMFAO"];

//NHỚ SỬA MOCKDATA THÀNH VALUE KHI SỬA LẠI BÊN TRANG EVENT-SETTING
const SpinPage = ({ value }: { value: string[] }) => {
  const [code, setCode] = useState<string[]>(
    Array(mockData[0].length).fill("")
  );
  const [spinKey, setSpinKey] = useState(0);
  const { isSlotSpinning } = useAppStore((state) => state);

  const handldeGetRandomCode = () => {
    // const selectedCode = value[Math.floor(Math.random() * value.length)];
    const selectedCode = mockData[Math.floor(Math.random() * mockData.length)];
    return selectedCode.split("");
  };

  const spin = () => {
    const randomCode = handldeGetRandomCode();
    setCode(randomCode);
    setSpinKey((prevKey) => prevKey + 1); // Update the key to force re-mount
  };

  return (
    <div className={style["container"]}>
      <h2>Máy Quay Số</h2>
      <div className={style["slot-machine"]}>
        {code.map((num, index) => (
          <RollingSlot
            key={`${spinKey}-${index}`}
            value={num}
            delay={index * 0.3}
          />
        ))}
      </div>
      <button onClick={spin} disabled={isSlotSpinning}>
        Quay
      </button>
    </div>
  );
};

export default SpinPage;
