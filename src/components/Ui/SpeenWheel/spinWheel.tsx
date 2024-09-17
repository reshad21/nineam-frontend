import { GiftOutlined } from "@ant-design/icons";
import { Button, Typography, message } from "antd";
import React, { useRef, useState } from "react";
import "./SpinWheel.css";

const { Title, Text } = Typography;

const options = [
  { text: "10% Off", value: "10", color: "#FFDDC1" }, // Light pink
  { text: "20% Off", value: "20", color: "#FFABAB" }, // Light red
  { text: "30% Off", value: "30", color: "#FFC3A0" }, // Light peach
  { text: "40% Off", value: "40", color: "#FF677D" }, // Pink
];

const SpinWheel: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const promoCode = "PROMO20"; // Define your promo code here

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

  const handleCopyPromoCode = () => {
    navigator.clipboard
      .writeText(promoCode)
      .then(() => {
        // Show success message when copying is done
        message.success("Promo code copied to clipboard!");
      })
      .catch(() => {
        // Show error message if copying fails
        message.error("Failed to copy the promo code. Try again.");
      });
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
              You won: <span className="font-bold">{selectedOption}</span>
            </Text>
            <div className="bg-white text-gray-800 font-semibold py-2 px-4 rounded-lg inline-block shadow-md mt-4">
              Your promo code is:{" "}
              <span className="text-red-600">{promoCode}</span>
            </div>
            <Button
              type="primary"
              size="large"
              className="mt-6 bg-white text-orange-500 font-semibold border-0 hover:bg-gray-100"
              onClick={handleCopyPromoCode} // Copy promo code on click
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
