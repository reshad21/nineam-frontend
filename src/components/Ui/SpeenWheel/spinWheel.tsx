import React, { useRef, useState } from "react";
import "./SpinWheel.css";

const options = [
  { text: "10% Off", value: "10" },
  { text: "20% Off", value: "20" },
  { text: "30% Off", value: "30" },
  { text: "40% Off", value: "40" },
];

const SpinWheel: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const handleSpin = () => {
    if (!wheelRef.current) return;

    // Generate a random number of spins and the base rotation
    const spins = Math.floor(Math.random() * 5) + 5; // 5 to 10 spins
    const randomStart = Math.floor(Math.random() * 360); // Random start position
    const totalRotation = rotation + spins * 360 + randomStart;

    // Calculate which option will be selected based on the rotation
    const optionIndex = Math.floor(
      ((totalRotation % 360) / 360) * options.length
    );
    const result = options[optionIndex].text;

    // Apply CSS transition for smooth spinning
    wheelRef.current.style.transition = `transform 3000ms ease-out`;
    wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;

    // After the spin animation is complete, update the result
    setTimeout(() => {
      setSelectedOption(result);
    }, 3000); // Match the duration of the spin animation

    // Update the rotation state for the next spin
    setRotation(totalRotation);
  };

  return (
    <div className="spin-wheel-container">
      <div className="wheel">
        <div className="wheel-inner" ref={wheelRef}>
          {options.map((option, index) => (
            <div
              key={index}
              className="option"
              style={{
                transform: `rotate(${(360 / options.length) * index}deg)`,
              }}
            >
              <div className="option-content">{option.text}</div>
            </div>
          ))}
        </div>
      </div>
      <button className="spin-button" onClick={handleSpin}>
        Spin
      </button>
      {selectedOption && (
        <div className="result">Congratulations! You won: {selectedOption}</div>
      )}
    </div>
  );
};

export default SpinWheel;
