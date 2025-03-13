import { useState } from "react";
import RollingSlot from "../../components/RollingSlot/RollingSlot";
import "./SpinPage.scss";

const SpinPage = () => {
  const [numSlots, setNumSlots] = useState(5);
  const [numbers, setNumbers] = useState<number[]>(Array(numSlots).fill(0));
  const [spinKey, setSpinKey] = useState(0); // Add a key to force re-mount

  const spin = () => {
    const newNumbers = Array.from({ length: numSlots }, () =>
      Math.floor(Math.random() * 10)
    );
    setNumbers(newNumbers);
    setSpinKey((prevKey) => prevKey + 1); // Update the key to force re-mount
  };

  return (
    <div className="container">
      <h2>Máy Quay Số</h2>
      <input
        type="number"
        value={numSlots}
        onChange={(e) => setNumSlots(Number(e.target.value))}
        min={1}
        max={10}
      />
      <div className="slot-machine">
        {numbers.map((num, index) => (
          <RollingSlot
            key={`${spinKey}-${index}`}
            value={num}
            delay={index * 0.3}
          />
        ))}
      </div>
      <button onClick={spin}>Quay</button>
    </div>
  );
};

export default SpinPage;
