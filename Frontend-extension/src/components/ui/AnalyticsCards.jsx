import { Clock, BadgeCheck, Flame, ShieldBan } from "lucide-react";
import WeekAnalyticsCard from "./WeekAnalyticsCard";
import { analyticsTime } from "@/utils/formatTime";

function AnalyticsCards({ dashboardData }) {
  return (
    <div className="w-full flex flex-col md:flex-row  gap-4">
      <WeekAnalyticsCard
        icon={<Clock className="text-green-secondary size-8" />}
        heading="Focused Time"
        value={analyticsTime(dashboardData.focusedTime)}
      />
      <WeekAnalyticsCard
        icon={<BadgeCheck className="text-green-secondary size-8" />}
        heading="Focus Sessions"
        value={dashboardData.sessions.length}
      />
      <WeekAnalyticsCard
        icon={
          <Flame
            className={`${dashboardData.currentStreak < dashboardData.longestStreak? "text-green-secondary" : "text-[#D01C1F]"} size-8`}
          />
        }
        heading="Streak"
        value={`${dashboardData.currentStreak} Day${dashboardData.currentStreak === 1 ? "" : "s"}`}
      />
      <WeekAnalyticsCard
        icon={<ShieldBan className="text-red-700 size-8" />}
        heading="Distraction Blocked"
        value={dashboardData.blockedAttempts}
      />
    </div>
  );
}

export default AnalyticsCards;
