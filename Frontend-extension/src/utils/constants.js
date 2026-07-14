import { musicData } from "@/utils/musicTrack";

export const DefaultState = {
  auth: {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
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
  },

  blocking: {
    guardEnabled: false,
    activeMode: "Normal",
    blockedSites: [],
    deepFocusSites: [],
    strictWhitelist: [],
    blockedCategories: [],
    temporaryUnlocks: [],
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
    defaultDuration: 30,
    customPresets: [],
    goal: 180,
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