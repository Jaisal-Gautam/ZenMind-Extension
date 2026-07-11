import { asyncHandler } from "../utils/asyncHandler.js";
import {
  createBlockedAttempt,
  getBlockedHistory,
} from "../services/blockedAttempt.service.js";

export const createBlockedAttemptController = asyncHandler(async (req, res) => {
  const { domain, mode, blockedAt } = req.body;
  const blockedAttempt = await createBlockedAttempt(
    req.user._id,
    domain,
    mode,
    blockedAt,
  );
  res.status(201).json({
    success: true,
    message: "Created Blocked Site Attempt  Successfully",
    blockedAttempt,
  });
});

export const getBlockedHistoryController = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const blockedAttemptHistory = await getBlockedHistory(
    req.user._id,
    page,
    limit,
  );
  res.status(200).json({
    success: true,
    message: "Blocked Attempt History Fetched successfully.",
    blockedAttemptHistory,
  });
});
