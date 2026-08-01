import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { analyticsTime, goalTime } from "@/utils/formatTime";
import { Sparkles } from "lucide-react";
import { updatePreferences } from "@/app/slices/setting/settingsThunk";

function DailyGoal() {
  const dispatch = useDispatch();

  const analytics = useSelector((state) => state.analytics);
  const dailyFocusGoal = useSelector((state) => state.settings.dailyFocusGoal);

  const focusedMinutes = (analytics.overview?.focusedTime ?? 0) / 60;

  const progressPercentage =
    dailyFocusGoal > 0
      ? Math.min(100, (focusedMinutes / dailyFocusGoal) * 100)
      : 0;
  const [goalInput, setGoalInput] = useState(dailyFocusGoal);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const radius = 120;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference - (progressPercentage / 100) * circumference;

  const handleOpenModal = () => {
    setGoalInput(dailyFocusGoal);
    setIsModalOpen(true);
  };

  const handleSaveGoal = async () => {
    try {
      await dispatch(
        updatePreferences({
          dailyFocusGoal: Math.max(1, Number(goalInput)) || 1,
        }),
      ).unwrap();

      setIsModalOpen(false);
    } catch (err) { }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="mb-4 sm:mb-6 flex w-full items-center justify-between gap-3">
        <h2 className="self-start text-lg sm:text-xl font-bold text-text-muted">
          Daily Goal
        </h2>
      </div>

      <div className="relative flex size-48 sm:size-60 items-center justify-center">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="-rotate-90 transform scale-75 sm:scale-100 transition-transform"
        >
          <circle
            className="stroke-surface-hover"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />

          <circle
            stroke="#2d4b41"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="mb-1 sm:mb-2 text-2xl sm:text-3xl font-bold leading-none tracking-tight dark:text-text-soft text-brand">
            {Math.round(progressPercentage)} %
          </span>

          <span className="max-w-36 sm:max-w-45 px-2 text-xs sm:text-sm font-semibold leading-tight tracking-[0.12em] text-brand dark:text-text-soft font-mono">
            Of {goalTime(dailyFocusGoal)} Goal
          </span>
        </div>
      </div>

      <motion.button
        onClick={handleOpenModal}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="mt-2 sm:mt-4 rounded-sm bg-brand-muted px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold dark:text-text text-text-inverse shadow-sm"
      >
        Set Daily Goal
      </motion.button>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-overlay px-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-sm overflow-hidden rounded-2xl bg-surface p-5 sm:p-6 shadow-xl"
            >
              <h3 className="mb-4 text-lg sm:text-xl font-bold text-text">
                Set Daily Goal
              </h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveGoal();
                }}
              >
                <div className="mb-4 sm:mb-6">
                  <label
                    htmlFor="goal-duration"
                    className="mb-2 block text-xs sm:text-sm font-medium text-text-muted"
                  >
                    Goal (minutes)
                  </label>

                  <input
                    id="goal-duration"
                    type="number"
                    min="1"
                    autoFocus
                    required
                    value={goalInput}
                    onChange={(e) =>
                      setGoalInput(Math.max(1, Number(e.target.value) || 1))
                    }
                    className="w-full rounded-lg border border-border-default px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand bg-surface text-text placeholder:text-text-disabled"
                    placeholder="e.g. 180"
                  />
                </div>

                <div className="flex justify-end gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-text-soft transition-colors hover:bg-surface-hover"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-lg bg-brand-muted px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-text-inverse shadow-sm transition-colors hover:bg-brand"
                  >
                    Save Goal
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const PopupDailyGoal = () => {
  const { overview } = useSelector((state) => state.analytics);

  const focusedMinutes = (overview?.focusedTime ?? 0) / 60;
  const dailyFocusGoal = useSelector(
    (state) => state.settings.dailyFocusGoal
  );
  const progressPercentage =
    dailyFocusGoal > 0
      ? Math.min(100, (focusedMinutes / dailyFocusGoal) * 100)
      : 0;
  return (
    <div className="mt-4 w-full rounded-lg border border-border-default bg-surface p-4 sm:p-5 shadow-sm">
      <h3 className="mb-3 sm:mb-4 flex dark:text-text justify-between text-xs font-semibold uppercase tracking-[0.15em] text-text-disabled">
        <span>Daily Goal</span>
        <Sparkles className="text-brand size-4 sm:size-5" />
      </h3>

      <div>
        <div className="tracking-tight">
          <span className="text-lg sm:text-xl font-semibold text-brand">
            {overview?.focusedTime ? analyticsTime(overview.focusedTime) : "0m"}
          </span>

          <span className="ml-1 text-sm sm:text-base text-text-soft">Deep</span>
        </div>

        <div className="my-2 h-2 w-full rounded-full bg-border-light">
          <motion.div
            className="h-full bg-brand-muted"
            initial={{ width: "0%" }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </div>

        <span className="text-sm sm:text-[16px] tracking-tight text-text-soft">
          {Math.round(progressPercentage)}% of Daily Goal Reached
        </span>
      </div>
    </div>
  );
};

export default DailyGoal;