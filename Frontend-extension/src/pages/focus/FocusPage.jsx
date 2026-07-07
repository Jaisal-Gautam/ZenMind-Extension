import { Timer } from "@/components/ui/Timer";
import DurationSelector from "@/components/ui/DurationSelector";
import FocusStats from "@/components/ui/FocusStats";
import AudioPlayer from "@/components/ui/AudioPlayer";
import DailyGoal from "@/components/ui/DailyGoal";
import { useSelector } from "react-redux";
import { buildAnalyticsData } from "@/utils/analyticService";
function FocusPage() {
   const analytics = useSelector((state) => state.analytics);
  const dashboard = buildAnalyticsData(analytics, "today");
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
          <FocusStats dashboardData={dashboard} />
        </div>
      </section>
      <section className="flex mt-8 flex-col md:flex-row  gap-8 justify-between ">
        <div className="w-full md:flex-2 bg-neutral-secondary border border-neutral-100 shadow-sm rounded-md p-4">
          <DailyGoal/>
        </div>
        <div className="w-full md:flex-4 border border-neutral-100  bg-neutral-secondary shadow-sm rounded-md ">
          <AudioPlayer />
        </div>
      </section>
    </main>
  );
}

export default FocusPage;
