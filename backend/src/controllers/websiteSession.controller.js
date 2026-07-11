import { asyncHandler } from "../utils/asyncHandler.js";
import {
  createWebsiteSession,
  getWebsiteHistory,
} from "../services/websiteSession.service.js";

export const createWebsiteSessionController = asyncHandler(async (req, res) => {
  const { domain, startTime, endTime, duration } = req.body;
  const websiteSession = await createWebsiteSession(
    req.user._id,
    domain,
    startTime,
    endTime,
    duration,
  );
  res.status(201).json({
    success: true,
    message: "Website Session Created Successfully",
    websiteSession,
  });
});

export const getWebsiteHistoryController = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const websiteSessionsHistory = await getWebsiteHistory(
    req.user._id,
    page,
    limit,
  );
  res.status(200).json({
    success: true,
    message: "Website Session History Fetched successfully.",
    websiteSessionsHistory,
  });
});
