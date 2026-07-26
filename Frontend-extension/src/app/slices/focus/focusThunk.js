import { createAsyncThunk } from "@reduxjs/toolkit";
import { focusApi } from "@/api/focus.api";

export const startFocusSession = createAsyncThunk(
  "focus/startSession",
  async (plannedDuration, { rejectWithValue }) => {
    try {
      const response = await  focusApi.startFocus(plannedDuration);
      return response.focusSession;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || "Start Focus failed");
    }
  },
);

export const endFocusSession = createAsyncThunk(
  "focus/endSession",
  async (endReason, { rejectWithValue }) => {
    try {
      const response = await focusApi.endFocus(endReason);
      return response.focusSession;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || "End Focus failed");
    }
  },
);

export const loadFocusHistory = createAsyncThunk(
  "focus/loadHistory",
  async ({page=1, limit=20}={}, { rejectWithValue }) => {
    try {
      const response = await focusApi.getHistory(page, limit);
      return response.focusHistory;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || "History  failed");
    }
  },
);

export const loadCurrentFocusSession = createAsyncThunk(
  "focus/current",
  async (_, { rejectWithValue }) => {
    try {
      const response = await focusApi.getCurrentFocus();
      return response.focusSession;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || "Focus failed");
    }
  },
);
