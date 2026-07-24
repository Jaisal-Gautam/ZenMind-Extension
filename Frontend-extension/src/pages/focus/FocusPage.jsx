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
    <main className="min-h-screen w-full mt-12  p-8 lg:p-4 xl:p-0">
      <section>
        <Timer />
      </section>
      <section className="mt-16 flex flex-col md:flex-row  gap-8 justify-between">
        <div className="w-full md:flex-2 border border-neutral-100 bg-neutral-secondary shadow-sm rounded-md p-4">
          <DurationSelector />
        </div>
        <div className="w-full md:flex-1 border border-neutral-100 bg-neutral-secondary shadow-sm rounded-md p-4">
          <FocusStats focus={focus} overview={overview} />
        </div>
      </section>
      <section className="flex mt-8 flex-col md:flex-row  gap-8 justify-between ">
        <div className="w-full md:flex-2 bg-neutral-secondary border border-neutral-100 shadow-sm rounded-md p-4">
          <DailyGoal />
        </div>
        <div className="w-full md:flex-4 border border-neutral-100  bg-neutral-secondary shadow-sm rounded-md ">
          <AudioPlayer />
        </div>
      </section>
    </main>
  );
}

export default FocusPage;
