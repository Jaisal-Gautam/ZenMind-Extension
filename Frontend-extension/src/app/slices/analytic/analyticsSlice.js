import { createSlice } from "@reduxjs/toolkit";
import { getTodayKey } from "@/utils/todayDate";
import {
  loadOverview,
  loadFocusAnalytics,
  loadWebsiteAnalytics,
} from "./analyticThunk";

const initialState = {
  focusSessions: [],
  websiteUsage: {},
  dailyFocus: {},

  blockedAttempts: {},
  dailyBlockedAttempts: {},
  dailyWebsiteUsage: {},
  dailyBlockedWebsiteUsage: {},
  websiteSessions: [],

  // Backend analytics
  totalFocusTime: 0,

  todayFocusedTime: 0,
  focusSessionCount: 0,
  todayBlockedAttempts: 0,

  longestSession: 0,
  averageSession: 0,
  peakFocusHour: null,

  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,

  reducers: {
    addFocusSession: (state, action) => {
      const today = getTodayKey();

      state.focusSessions.push(action.payload);
      state.totalFocusTime += action.payload.duration;

      state.dailyFocus[today] =
        (state.dailyFocus[today] || 0) + action.payload.duration;
    },

    updateWebsiteUsage: (state, action) => {
      const { website, time } = action.payload;

      state.websiteUsage[website] =
        (state.websiteUsage[website] || 0) + time;
    },

    updateDailyFocus: (state, action) => {
      const { date, time } = action.payload;

      state.dailyFocus[date] =
        (state.dailyFocus[date] || 0) + time;
    },

    incrementTotalFocusTime: (state, action) => {
      state.totalFocusTime += action.payload;
    },

    incrementBlockedAttempt: (state, action) => {
      const website = action.payload;
      const today = getTodayKey();

      state.blockedAttempts[website] =
        (state.blockedAttempts[website] || 0) + 1;

      state.dailyBlockedAttempts[today] =
        (state.dailyBlockedAttempts[today] || 0) + 1;
    },

    resetAnalytics: () => initialState,
  },

  extraReducers: (builder) => {
    builder

      // ===========================
      // Overview
      // ===========================

      .addCase(loadOverview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loadOverview.fulfilled, (state, action) => {
        state.loading = false;

        state.todayFocusedTime = action.payload.focusedTime;
        state.focusSessionCount = action.payload.focusSessions;
        state.todayBlockedAttempts = action.payload.blockedAttempts;
      })

      .addCase(loadOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===========================
      // Website Analytics
      // ===========================

      .addCase(loadWebsiteAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loadWebsiteAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.websiteUsage = action.payload;
      })

      .addCase(loadWebsiteAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===========================
      // Focus Analytics
      // ===========================

      .addCase(loadFocusAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loadFocusAnalytics.fulfilled, (state, action) => {
        state.loading = false;

        state.totalFocusTime = action.payload.totalFocusTime;
        state.longestSession = action.payload.longestSession;
        state.averageSession = action.payload.averageSession;
        state.peakFocusHour = action.payload.peakFocusHour;
      })

      .addCase(loadFocusAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addFocusSession,
  updateWebsiteUsage,
  updateDailyFocus,
  incrementTotalFocusTime,
  incrementBlockedAttempt,
  resetAnalytics,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;