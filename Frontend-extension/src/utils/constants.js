import { musicData } from "@/utils/musicTrack";

export const DefaultState = {
  auth: {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    initialized: false,
  },

  focus: {
    isActive: false,
    isPaused: false,
    duration: 25,
    startTime: null,
    endTime: null,
    remainingTime: null,
    currentSessionId: null,
    sessionDuration: null,
    loading: false,
error: null,
history: [],
  },

  blocking: {
    guardEnabled: false,
    activeMode: "Normal",
    blockedSites: [],
    deepFocusSites: [],
    strictWhitelist: [],
    blockedCategories: [],
    loading: false,
  error: null,
  },

  analytics: {
    focusSessions: [],
    websiteUsage: {},
    dailyFocus: {},
    totalFocusTime: 0,
    blockedAttempts: {},
    dailyBlockedAttempts: {},
    dailyWebsiteUsage: {},
    dailyBlockedWebsiteUsage: {},
    websiteSessions: [],
  },

  settings: {
    defaultFocusDuration: 30,
    dailyFocusGoal: 180,
    defaultMusic: "rain",
    defaultMusicVolume: 50,
    musicLoop: false,
    customPresets: [],
    loading: false,
    error: null,
  },

  music: {
    isPlaying: false,
    currentTrack: musicData[0],
    currentTime: 0,
    duration: 0,
    volume: 50,
    isLooping: false,
  },
};
