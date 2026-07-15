import { configureStore } from "@reduxjs/toolkit";

import { getData, setData } from "@/utils/chromeStorage";
import { DefaultState } from "@/utils/constants";

import authReducer from "./slices/auth/authSlice";
import focusReducer from "./slices/focusSlice";
import blockingReducer from "./slices/blockingSlice";
import analyticsReducer from "./slices/analyticsSlice";
import settingsReducer from "./slices/setting/settingsSlice";
import musicReducer from "./slices/musicSlice";

export const createAppStore = async () => {
  const persistedState = await getData();

  const preloadedState = {
    auth: DefaultState.auth,

    focus: {
      ...DefaultState.focus,
      ...persistedState?.focus,
    },

    blocking: {
      ...DefaultState.blocking,
      ...persistedState?.blocking,
    },

    analytics: {
      ...DefaultState.analytics,
      ...persistedState?.analytics,
    },

    settings: {
      ...DefaultState.settings,
      ...persistedState?.settings,
    },

    music: {
      ...DefaultState.music,
      ...persistedState?.music,
      currentTrack:
        persistedState?.music?.currentTrack ?? DefaultState.music.currentTrack,
    },
  };

  const store = configureStore({
    reducer: {
      auth: authReducer,
      focus: focusReducer,
      blocking: blockingReducer,
      analytics: analyticsReducer,
      settings: settingsReducer,
      music: musicReducer,
    },
    preloadedState,
  });

  store.subscribe(() => {
    const state = store.getState();

    const { auth, ...persistedState } = state;

    setData(persistedState);
  });

  return store;
};
