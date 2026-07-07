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

const buildSummary = (analytics, period) => ({
  focusedTime: getFocus(analytics, period),
  sessions: getFocusSessions(analytics, period),
  currentStreak: getCurrentStreak(analytics),
  longestStreak: getLongestStreak(analytics),
  blockedAttempts: getBlockedAttempts(analytics, period),
});


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
  peakHour: getPeakFocusHour(analytics, period),
  longestSession: getLongestSession(analytics, period),
  averageSession: getAverageSessionLength(analytics, period),
});

const buildSanctuary = (analytics) => {
  return {...getSanctuaryData(analytics),
  totalFocusTime: analytics.totalFocusTime}
};



export const buildAnalyticsData = (analytics, period) => ({
  summary: buildSummary(analytics, period),
  website: buildWebsite(analytics, period),
  focus: buildFocus(analytics, period),
  sanctuary: buildSanctuary(analytics),
});