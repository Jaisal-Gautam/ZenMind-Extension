import { analyticsTime } from "@/utils/formatTime";
import { Flame } from "lucide-react";

function FocusInsight({ focus, overview }) {
  const peakLabel = focus?.peakFocusHour?.label ?? "--";
  return (
    <>
      <h2 className="text-2xl font-mono text-text mb-6">
        Consistency Over Intensity
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex p-4 shadow-sm rounded-r-xl bg-surface hover:border-border-strong transition-colors duration-150 ease-in dark:bg-surface border border-border-default  border-l-brand border-l-2 flex-col gap-2">
          <span className="text-md font-medium font-sans text-text ">
            Longest Focus Session
          </span>
          <span className="text-3xl tracking-tight text-text font-semi-bold ">
            {focus?.longestSession
              ? analyticsTime(focus?.longestSession)
              : "0m"}
          </span>
        </div>
        <div className="flex p-4 shadow-sm rounded-r-xl bg-surface hover:border-border-strong transition-colors duration-150 ease-in dark:bg-surface border border-border-default border-l-brand border-l-2  flex-col gap-2 ">
          <span className="text-md font-medium font-sans text-text">
            {" "}
            Average Focus Sessions
          </span>
          <span className="text-3xl tracking-tight text-text font-semi-bold ">
            {focus?.averageSession
              ? analyticsTime(focus?.averageSession)
              : "0m"}
          </span>
        </div>
        <div className="flex p-4 shadow-sm rounded-r-xl bg-surface hover:border-border-strong transition-colors duration-150 ease-in dark:bg-surface border border-border-default  border-l-brand border-l-2 flex-col gap-2">
          <span className="text-md font-medium font-sans text-text ">
            {" "}
            Peak Focus Hour
          </span>
          <span className="text-3xl tracking-tight text-text font-semi-bold ">
            {peakLabel}
          </span>
        </div>
        <div className="flex p-4 shadow-sm rounded-r-xl bg-surface hover:border-border-strong transition-colors duration-150 ease-in dark:bg-surface border border-border-default  border-l-brand border-l-2 flex-col gap-2">
          <span className="flex items-center gap-2 text-md font-medium font-sans text-text ">
            {" "}
            Longest Streak
          </span>
          <span className="flex items-center  gap-2 text-3xl  tracking-tight text-brand font-semi-bold">
            {`${overview?.longestStreak ?? 0} Day${
              (overview?.longestStreak ?? 0) === 1 ? "" : "s"
            }`}
            <Flame color="#6B8E23" />{" "}
          </span>
        </div>
      </div>
    </>
  );
}

export default FocusInsight;
