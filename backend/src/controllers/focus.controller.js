import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getFocusHistory,
  startFocusSession,
  endFocusSession,
  getCurrentFocusSession,
} from "../services/focus.service.js";

export const startFocusSessionController = asyncHandler(async (req, res) => {
  const { plannedDuration } = req.body;
  const focusSession = await startFocusSession(req.user._id, plannedDuration);
  res.status(201).json({
    success: true,
    message: "Focus session started successfully.",
    focusSession,
  });
});

export const endFocusSessionController = asyncHandler(async (req, res) => {
  const { endReason } = req.body;
  const focusSession = await endFocusSession(req.user._id, endReason);
  res.status(200).json({
    success: true,
    message: "Focus session ended successfully.",
    focusSession,
  });
});

export const getFocusHistoryController = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const focusHistory = await getFocusHistory(req.user._id, page,limit);
  res.status(200).json({
    success: true,
    message: "Focus History Fetched successfully.",
    focusHistory,
  });
});

export const getCurrentFocusSessionController = asyncHandler(async (req, res) => {
const focusSession = await getCurrentFocusSession(req.user._id);
  res.status(200).json({
    success: true,
    message: "Unfinished FocusSession Fetched successfully.",
    focusSession,
  });
});
