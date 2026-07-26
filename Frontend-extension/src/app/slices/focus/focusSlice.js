import { createSlice } from "@reduxjs/toolkit";
import {
  startFocusSession,
  endFocusSession,
  loadFocusHistory,
} from "./focusThunk";

const initialState = {
  // Runtime timer state
  isActive: false,
  isPaused: false,
  duration: 25,
  startTime: null,
  endTime: null,
  remainingTime: null,
  currentSessionId: null,
  sessionDuration: null,

  // API state
  loading: false,
  error: null,
  history: [],
};

const focusSlice = createSlice({
  name: "focus",
  initialState,

  reducers: {
    startFocus: (state, action) => {
      const { startTime, endTime, sessionId, sessionDuration } = action.payload;

      state.isActive = true;
      state.isPaused = false;
      state.startTime = startTime;
      state.endTime = endTime;
      state.currentSessionId = sessionId;
      state.sessionDuration = sessionDuration;
    },

    stopFocus: (state) => {
      state.isActive = false;
      state.isPaused = false;
      state.startTime = null;
      state.endTime = null;
      state.remainingTime = null;
      state.currentSessionId = null;
      state.sessionDuration = null;
    },

    pauseFocus: (state) => {
      state.isPaused = true;
      state.isActive = false;
      state.remainingTime = state.endTime - Date.now();
      state.endTime = null;
    },

    resumeFocus: (state) => {
      state.isPaused = false;
      state.isActive = true;
      state.endTime = Date.now() + state.remainingTime;
      state.remainingTime = null;
    },

    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    syncFocusState: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    resetFocus: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      // Start Focus
      .addCase(startFocusSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startFocusSession.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(startFocusSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // End Focus
      .addCase(endFocusSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(endFocusSession.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(endFocusSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Load History
      .addCase(loadFocusHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadFocusHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.history = action.payload;
      })
      .addCase(loadFocusHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  startFocus,
  stopFocus,
  pauseFocus,
  resumeFocus,
  setDuration,
  resetFocus,
  syncFocusState,
} = focusSlice.actions;

export default focusSlice.reducer;
