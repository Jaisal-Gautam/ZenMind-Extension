import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getPreferences,
  updatePreferences,
} from "../services/preference.service.js";
export const getPreferencesController = asyncHandler(async (req, res) => {
  const preferences = await getPreferences(req.user._id);

  res.status(200).json({
    success: true,
    message: "Preferences fetched successfully.",
    preferences,
  });
});

export const updatePreferencesController = asyncHandler(async (req, res) => {
  const preferences = await updatePreferences(req.user._id, req.body);

  res.status(200).json({
    success: true,
    message: "Preferences updated successfully.",
    preferences,
  });
});