import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  defaultDuration: 30,
  customPresets: [],
  goal:180,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setDefaultDuration: (state, action) => {
      state.defaultDuration = action.payload;
    },
    addCustomPreset: (state, action) => {
      const preset = action.payload;
      const exists = state.customPresets.some((p) => p.value === preset.value);
      if (!exists) {
        state.customPresets.push(preset);
      }
    },
    setGoal:(state,action)=>{
      state.goal=action.payload;
    },
    removeCustomPreset: (state, action) => {
      const presetId = action.payload;
      state.customPresets = state.customPresets.filter(
        (preset) => preset.id !== presetId,
      );
    },
    resetSetting: () => initialState,

  },
});

export const { setDefaultDuration, addCustomPreset, removeCustomPreset,setGoal } =
  settingsSlice.actions;

export default settingsSlice.reducer;
