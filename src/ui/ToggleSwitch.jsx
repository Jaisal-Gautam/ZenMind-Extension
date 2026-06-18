import { useState } from "react";
import { motion } from "framer-motion";
export default function ToggleSwitch() {
  const [isOn, setIsOn] = useState(true);

  const toggleSwitch = () => setIsOn(!isOn);

  return (
    <div
      onClick={toggleSwitch}
      className={`flex h-8 w-20 cursor-pointer rounded-full p-1 transition-colors duration-300 ${
        isOn ? "bg-[#4D652D]" : "bg-gray-300"
      }`}
      style={{ justifyContent: isOn ? "flex-end" : "flex-start" }}
    >
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 50,
        }}
        className="h-6 w-6 rounded-full bg-white shadow-sm"
      />
    </div>
  );
}