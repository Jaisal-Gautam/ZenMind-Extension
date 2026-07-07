import { formatHourRange,analyticsTime } from "@/utils/formatTime";
import { Flame } from "lucide-react";

function FocusInsight({ dashboardData }) {
  const peak = dashboardData.focus.peakHour;
  const peakHour = peak ? formatHourRange(peak.hour) : "--";
  return (
    <>
      <h2 className="text-2xl font-mono text-neutral-700 mb-6">
        Consistency Over Intensity
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex p-4 shadow-sm rounded-r-xl  border border-gray-200 border-l-2 border-l-green-secondary  flex-col gap-2">
          <span className="text-md tracking-tight text-neutral-600 ">
            {" "}
            Longest Focus Session
          </span>
          <span className="text-4xl font-medium font-sans text-neutral-800">
            {analyticsTime(dashboardData.focus.longestSession)}
          </span>
        </div>
        <div className="flex p-4 shadow-sm rounded-r-xl  border border-gray-200 border-l-2 border-l-green-secondary  flex-col gap-2">
          <span className="text-md tracking-tight text-neutral-600 ">
            {" "}
            Average Focus Sessions
          </span>
          <span className="text-4xl font-medium font-sans text-neutral-800">
            {analyticsTime(dashboardData.focus.averageSession)}
          </span>
        </div>
        <div className="flex p-4 shadow-sm rounded-r-xl  border border-gray-200 border-l-2 border-l-green-secondary  flex-col gap-2">
          <span className="text-md tracking-tight text-neutral-600 ">
            {" "}
            Peak Focus Hour
          </span>
          <span className="text-3xl font-medium font-sans text-neutral-800">
            {peakHour}
          </span>
        </div>
        <div className="flex p-4 shadow-sm rounded-r-xl  border bg-neutral-primary border-gray-200 border-l-2 border-l-green-secondary  flex-col gap-2">
          <span className="text-md  tracking-tight text-neutral-600 ">
            {" "}
            Longest Streak
          </span>
          <span className="flex items-center text-3xl  gap-2 text-green-primary font-medium font-sans ">
            {`${dashboardData.summary.longestStreak} Day${dashboardData.summary.longestStreak === 1 ? "" : "s"}`}{" "}
            <Flame color="#6B8E23" />{" "}
          </span>
        </div>
      </div>
    </>
  );
}

export default FocusInsight;
