import { configureStore } from "@reduxjs/toolkit";

import { setData, getData } from "@/utils/chromeStorage";
import { DefaultState } from "@/utils/constants";

import focusReducer from "./slices/focusSlice";
import blockingReducer from "./slices/blockingSlice";
import analyticsReducer from "./slices/analyticsSlice";
import settingsReducer from "./slices/settingsSlice";
import musicReducer from "./slices/musicSlice";
export const createAppStore = async () => {
  const persistedState = await getData();

  const preloadedState = {
    ...DefaultState,
    ...persistedState,

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
      focus: focusReducer,
      blocking: blockingReducer,
      analytics: analyticsReducer,
      settings: settingsReducer,
      music: musicReducer,
    },
    preloadedState,
  });

  store.subscribe(() => {


    setData(store.getState());
  });

  return store;
};
