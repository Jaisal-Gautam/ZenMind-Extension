import { Clock, BadgeCheck, Flame, ShieldBan } from "lucide-react";
import WeekAnalyticsCard from "./WeekAnalyticsCard";
import { analyticsTime } from "@/utils/formatTime";

function AnalyticsCards({ overview }) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <WeekAnalyticsCard
        icon={<Clock className="text-brand-muted size-6 sm:size-8" />}
        heading="Focused Time"
        value={
          overview?.focusedTime ? analyticsTime(overview.focusedTime) : "0m"
        }
      />
      <WeekAnalyticsCard
        icon={<BadgeCheck className="text-brand-muted size-6 sm:size-8" />}
        heading="Focus Sessions"
        value={overview?.focusSessions ?? 0}
      />
      <WeekAnalyticsCard
        icon={
          <Flame
            className={`${(overview?.currentStreak ?? 0) < (overview?.longestStreak ?? 0)
                ? "text-danger"
                : "text-brand-muted"
              } size-6 sm:size-8`}
          />
        }
        heading="Streak"
        value={`${overview?.currentStreak ?? 0} Day${(overview?.currentStreak ?? 0) === 1 ? "" : "s"
          }`}
      />
      <WeekAnalyticsCard
        icon={<ShieldBan className="text-danger size-6 sm:size-8" />}
        heading="Distraction Blocked"
        value={overview?.blockedAttempts ?? 0}
      />
    </div>
  );
}

export default AnalyticsCards;