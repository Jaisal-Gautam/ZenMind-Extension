import { motion } from "framer-motion";

function SanctuaryCard({ dashboardData }) {
  return (
    <div className="w-full rounded-xl    p-8">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Left */}
        <div className="flex-1 flex flex-col justify-center">
          <span className="text-sm uppercase tracking-widest text-green-secondary font-semibold">
            Level {dashboardData.lvl}
          </span>

          <h2 className="text-4xl font-bold text-neutral-800 mt-2">
            {dashboardData.stage}
          </h2>

          <p className="text-neutral-500 mt-3 mb-10 max-w-md">
            {dashboardData.desc}
          </p>

          <ExperienceBar
            currentLevel={dashboardData.lvl ?? 1}
            currentXP={dashboardData.xpIntoLevel ?? 0}
            maxXP={dashboardData.levelXP || 100}
          />

          <div className="mt-10 rounded-xl border border-green-secondary/50 bg-neutral-primary p-5">
            <p className="text-sm text-neutral-600">Next Growth</p>

            <h3 className="text-xl font-semibold text-green-primary mt-1">
              {dashboardData.nextUnlock}
            </h3>

            <p className="text-sm text-neutral-600 mt-2">
              {dashboardData.remainingXP ?? 0} XP Remaining
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 flex justify-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute flex items-center h-72 w-72 rounded-full bg-green-100/50 blur-3xl" />

            <motion.img
              src={dashboardData.img}
              alt={dashboardData.stage}
              className="relative z-10 w-100 object-contain "
              animate={{ y: [-10, 10] }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 8,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperienceBar({ currentLevel = 1, currentXP = 0, maxXP = 100 }) {
  const progress = maxXP > 0 ? (currentXP / maxXP) * 100 : 0;
  return (
    <div className="w-full">
      <div className="flex items-center gap-4">
        <span className="font-semibold text-neutral-700 whitespace-nowrap">
          Lv {currentLevel}
        </span>

        <div className="flex-1 h-4 rounded-full bg-gray-200 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-green-secondary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
          />
        </div>

        <span className="font-semibold text-neutral-700 whitespace-nowrap">
          Lv {currentLevel + 1}
        </span>
      </div>

      <div className="flex justify-between mt-3 text-sm text-neutral-500">
        <span>
          {currentXP} / {maxXP} XP
        </span>

        <span>{progress.toFixed(0)}%</span>
      </div>
    </div>
  );
}

export default SanctuaryCard;
