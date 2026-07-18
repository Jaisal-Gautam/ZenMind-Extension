import { usageTime } from "@/utils/formatTime";
import { GhostIllustration } from "../Card";
const MostUsed = ({ dashboardData }) => {
  const focus = dashboardData.usage;
  return (
    <div className="p-8 h-80 flex flex-col rounded-xl w-sm bg-white shadow-sm overflow-hidden">
      <h2 className="text-2xl font-mono mb-4">Most Used</h2>
      <div className=" overflow-y-auto max-h-75 space-y-2">
        {focus.length === 0? (
          <span className="flex flex-col flex-1 items-center justify-center p-2 mt-12">
            <GhostIllustration />
          </span>
        ) : (
          focus
            .sort((a, b) => b.duration - a.duration)
            .slice(0, 5)
            .map((site) => (
              <div key={site.domain}>
                <span>{site.domain}</span>

                <span>{usageTime(site.duration)}</span>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default MostUsed;
