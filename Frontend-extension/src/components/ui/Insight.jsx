import { Lightbulb, Brain } from "lucide-react";
import { useSelector } from "react-redux";
import { buildAnalyticsData } from "@/utils/analyticService";

function Insight() {
  const { focus } = useSelector(
    (state) => state.analytics,
  );
  const peak = focus?.peakFocusHour ?? {
    hour: 0,
    label: "12 AM - 1 AM",
  };
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
        <p className="text-neutral-primary  text-sm tracking-wide font-medium pr-2">
          You're most productive between{" "} <br />
          <span className="text-green-secondary tracking-wider font-semibold">
            {peak.label}
          </span>
          . Schedule deep work then!
        </p>
      </div>
    </div>
  );
}

export default Insight;
