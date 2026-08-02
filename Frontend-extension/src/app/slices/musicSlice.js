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

      const matchedTrack = musicData.find((track) => {
        if (!src || !track.src) return false;
        // Strip out query params/hashes or exact asset path matching
        const cleanSrc = src.split("?")[0].split("#")[0];
        const cleanTrackSrc = track.src.split("?")[0].split("#")[0];
        return cleanSrc.endsWith(cleanTrackSrc) || cleanTrackSrc.endsWith(cleanSrc) || cleanSrc.includes(cleanTrackSrc);
      });

      if (matchedTrack) {
        state.currentTrack = matchedTrack;
      }
    },
    initializeMusic: (state, action) => {
      const { trackId, volume, isLooping } = action.payload;

      const track =
        musicData.find((music) => music.id === trackId) || musicData[0];

      state.currentTrack = track;
      state.volume = volume;
      state.isLooping = isLooping;
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
  initializeMusic
} = musicSlice.actions;

export default musicSlice.reducer;
