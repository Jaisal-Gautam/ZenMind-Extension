import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { getFocus } from "@/utils/analyticsHelpers";
import { analyticsTime } from "@/utils/formatTime";
import { setGoal } from "@/app/slices/settingsSlice";
import { Sparkles } from "lucide-react";
function DailyGoal() {
  const analytics = useSelector((state) => state.analytics);
  const dispatch = useDispatch();
  const focus = getFocus(analytics, "today");
  const goal = useSelector((state) => state.settings.goal);

  const [goalInput, setGoalInput] = useState(goal);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const progressPercentage = goal > 0 ? Math.min((focus / goal) * 100, 100) : 0;
  const radius = 120;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference - (progressPercentage / 100) * circumference;

  const handleOpenModal = () => {
    setGoalInput(goal);
    setIsModalOpen(true);
  };

  const handleSaveGoal = () => {
    dispatch(setGoal(Math.max(1, Number(goalInput) || 1)));
    setIsModalOpen(false);
  };

  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="w-full flex items-center justify-between mb-6 gap-3">
        <h2 className="text-xl font-bold self-start text-neutral-700">
          Daily Goal
        </h2>
      </div>

      <div className="relative flex items-center justify-center size-60">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="-rotate-90 transform"
        >
          <circle
            stroke="#f3f4f6"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="#537233"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-bold text-[#1a2e22] tracking-tight leading-none mb-2">
            {Math.round(progressPercentage)} %
          </span>
          <span className="text-sm font-semibold text-neutral-500  tracking-[0.12em] max-w-45 px-2 leading-tight">
            Of {analyticsTime(goal)} Goal
          </span>
        </div>
      </div>

      <motion.button
        onClick={handleOpenModal}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="mt-4 rounded-sm bg-green-secondary px-4 py-2 text-sm font-semibold  text-neutral-200 shadow-sm"
      >
        Set Daily Goal
      </motion.button>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-sm overflow-hidden rounded-2xl bg-white p-6 shadow-xl"
            >
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                Add Custom Duration
              </h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveGoal();
                }}
              >
                <div className="mb-6">
                  <label
                    htmlFor="goal-duration"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Duration (minutes)
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
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-secondary"
                    placeholder="e.g. 45"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-lg px-4 py-2 font-medium text-gray-600 transition-colors hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-green-secondary px-4 py-2 font-medium text-white shadow-sm transition-colors hover:bg-green-primary"
                  >
                    Add Preset
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
  const analytics = useSelector((state) => state.analytics);
  const focus = getFocus(analytics, "today");
  const goal = useSelector((state) => state.settings.goal);
  const progressPercentage = goal > 0 ? Math.min((focus / goal) * 100, 100) : 0;
  return (
    <div className="w-full  p-5 bg-neutral-tertiary rounded-lg border border-gray-100 backdrop-blur-sm shadow-sm font-sans mt-4">
      <h3 className="text-xs font-semibold tracking-[0.15em] text-gray-500 mb-4 ml-1 uppercase flex justify-between">
        <span>Daily Goal</span>
        <Sparkles className="text-green-primary" />
      </h3>
      <div>
        <span className="text-[16px] text-green-primary tracking-tight leading-none ">
          <span className="text-xl font-semibold ">
            {analyticsTime(analytics.totalFocusTime)}
          </span>{" "}
           Deep
        </span>

        <div className="w-full my-2 h-2 rounded-full border bg-gray-100">
          <motion.div
            className="h-full bg-green-secondary"
            initial={{ width: "0%" }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </div>
        <span className="text-[16px] font-sans text-neutral-600  tracking-tight leading-none ">
          {Math.round(progressPercentage)} % of Daily Goal Reached
        </span>
      </div>
    </div>
  );
};

export default DailyGoal;
