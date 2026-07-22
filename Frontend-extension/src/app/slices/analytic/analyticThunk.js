import { createAsyncThunk } from "@reduxjs/toolkit";
import analyticApi from "@/api/analytics.api";


export const loadOverview = createAsyncThunk(
 "analytics/overview",
  async (_, { rejectWithValue }) => {
    try {
      const response = await analyticApi.getOverview();
      return response;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Overview Fetch failed",
      );
    }
  },
);
export const loadWebsiteAnalytics = createAsyncThunk(
 "analytics/web",
  async (_, { rejectWithValue }) => {
    try {
      const response = await analyticApi.webAnalytics();
      return response;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Web Analytics Fetch failed",
      );
    }
  },
);

export const loadFocusAnalytics = createAsyncThunk(
 "analytics/focus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await analyticApi.focusAnalytics();
      return response;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Focus Analytics failed",
      );
    }
  },
);

export const loadHistoryAnalytics = createAsyncThunk(
  "analytics/history",
  async (range = "daily", { rejectWithValue }) => {
    try {
      const response = await analyticApi.getHistory(range);
      return response;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "History fetch failed"
      );
    }
  }
);
