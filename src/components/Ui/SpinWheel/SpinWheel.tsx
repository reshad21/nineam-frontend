import { GiftOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import React, { useRef, useState } from "react";
import "./SpinWheel.css";

const { Title, Text } = Typography;

const options = [
  { text: "10% Off", value: "10", color: "#FFDDC1", promoCode: "PROMO10" }, // Light pink
  { text: "20% Off", value: "20", color: "#FFABAB", promoCode: "PROMO20" }, // Light red
  { text: "30% Off", value: "30", color: "#FFC3A0", promoCode: "PROMO30" }, // Light peach
  { text: "40% Off", value: "40", color: "#FF677D", promoCode: "PROMO40" }, // Pink
];

const SpinWheel: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [selectedOption, setSelectedOption] = useState<{
    text: string;
    promoCode: string;
  } | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const handleSpin = () => {
    if (!wheelRef.current) return;

    const spins = Math.floor(Math.random() * 5) + 5; // 5 to 10 spins
    const randomStart = Math.floor(Math.random() * 360); // Random start position
    const totalRotation = rotation + spins * 360 + randomStart;

    const optionIndex = Math.floor(
      ((totalRotation % 360) / 360) * options.length
    );
    const result = options[optionIndex];

    wheelRef.current.style.transition = `transform 3000ms ease-out`;
    wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;

    setTimeout(() => {
      setSelectedOption(result);
    }, 3000);

    setRotation(totalRotation);
  };

  // Function to copy promo code to clipboard
  const copyPromoCode = (promoCode: string) => {
    navigator.clipboard.writeText(promoCode);
    alert(`Promo code ${promoCode} copied to clipboard!`);
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
                backgroundColor: option.color,
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
        <div className="result">
          <div className="max-w-md mx-auto bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg shadow-lg p-6 text-center space-y-4">
            <GiftOutlined className="text-5xl text-white" />
            <Title level={2} className="text-white">
              Congratulations!
            </Title>
            <Text className="text-white text-lg">
              You won: <span className="font-bold">{selectedOption.text}</span>
            </Text>
            <div className="bg-white text-gray-800 font-semibold py-2 px-4 rounded-lg inline-block shadow-md mt-4">
              Your promo code is:{" "}
              <span className="text-red-600">{selectedOption.promoCode}</span>
            </div>
            <Button
              type="primary"
              size="large"
              className="mt-6 bg-white text-orange-500 font-semibold border-0 hover:bg-gray-100"
              onClick={() => copyPromoCode(selectedOption.promoCode)}
            >
              Claim Your Reward
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
