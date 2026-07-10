import UserPreference from "../models/userPreference.js";
import { ApiError } from "../utils/apiError.js";

export const createDefaultPreferences = async (userId) => {
  const userPref = await UserPreference.create({ user: userId });
  return userPref;
};

export const getPreferences = async (userId) => {
  const userPref = await UserPreference.findOne({ user: userId });
  if (!userPref) throw new ApiError(404, "User preferences not found.");
  return userPref;
};

export const updatePreferences = async (userId, updates) => {
  const allowedFields = [
    "defaultFocusDuration",
    "dailyFocusGoal",
    "defaultMusic",
    "defaultMusicVolume",
    "musicLoop",
    "customPresets",
  ];

  const filteredUpdates = Object.fromEntries(
    Object.entries(updates).filter(([key]) => allowedFields.includes(key)),
  );

  const userPreference = await UserPreference.findOneAndUpdate(
    { user: userId },
    filteredUpdates,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!userPreference) {
    throw new ApiError(404, "User preferences not found.");
  }

  return userPreference;
};
