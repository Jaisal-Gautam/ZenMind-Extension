import { motion } from "framer-motion";

function SanctuaryCard({ dashboardData }) {
  return (
    <div className="w-full rounded-xl p-4 sm:p-6 md:p-8">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-6 sm:gap-8 lg:gap-10">
        {/* Left */}
        <div className="flex-1 flex flex-col justify-center w-full">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-brand-muted font-semibold">
            Level {dashboardData.lvl}
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text mt-1 sm:mt-2">
            {dashboardData.stage}
          </h2>

          <p className="text-sm sm:text-base text-text-soft mt-2 sm:mt-3 mb-6 sm:mb-10 max-w-md">
            {dashboardData.desc}
          </p>

          <ExperienceBar
            currentLevel={dashboardData.lvl ?? 1}
            currentXP={dashboardData.xpIntoLevel ?? 0}
            maxXP={dashboardData.levelXP || 100}
          />

          <div className="mt-6 sm:mt-10 rounded-xl border border-border-strong hover:border-border-brand bg-surface-soft p-4 sm:p-5 transition-colors duration-150 ease-in">
            <p className="text-xs sm:text-sm text-text-soft">Next Growth</p>

            <h3 className="text-lg sm:text-xl font-semibold text-brand mt-1">
              {dashboardData.nextUnlock}
            </h3>

            <p className="text-xs sm:text-sm text-text-soft mt-1 sm:mt-2">
              {dashboardData.remainingXP ?? 0} XP Remaining
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 flex justify-center w-full">
          <div className="relative flex items-center justify-center max-h-72 sm:max-h-80 md:max-h-100 overflow-hidden">
            <div
              className="absolute flex items-center justify-center h-48 sm:h-60 md:h-72 w-48 sm:w-60 md:w-72 rounded-full bg-green-100/50 blur-3xl"
              style={{ backgroundColor: "var(--color-brand-glow)" }}
            />
            <motion.img
              src={dashboardData.img}
              alt={dashboardData.stage}
              className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-full object-cover"
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
      <div className="flex items-center gap-2 sm:gap-4">
        <span className="text-xs sm:text-base font-semibold text-text-muted whitespace-nowrap">
          Lv {currentLevel}
        </span>

        <div className="flex-1 h-2.5 sm:h-3 overflow-hidden rounded-full bg-border-light">
          <motion.div
            className="h-full rounded-full bg-brand-muted"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
          />
        </div>

        <span className="text-xs sm:text-base font-semibold text-text-muted whitespace-nowrap">
          Lv {currentLevel + 1}
        </span>
      </div>

      <div className="flex justify-between mt-2 sm:mt-3 text-xs sm:text-sm text-text-soft">
        <span>
          {currentXP} / {maxXP} XP
        </span>

        <span>{progress.toFixed(0)}%</span>
      </div>
    </div>
  );
}

export default SanctuaryCard;