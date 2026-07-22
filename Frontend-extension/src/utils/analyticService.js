import { getSanctuaryData } from "./sanctuary";

const buildSanctuary = (analytics = {}) => ({
  ...getSanctuaryData(analytics),
  totalFocusTime: analytics.totalFocusTime ?? 0,
});

export const buildAnalyticsData = (analytics = {}) => ({
  sanctuary: buildSanctuary(analytics),
});