import { PopupTimer } from "@/components/ui/Timer";
import OpenDashboard from "@/components/ui/OpenDashboard";
import PopupGuardEnable from "@/components/ui/PopupGuardEnable";
import { PopupAudioPlayer } from "@/components/ui/AudioPlayer";
import { PopupDailyGoal } from "@/components/ui/DailyGoal";
import Insight from "@/components/ui/Insight";
function PopupContent() {
  return (
    <>
      <main className="min-h-full relative max-w-md bg-page dark:bg-app p-4">
        <PopupTimer />
        <PopupGuardEnable />
        <Insight />
        <PopupDailyGoal />
        <PopupAudioPlayer />
        <OpenDashboard />
      </main>
    </>
  );
}

export default PopupContent;
