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
  async (status, { rejectWithValue }) => {
    try {
      const response = await focusApi.endFocus(status);
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
export const pauseFocusSession = createAsyncThunk(
  "focus/pauseSession",
  async (_, { rejectWithValue }) => {
    try {
      const response = await focusApi.pauseFocus();
      return response.focusSession;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const resumeFocusSession = createAsyncThunk(
  "focus/resumeSession",
  async (_, { rejectWithValue }) => {
    try {
      const response = await focusApi.resumeFocus();
      return response.focusSession;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);