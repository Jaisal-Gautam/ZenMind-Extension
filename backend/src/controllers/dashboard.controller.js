import { asyncHandler } from "../utils/asyncHandler.js";
import { getPreferences } from "../services/preference.service.js";

import {
  getOverview,
  getWebsiteAnalytics,
  getFocusAnalytics,
  getHistory,
  getLifetimeAnalytics,
} from "../services/analytics.service.js";

export const getDashboard = asyncHandler(async (req, res) => {

  const [
    preferences,
    overview,
    lifetime,
    websiteAnalytics,
    focusAnalytics,
    history,
  ] = await Promise.all([
    getPreferences(req.user._id),
    getOverview(req.user),
    getLifetimeAnalytics(req.user),
    getWebsiteAnalytics(req.user),
    getFocusAnalytics(req.user),
    getHistory(req.user, req.query.range ?? "daily"),
  ]);


  res.status(200).json({
    success: true,
    message: "Dashboard data fetched successfully.",
    dashboard: {
      preferences,
      analytics: {
        overview,
        lifetime,
        focus: focusAnalytics,

        websites: {
          usage: websiteAnalytics.websiteAnalytics,
          blocked: websiteAnalytics.blockedWebsiteAnalytics,
        },
        history,
      },
    },
  });
});
