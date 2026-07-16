import { createAsyncThunk } from "@reduxjs/toolkit";
import prefApi from "@/api/preference.api";

const ALLOWED_PREFERENCE_FIELDS = [
  "defaultFocusDuration",
  "dailyFocusGoal",
  "defaultMusic",
  "defaultMusicVolume",
  "musicLoop",
  "customPresets",
];

const filterPreferences = (preferences) => {
  if (!preferences || typeof preferences !== "object") {
    return {};
  }

  return ALLOWED_PREFERENCE_FIELDS.reduce((result, key) => {
    if (Object.prototype.hasOwnProperty.call(preferences, key)) {
      result[key] = preferences[key];
    }
    return result;
  }, {});
};

export const loadPreferences = createAsyncThunk(
  "settings/loadPreferences",
  async (_,{ rejectWithValue }) => {
    try {
      const res = await prefApi.getPreferences();
      return filterPreferences(res.preferences);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Preference Load Failed");
    }
  },
);

export const updatePreferences = createAsyncThunk(
  "settings/updatePreferences",
  async (data,{ rejectWithValue }) => {
    try {
      const res = await prefApi.updatePreferences(data);
      return filterPreferences(res.preferences);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Preference Load Failed");
    }
  },
);

