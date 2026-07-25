import { GhostIllustration } from "../Card";
const MostBlocked = ({ blocked=[] }) => {
  return (
    <div className="p-8 h-80 flex-1 flex flex-col rounded-xl w-sm bg-surface dark:bg-app shadow-sm border border-border-default overflow-hidden">
      <h2 className="text-2xl text-text font-mono mb-4">Most Resisted</h2>
      <div className="overflow-y-auto max-h-75 space-y-2">
        {blocked.length === 0 ? (
          <span className="flex flex-col flex-1 items-center justify-center p-2 mt-12">
            <GhostIllustration className />
          </span>
        ) : (
          blocked.map((site) => (
            <div
              key={site.domain}
              className="w-full flex justify-between rounded-lg bg-surface px-4 py-2 text-lg font-light text-text-soft transition-colors hover:bg-surface-muted border border-border-default duration-300 ease-in"
            >
              <span>{site.domain}</span>

              <span className="text-text font-semibold">
                {site.attempts} times
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MostBlocked;
