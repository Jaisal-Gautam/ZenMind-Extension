import { motion } from "framer-motion";

export default function GoalProgress({ percentage = 30 }) {
  return (
    <div className="flex flex-col gap-1 w-40 font-sans  rounded-xl">
      
      <div className="h-3 w-full rounded-full bg-[#E6E7EB]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="h-full bg-secondary rounded-full"
        />
      </div>
      
      {/* Label */}
      <div className="text-gray-600 text-lg tracking-wide">
        {percentage}% goal
      </div>
      
    </div>
  );
}