import { createSlice } from "@reduxjs/toolkit";
import {
  startFocusSession,
  endFocusSession,
  loadFocusHistory,
  loadCurrentFocusSession,
  pauseFocusSession,
  resumeFocusSession,
} from "./focusThunk";
const initialState = {
  // Runtime timer state
  isActive: false,
  isPaused: false,
  duration: 25,
  startTime: null,

  remainingTime: null,
  currentSessionId: null,
  sessionDuration: null,
  lastResumedAt: null,
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
      const { startTime, sessionId, sessionDuration } = action.payload;

      state.isActive = true;
      state.isPaused = false;

      state.startTime = startTime;
      state.lastResumedAt = startTime;

      state.currentSessionId = sessionId;
      state.sessionDuration = sessionDuration;

      state.remainingTime = sessionDuration * 60 * 1000;
    },

    stopFocus: (state) => {
      state.isActive = false;
      state.isPaused = false;

      state.startTime = null;
      state.remainingTime = null;
      state.currentSessionId = null;
      state.sessionDuration = null;
      state.lastResumedAt = null;
    },

    pauseFocus: (state) => {
      if (!state.lastResumedAt) return;

      const elapsed = Date.now() - state.lastResumedAt;

      state.remainingTime = Math.max(0, state.remainingTime - elapsed);

      state.isPaused = true;
      state.isActive = false;

      state.lastResumedAt = null;
    },

    resumeFocus: (state, action) => {
      state.isPaused = false;
      state.isActive = true;

      state.lastResumedAt = action.payload ?? Date.now();
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
    pauseOnBrowserRestart: (state) => {
      if (!state.lastResumedAt) return;

      const elapsed = Date.now() - state.lastResumedAt;

      state.remainingTime = Math.max(0, state.remainingTime - elapsed);

      state.isActive = false;
      state.isPaused = true;
      state.lastResumedAt = null;
    },
    resetFocus: () => initialState,
  },

  extraReducers: (builder) => {
    builder
    .addCase(pauseFocusSession.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(pauseFocusSession.fulfilled, (state) => {
  state.loading = false;
})
.addCase(pauseFocusSession.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

.addCase(resumeFocusSession.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(resumeFocusSession.fulfilled, (state) => {
  state.loading = false;
})
.addCase(resumeFocusSession.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})
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
      })

      .addCase(loadCurrentFocusSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCurrentFocusSession.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const session = action.payload;

        if (!session) return;

        const totalDurationMs = session.plannedDuration * 60 * 1000;

        state.startTime = new Date(session.startTime).getTime();
        state.currentSessionId = session._id;
        state.sessionDuration = session.plannedDuration;

        state.remainingTime = Math.max(
          0,
          totalDurationMs - session.actualDuration * 1000,
        );

        state.isPaused = session.isPaused;
        state.isActive = !session.isPaused;

        state.lastResumedAt = session.lastResumedAt
          ? new Date(session.lastResumedAt).getTime()
          : null;
      })
      .addCase(loadCurrentFocusSession.rejected, (state, action) => {
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
  pauseOnBrowserRestart,
} = focusSlice.actions;

export default focusSlice.reducer;
