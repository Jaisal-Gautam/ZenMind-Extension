import { analyticsTime } from "@/utils/formatTime";
import { Flame } from "lucide-react";
function FocusStats({ focus, overview }) {
  
  return (
    <>
      <h2 className="text-xl font-bold text-text-muted mb-6">Today's Focus</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex p-4 bg-surface-hover hover:border-border-brand dark:bg-app rounded-md border border-border-light flex-col gap-2">
          <span className="text-md font-bold tracking-wide text-text-soft ">
            {" "}
            Focused Time
          </span>
          <span className="text-4xl font-medium font-sans text-text-text-800">
            {overview?.focusedTime ? analyticsTime(overview.focusedTime) : "0m"}
          </span>
        </div>
        <div className="flex p-4 bg-surface-hover hover:border-border-brand dark:bg-app border border-border-light rounded-md flex-col gap-2">
          <span className="text-md font-bold tracking-wide text-text-soft ">
            {" "}
            Sessions
          </span>
          <span className="text-4xl font-medium  font-sans text-text-text-800">
            {overview?.focusSessions ?? 0}
          </span>
        </div>
        <div className="flex p-4 bg-surface-hover hover:border-border-brand dark:bg-app border border-border-light rounded-md flex-col gap-2">
          <span className="text-md font-bold tracking-wide text-text-soft ">
            {" "}
            Longest Session
          </span>
          <span className="text-4xl font-medium font-sans text-text-text-800">
            {focus?.longestSession ? analyticsTime(focus.longestSession) : "0m"}
          </span>
        </div>

        <div className="flex p-4 bg-surface-soft hover:border-border-brand border border-brand/20 rounded-md flex-col gap-2">
          <span className="text-md font-bold tracking-wide text-text-soft ">
            {" "}
            Streak
          </span>
          <span className="flex items-center text-3xl gap-2 text-brand font-medium font-sans ">
            {`${overview?.currentStreak ?? 0} Day${
              (overview?.currentStreak ?? 0) === 1 ? "" : "s"
            }`}{" "}
            <Flame className="text-brand-muted" />
          </span>
        </div>
      </div>
    </>
  );
}

export default FocusStats;
