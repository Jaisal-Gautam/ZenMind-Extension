import { createSlice } from "@reduxjs/toolkit";
import { getTodayKey } from "@/utils/todayDate";
const initialState = {
  focusSessions: [],
  websiteUsage: {},
  dailyFocus: {},
  totalFocusTime: 0,
  blockedAttempts: {},
  dailyBlockedAttempts: {},
  dailyWebsiteUsage: {},
  dailyBlockedWebsiteUsage: {},
  websiteSessions: []
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
      state.websiteUsage[website] = (state.websiteUsage[website] || 0) + time;
    },
    updateDailyFocus: (state, action) => {
      const { date, time } = action.payload;
      state.dailyFocus[date] = (state.dailyFocus[date] || 0) + time;
    },
    incrementTotalFocusTime: (state, action) => {
      state.totalFocusTime += action.payload;
    },
    incrementBlockedAttempt: (state, action) => {
      console.log("Blocked attempt reducer fired");
      console.log(today);
      const website = action.payload;
      const today = getTodayKey();
      state.blockedAttempts[website] =
        (state.blockedAttempts[website] || 0) + 1;
      state.dailyBlockedAttempts[today] =
        (state.dailyBlockedAttempts[today] || 0) + 1;
    },
    resetAnalytics: () => initialState,
  },
});

export const {
  addFocusSession,
  updateWebsiteUsage,
  updateDailyFocus,
  incrementTotalFocusTime,
  resetAnalytics,
  incrementBlockedAttempt,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
