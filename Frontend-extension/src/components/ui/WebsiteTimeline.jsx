import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  getWebsiteTimeline,
  getWebsiteTimelineChartData,
} from "@/utils/analyticsHelpers";

const WebsiteTimeline = ({ period }) => {
  const analytics = useSelector((state) => state.analytics);
  console.log("Check",analytics.websiteSessions);
  const sessions = getWebsiteTimeline(analytics, period);
  const chartData = getWebsiteTimelineChartData(sessions);

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );

  const grouped = useMemo(() => {
    const groups = {};

    chartData.forEach((session) => {
      if (!groups[session.website]) {
        groups[session.website] = [];
      }

      groups[session.website].push(session);
    });

    return groups;
  }, [chartData]);

  console.log("Sessions:", sessions);
  console.log("Chart Data:", chartData);
  console.log("Grouped:", grouped);
  return (
    <div className="w-full rounded-xl max-h-150 bg-white shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-8">Website Activity</h2>

      {Object.keys(grouped).length > 0 && (
        <div className="flex mb-6">
          <div className="w-40" />

          <div className="flex-1 grid grid-cols-24 border-b border-neutral-300 pb-2 text-xs text-neutral-500">
            {hours.map((hour) => (
              <div key={hour} className="text-center">
                {hour}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-5 max-h-50 overflow-scroll">
        {Object.entries(grouped).map(([website, websiteSessions]) => (
          <div key={website} className="flex items-center">
            <div className="w-40 truncate pr-4 text-sm font-medium">
              {website}
            </div>

            <div className="relative h-5 flex-1  rounded-lg border border-neutral-200 bg-neutral-50 overflow-hidden">
              {/* Hour Grid */}
              <div className="absolute inset-0 grid grid-cols-24">
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="border-r flex item justify-center border-neutral-200 last:border-r-0"
                  />
                ))}
              </div>

              {/* Sessions */}
              {websiteSessions.map((session, index) => {
                const left = (session.startHour / 24) * 100;

                const width = Math.max(
                  ((session.endHour - session.startHour) / 24) * 100,
                  0.5,
                );

                return (
                  <div
                    key={index}
                    className="absolute  h-full rounded-none  bg-green-secondary"
                    style={{
                      left: `${left}%`,
                      width: `${width}%`,
                    }}
                    title={`${session.website} • ${session.duration} min`}
                  />
                );
              })}
            </div>
          </div>
        ))}

        {Object.keys(grouped).length === 0 && (
          <div className="flex h-40 items-center justify-center text-neutral-500">
            No website activity found.
          </div>
        )}
      </div>
    </div>
  );
};

export default WebsiteTimeline;
