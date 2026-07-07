import { usageTime } from "@/utils/formatTime";
import { GhostIllustration } from "../Card";
const MostUsed = ({ dashboardData }) => {
  const focus = dashboardData.usage;
  return (
    <div className="p-8 h-80 flex flex-col rounded-xl w-sm bg-white shadow-sm overflow-hidden">
      <h2 className="text-2xl font-mono mb-4">Most Used</h2>
      <div className=" overflow-y-auto max-h-75 space-y-2">
        {Object.keys(focus).length === 0 ? (
          <span className="flex flex-col flex-1 items-center justify-center p-2 mt-12">
            <GhostIllustration />
          </span>
        ) : (
          Object.entries(focus)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([site, value]) => (
              <div
                className="w-full bg-neutral-200 rounded-lg text-lg text-neutral-700 font-light py-2 px-4 flex justify-between"
                key={site}
              >
                <span>{site}</span>{" "}
                <span className="text-neutral-900 font-semibold">
                  {usageTime(value)}
                </span>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default MostUsed;
