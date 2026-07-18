import { GhostIllustration } from "../Card";
const MostBlocked = ({dashboardData}) => {
  const focus = dashboardData.blockedUsage;
  return (
    <div className="p-8 h-80 flex-1 flex flex-col rounded-xl w-sm bg-white shadow-sm overflow-hidden">
      <h2 className="text-2xl font-mono mb-4">Most Resisted</h2>
      <div className=" overflow-y-auto max-h-75 space-y-2">
        {focus.length === 0 ? (
          <span className="flex flex-col flex-1 items-center justify-center p-2 mt-12">
           <GhostIllustration/>
          </span>
        ) : (
          Object.entries(focus).map((item, idx) => (
            <div
              className="w-full bg-neutral-200 rounded-lg text-lg text-neutral-700 font-light py-2 px-4 flex justify-between"
              key={idx}
            >
              <span>{item[0]}</span>
              <span className="text-neutral-900 font-semibold">
                {item[1]} times
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MostBlocked;
