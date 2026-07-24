import { analyticsTime } from "@/utils/formatTime";
import { Flame } from "lucide-react";
function FocusStats({ focus, overview }) {
  console.log({
    overview,
    focus,
  });
  return (
    <>
      <h2 className="text-xl font-bold text-neutral-700 mb-6">Today's Focus</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex p-4 bg-neutral-300/60 rounded-md flex-col gap-2">
          <span className="text-md font-bold tracking-wide text-neutral-600 ">
            {" "}
            Focused Time
          </span>
          <span className="text-4xl font-medium font-sans text-neutral-800">
            {overview?.focusedTime ? analyticsTime(overview.focusedTime) : "0m"}
          </span>
        </div>
        <div className="flex p-4 bg-neutral-300/60 rounded-md flex-col gap-2">
          <span className="text-md font-bold tracking-wide text-neutral-600 ">
            {" "}
            Sessions
          </span>
          <span className="text-4xl font-medium font-sans text-neutral-800">
            {overview?.focusSessions ?? 0}
          </span>
        </div>
        <div className="flex p-4 bg-neutral-300/60 rounded-md flex-col gap-2">
          <span className="text-md font-bold tracking-wide text-neutral-600 ">
            {" "}
            Longest Session
          </span>
          <span className="text-4xl font-medium font-sans text-neutral-800">
            {focus?.longestSession ? analyticsTime(focus.longestSession) : "0m"}
          </span>
        </div>
        <div className="flex p-4 bg-neutral-primary rounded-md flex-col gap-2">
          <span className="text-md font-bold tracking-wide text-neutral-600 ">
            {" "}
            Streak
          </span>
          <span className="flex items-center text-3xl gap-2 text-green-primary font-medium font-sans ">
            {`${overview?.currentStreak ?? 0} Day${
              (overview?.currentStreak ?? 0) === 1 ? "" : "s"
            }`}{" "}
            <Flame color="#6B8E23" />{" "}
          </span>
        </div>
      </div>
    </>
  );
}

export default FocusStats;
