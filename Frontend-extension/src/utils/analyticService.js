import {
  getFocus,
  getBlockedAttempts,
  getWebsiteUsage,
  getBlockedWebsiteUsage,
  getFocusSessions,
  getWebsiteTimeline,
  getWebsiteTimelineChartData,
  getHourlyFocus,
  getCurrentStreak,
  getLongestStreak,
  getPeakFocusHour,
  getLongestSession,
  getAverageSessionLength,
} from "./analyticsHelpers";
import { getSanctuaryData } from "./sanctuary";

// -------------------------
// Summary
// -------------------------

const buildSummary = (analytics, period) => {
  if (period === "today") {
    return {
      focusedTime: analytics.todayFocusedTime,
      sessions: analytics.focusSessionCount,
      currentStreak: getCurrentStreak(analytics),
      longestStreak: getLongestStreak(analytics),
      blockedAttempts: analytics.todayBlockedAttempts,
    };
  }

  return {
    focusedTime: getFocus(analytics, period),
    sessions: getFocusSessions(analytics, period).length,
    currentStreak: getCurrentStreak(analytics),
    longestStreak: getLongestStreak(analytics),
    blockedAttempts: getBlockedAttempts(analytics, period),
  };
};

const buildWebsite = (analytics, period) => {
  const timeline = getWebsiteTimeline(analytics, period);

  return {
    usage: getWebsiteUsage(analytics, period),
    blockedUsage: getBlockedWebsiteUsage(analytics, period),
    timeline,
    timelineChart: getWebsiteTimelineChartData(timeline),
  };
};

const buildFocus = (analytics, period) => ({
  hourly: getHourlyFocus(analytics, period),
  peakHour: getPeakFocusHour(analytics),
  longestSession: getLongestSession(analytics),
  averageSession: getAverageSessionLength(analytics),
});
const buildSanctuary = (analytics) => {
  return {
    ...getSanctuaryData(analytics),
    totalFocusTime: analytics.totalFocusTime,
  };
};

export const buildAnalyticsData = (analytics, period) => ({
  summary: buildSummary(analytics, period),
  website: buildWebsite(analytics, period),
  focus: buildFocus(analytics, period),
  sanctuary: buildSanctuary(analytics),
});
