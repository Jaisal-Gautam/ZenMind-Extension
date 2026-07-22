import { createSlice } from "@reduxjs/toolkit";
import {
  loadOverview,
  loadFocusAnalytics,
  loadWebsiteAnalytics,
  loadHistoryAnalytics,
} from "./analyticThunk";

const initialState = {
  overview: null,
  focus: null,
  lifetime:null,
  websites: {
    usage: [],
    blocked: [],
  },
  history: [],
  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // Overview
      .addCase(loadOverview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.overview = action.payload.overview;
        state.lifetime=action.payload.lifetime;
         
      })
      .addCase(loadOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Websites
      .addCase(loadWebsiteAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadWebsiteAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.websites = {
          usage: action.payload.websiteAnalytics,
          blocked: action.payload.blockedWebsiteAnalytics,
        };
      })
      .addCase(loadWebsiteAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Focus
      .addCase(loadFocusAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadFocusAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.focus = action.payload;
      })
      .addCase(loadFocusAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadHistoryAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loadHistoryAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })

      .addCase(loadHistoryAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default analyticsSlice.reducer;
