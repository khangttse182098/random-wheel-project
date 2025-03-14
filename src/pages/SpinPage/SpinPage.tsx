import { useState } from "react";
import RollingSlot from "../../components/RollingSlot/RollingSlot";
import style from "./SpinPage.module.scss";

const mockData = ["AI4SZ", "01234", "LMFAO"];

//NHỚ SỬA MOCKDATA THÀNH VALUE KHI SỬA LẠI BÊN TRANG EVENT-SETTING
const SpinPage = (/*{ value }: { value: string[] }*/) => {
  const [code, setCode] = useState<string[]>(
    Array(mockData[0].length).fill("")
  );
  const [previousCode, setPreviousCode] = useState<string[]>(
    Array(mockData[0].length).fill("0")
  );
  const [spinKey, setSpinKey] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const handldeGetRandomCode = () => {
    // const selectedCode = value[Math.floor(Math.random() * value.length)];
    const selectedCode = mockData[Math.floor(Math.random() * mockData.length)];
    return selectedCode.split("");
  };

  const spin = () => {
    const randomCode = handldeGetRandomCode();
    //set previousCode
    setPreviousCode(spinKey ? code : previousCode);

    //set new code
    setCode(randomCode);
    setSpinKey((prevKey) => prevKey + 1); // Update the key to force re-mount

    //disabled spin button
    setIsSpinning(true);

    //set waitting time before spinning again
    setTimeout(() => {
      setIsSpinning(false);
    }, (code.length - 0.7) * 3 * 0.3 * 1000);
  };

  return (
    <div className={style["container"]}>
      <h2>Máy Quay Số</h2>
      <div className={style["slot-machine"]}>
        {code.map((num, index) => (
          <RollingSlot
            key={`${spinKey}-${index}`}
            currentCode={num}
            delay={index * 0.3}
            previousCode={previousCode[index]}
          />
        ))}
      </div>
      <button onClick={spin} disabled={isSpinning}>
        Quay
      </button>
    </div>
  );
};

export default SpinPage;
