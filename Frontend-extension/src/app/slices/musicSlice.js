import { createSlice } from "@reduxjs/toolkit";
import { musicData } from "@/utils/musicTrack";

const initialState = {
  isPlaying: false,
  currentTrack: musicData[0],
  currentTime: 0,
  duration: 0,
  volume: 50,
  isLooping: false,
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    playMusic: (state) => {
      state.isPlaying = true;
    },

    pauseMusic: (state) => {
      state.isPlaying = false;
    },

    setTrack: (state, action) => {
      state.isPlaying = true;
      state.currentTrack = action.payload;
    },

    setVolume: (state, action) => {
      state.volume = action.payload;
    },

    toggleLoop: (state) => {
      state.isLooping = !state.isLooping;
    },

    syncAudioState: (state, action) => {
      const { isPlaying, currentTime, duration, volume, loop, src } =
        action.payload;

      state.isPlaying = isPlaying;
      state.currentTime = currentTime;
      state.duration = duration;
      state.volume = Math.round(volume * 100);
      state.isLooping = loop;

      const matchedTrack = musicData.find((track) => src?.includes(track.src));

      if (matchedTrack) {
        state.currentTrack = matchedTrack;
      }
    },

  },
});

export const {
  playMusic,
  pauseMusic,
  setTrack,
  setVolume,
  toggleLoop,
  syncAudioState,

} = musicSlice.actions;

export default musicSlice.reducer;
