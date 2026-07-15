import { createAsyncThunk } from "@reduxjs/toolkit";
import prefApi from "@/api/preference.api";
export const loadPreferences = createAsyncThunk(
  "settings/loadPreferences",
  async (_,{ rejectWithValue }) => {
    try {
        const res= await prefApi.getPreferences();
        return res.preferences;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Preference Load Failed");
    }
  },
);
export const updatePreferences = createAsyncThunk(
  "settings/updatePreferences",
  async (data,{ rejectWithValue }) => {
    try {
        const res= await prefApi.updatePreferences(data);
        return res.preferences;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Preference Load Failed");
    }
  },
);

