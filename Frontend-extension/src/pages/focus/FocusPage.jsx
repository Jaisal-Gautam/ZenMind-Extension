import { Timer } from "@/components/ui/Timer";
import DurationSelector from "@/components/ui/DurationSelector";
import FocusStats from "@/components/ui/FocusStats";
import AudioPlayer from "@/components/ui/AudioPlayer";
import DailyGoal from "@/components/ui/DailyGoal";
import { useSelector } from "react-redux";
import Loader from "@/components/Loader";
function FocusPage() {
  const { overview, focus, loading } = useSelector((state) => state.analytics);
  if (loading || !overview || !focus) {
    return <Loader />;
  }
  return (
    <main className="w-full mt-6 md:mt-12 px-3 sm:px-6 lg:px-4 xl:px-0 pb-8">
      <section>
        <Timer />
      </section>
      <section className="mt-6 md:mt-12 flex flex-col md:flex-row gap-4 md:gap-8 justify-between">
        <div className="w-full md:flex-2 border border-border-light bg-page dark:bg-app shadow-sm rounded-md p-3 sm:p-4">
          <DurationSelector />
        </div>
        <div className="w-full md:flex-1 border border-border-light bg-page dark:bg-app shadow-sm rounded-md p-3 sm:p-4">
          <FocusStats focus={focus} overview={overview} />
        </div>
      </section>
      <section className="flex mt-4 md:mt-8 flex-col md:flex-row gap-4 md:gap-8 justify-between">
        <div className="w-full md:flex-2 border border-border-light bg-page dark:bg-app shadow-sm rounded-md p-3 sm:p-4">
          <DailyGoal />
        </div>
        <div className="w-full md:flex-4 border border-border-light bg-page dark:bg-app shadow-sm rounded-md p-3 sm:p-4">
          <AudioPlayer />
        </div>
      </section>
    </main>
  );
}

export default FocusPage;
