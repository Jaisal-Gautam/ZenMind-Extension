import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getOverview,
  getWebsiteAnalytics,
  getFocusAnalytics,
  getHistory,
  getLifetimeAnalytics
} from "../services/analytics.service.js";

export const getOverviewController = asyncHandler(async (req, res) => {

  const [overview, lifetime] = await Promise.all([
  getOverview(req.user),
  getLifetimeAnalytics(req.user),
]);


  res.status(200).json({
    success: true,
    message: "Overview analytics fetched successfully.",
    overview,
    lifetime,
  });
});

export const getWebsiteAnalyticsController = asyncHandler(async (req, res) => {
  const data = await getWebsiteAnalytics(req.user);

  res.status(200).json({
    success: true,
    message: "Website analytics fetched successfully.",
    ...data,
  });
});

export const getFocusAnalyticsController = asyncHandler(async (req, res) => {
  const focusAnalytics = await getFocusAnalytics(req.user);
  res.status(200).json({
    success: true,
    message: "Focus analytics fetched successfully.",
    focusAnalytics,
  });
});

export const getHistoryController = asyncHandler(async (req, res) => {
    const history = await getHistory(req.user, req.query.range);

    res.status(200).json({
        success: true,
        message: "History fetched successfully.",
        history,
    });
});