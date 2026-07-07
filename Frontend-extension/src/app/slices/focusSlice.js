import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActive: false,
  isPaused: false,
  duration: 25,
  startTime: null,
  endTime: null,
  remainingTime: null,
  currentSessionId: null,
  sessionDuration: null,
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
      state.currentSessionId = null;
      state.sessionDuration = null;
    },
    pauseFocus: (state) => {
      state.isPaused = true;
      state.remainingTime = state.endTime - Date.now();
      state.isActive = false;
      state.endTime=null;
    },
    resumeFocus: (state) => {
      state.isPaused = false;
      state.isActive=true;
      state.endTime=Date.now()+state.remainingTime;
      state.remainingTime=null;
    },

    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    resetSetting: () => initialState,
    hydrate: (state, action) => {
  return action.payload;
},
  },
});

export const {
  startFocus,
  stopFocus,
  pauseFocus,
  resumeFocus,
  setDuration,
  resetSetting,
  hydrate,
} = focusSlice.actions;

export default focusSlice.reducer;
