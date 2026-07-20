import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getOverview,
  getWebsiteAnalytics,
  getFocusAnalytics,
  getHistory,
} from "../services/analytics.service.js";

export const getOverviewController = asyncHandler(async (req, res) => {
  const overview = await getOverview(req.user._id);
  res.status(200).json({
    success: true,
    message: "Overview analytics fetched successfully.",
    overview,
  });
});

export const getWebsiteAnalyticsController = asyncHandler(async (req, res) => {
  const websiteAnalytics = await getWebsiteAnalytics(req.user._id);
  res.status(200).json({
    success: true,
    message: "Website analytics fetched successfully.",
    websiteAnalytics,
  });
});

export const getFocusAnalyticsController = asyncHandler(async (req, res) => {
  const focusAnalytics = await getFocusAnalytics(req.user._id);
  res.status(200).json({
    success: true,
    message: "Focus analytics fetched successfully.",
    focusAnalytics,
  });
});

export const getHistoryController = asyncHandler(async (req, res) => {
    const history = await getHistory(req.user._id, req.query.range);

    res.status(200).json({
        success: true,
        message: "History fetched successfully.",
        history,
    });
});