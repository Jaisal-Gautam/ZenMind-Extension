import { Clock, BadgeCheck, Flame, ShieldBan } from "lucide-react";
import WeekAnalyticsCard from "./WeekAnalyticsCard";
import { analyticsTime } from "@/utils/formatTime";

function AnalyticsCards({ overview }) {
  return (
    <div className="w-full flex flex-col md:flex-row  gap-4">
      <WeekAnalyticsCard
        icon={<Clock className="text-green-secondary size-8" />}
        heading="Focused Time"
        value={analyticsTime(overview?.focusedTime ?? 0)}
      />
      <WeekAnalyticsCard
        icon={<BadgeCheck className="text-green-secondary size-8" />}
        heading="Focus Sessions"
        value={overview?.focusSessions ?? 0}
      />
      <WeekAnalyticsCard
        icon={
          <Flame
            className={`${
              (overview?.currentStreak ?? 0) < (overview?.longestStreak ?? 0)
                ? "text-green-secondary"
                : "text-[#D01C1F]"
            } size-8`}
          />
        }
        heading="Streak"
        value={`${overview?.currentStreak ?? 0} Day${
          (overview?.currentStreak ?? 0) === 1 ? "" : "s"
        }`}
      />
      <WeekAnalyticsCard
        icon={<ShieldBan className="text-red-700 size-8" />}
        heading="Distraction Blocked"
        value={overview?.blockedAttempts ?? 0}
      />
    </div>
  );
}

export default AnalyticsCards;
