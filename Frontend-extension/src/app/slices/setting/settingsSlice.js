import { createSlice } from "@reduxjs/toolkit";
import {
  loadPreferences,
  updatePreferences,
} from "./settingsThunk";

const initialState = {
  defaultFocusDuration: 30,
  dailyFocusGoal: 180,

  defaultMusic: "rain",
  defaultMusicVolume: 50,
  musicLoop: false,

  customPresets: [],

  loading: false,
  error: null,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,

  reducers: {
    setDefaultFocusDuration: (state, action) => {
      state.defaultFocusDuration = action.payload;
    },

    setDailyFocusGoal: (state, action) => {
      state.dailyFocusGoal = action.payload;
    },

    setDefaultMusic: (state, action) => {
      state.defaultMusic = action.payload;
    },

    setDefaultMusicVolume: (state, action) => {
      state.defaultMusicVolume = action.payload;
    },

    setMusicLoop: (state, action) => {
      state.musicLoop = action.payload;
    },

    addCustomPreset: (state, action) => {
      const preset = action.payload;

      const exists = state.customPresets.some(
        (p) => p.duration === preset.duration,
      );

      if (!exists) {
        state.customPresets.push(preset);
      }
    },

    removeCustomPreset: (state, action) => {
      const presetId = action.payload;

      state.customPresets = state.customPresets.filter(
        (preset) => preset.id !== presetId,
      );
    },

    resetSettings: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadPreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loadPreferences.fulfilled, (state, action) => {
        Object.assign(state, action.payload);

        state.loading = false;
        state.error = null;
      })

      .addCase(loadPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Preferences
      .addCase(updatePreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updatePreferences.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.loading = false;
        state.error = null;
      })

      .addCase(updatePreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setDefaultFocusDuration,
  setDailyFocusGoal,
  setDefaultMusic,
  setDefaultMusicVolume,
  setMusicLoop,
  addCustomPreset,
  removeCustomPreset,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;