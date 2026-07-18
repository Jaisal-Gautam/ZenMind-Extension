import { Lightbulb, Brain } from "lucide-react";
import { useSelector } from "react-redux";
import { buildAnalyticsData } from "@/utils/analyticService";

function Insight() {
  const analytics = useSelector((state) => state.analytics);
  const dashboard = analytics ? buildAnalyticsData(analytics, "week") : null;

  // Determine the peak time using the logic from FocusChart
  let formattedPeakTime = "your peak hours";

  if (dashboard?.focus?.hourly?.length > 0) {
    const peak = dashboard.focus.hourly.reduce(
      (best, current) => (current.minutes > best.minutes ? current : best),
      dashboard.focus.hourly[0],
    );

    // If there is no focus data, don't show a misleading time.
    if (peak.minutes > 0) {
      const hour = Number(peak.hour);

      const startDisplayHour = hour % 12 || 12;
      const startPeriod = hour < 12 ? "AM" : "PM";

      const endHour = (hour + 1) % 24;
      const endDisplayHour = endHour % 12 || 12;
      const endPeriod = endHour < 12 ? "AM" : "PM";

      formattedPeakTime = `${startDisplayHour}:00 ${startPeriod} — ${endDisplayHour}:00 ${endPeriod}`;
    }
  }
  return (
    <div className="w-full relative overflow-visible bg-green-primary p-4 rounded-4xl border backdrop-blur-sm shadow-sm font-sans mt-4 z-0">
      {" "}
      {/* Subtle Background Graphic */}
      <div className="absolute -right-4 -bottom-2 opacity-10 pointer-events-none text-white">
        <Brain size={60} strokeWidth={1.5} />
      </div>
      <div className="relative z-10 flex flex-col gap-2">
        {/* Header Label */}
        <div className="flex items-center gap-3 text-neutral-primary">
          <Lightbulb size={20} strokeWidth={2.5} />
          <span className="text-sm font-semibold tracking-tight uppercase">
            Insight
          </span>
        </div>

        {/* Main Content */}
        <p className="text-neutral-primary  text-[14px] tracking-wide font-medium pr-2">
          You're most productive between{" "}
          <span className="text-green-secondary font-semibold">
            {formattedPeakTime}
          </span>
          . Schedule deep work then!
        </p>
      </div>
    </div>
  );
}

export default Insight;
