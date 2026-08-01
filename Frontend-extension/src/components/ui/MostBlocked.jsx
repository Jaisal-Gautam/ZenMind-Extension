import { GhostIllustration } from "../Card";

const MostBlocked = ({ blocked = [] }) => {
  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-72 sm:h-80 flex-1 flex flex-col rounded-xl w-full md:w-sm bg-surface dark:bg-app shadow-sm border border-border-default overflow-hidden">
      <h2 className="text-xl sm:text-2xl text-text font-mono mb-3 sm:mb-4">
        Most Resisted
      </h2>
      <div className="overflow-y-auto max-h-75 space-y-2 pr-1">
        {blocked.length === 0 ? (
          <span className="flex flex-col flex-1 items-center justify-center p-2 mt-6 sm:mt-12">
            <GhostIllustration className="" />
          </span>
        ) : (
          blocked.map((site) => (
            <div
              key={site.domain}
              className="w-full flex justify-between items-center rounded-lg bg-surface px-3 sm:px-4 py-2 text-sm sm:text-base md:text-lg font-light text-text-soft transition-colors hover:bg-surface-muted border border-border-default duration-300 ease-in"
            >
              <span className="truncate max-w-[60%]">{site.domain}</span>

              <span className="text-text font-semibold whitespace-nowrap">
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