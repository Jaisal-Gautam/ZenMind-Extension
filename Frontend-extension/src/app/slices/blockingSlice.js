import { createSlice } from "@reduxjs/toolkit";
import parseDomain from "@/utils/siteParser";

const initialState = {
  guardEnabled: false,
  activeMode: "Normal",
  blockedSites: [],
  deepFocusSites: [],
  strictWhitelist: [],
  blockedCategories: [],
  temporaryUnlocks: [],
};

const blockingSlice = createSlice({
  name: "blocking",
  initialState,

  reducers: {
    toggleGuard: (state) => {
      state.guardEnabled = !state.guardEnabled;
    },

    setMode: (state, action) => {
      state.activeMode = action.payload;
    },

    addBlockedSite: (state, action) => {
      const website = parseDomain(action.payload.website);

      if (!state.blockedSites.includes(website)) {
        state.blockedSites.push(website);
      }
    },

    removeBlockedSite: (state, action) => {
      const website = parseDomain(action.payload.website);

      state.blockedSites = state.blockedSites.filter(
        (site) => site !== website,
      );
    },

    addDeepFocusSite: (state, action) => {
      const website = parseDomain(action.payload.website);

      if (!state.deepFocusSites.includes(website)) {
        state.deepFocusSites.push(website);
      }
    },

    removeDeepFocusSite: (state, action) => {
      const website = parseDomain(action.payload.website);

      state.deepFocusSites = state.deepFocusSites.filter(
        (site) => site !== website,
      );
    },

    addStrictWhitelistSite: (state, action) => {
      const website = parseDomain(action.payload.website);

      if (!state.strictWhitelist.includes(website)) {
        state.strictWhitelist.push(website);
      }
    },

    removeStrictWhitelistSite: (state, action) => {
      const website = parseDomain(action.payload.website);

      state.strictWhitelist = state.strictWhitelist.filter(
        (site) => site !== website,
      );
    },
    toggleCategory: (state, action) => {
      const id = action.payload;
      if (!state.blockedCategories.includes(id)) {
        state.blockedCategories.push(id);
      } else {
        state.blockedCategories = state.blockedCategories.filter(
          (categoryId) => categoryId !== id,
        );
      }
    },
    addTemporaryUnlock: (state, action) => {
      const { domain, minutes } = action.payload;
      const expiresAt = Date.now() + minutes * 60 * 1000;
      state.temporaryUnlocks = state.temporaryUnlocks.filter(
        (item) => item.domain !== domain,
      );
      state.temporaryUnlocks.push({
        domain,
        expiresAt,
      });
    },

    removeTemporaryUnlock: (state, action) => {
      state.temporaryUnlocks = state.temporaryUnlocks.filter(
        (item) => item.domain !== action.payload,
      );
    },
    hydrate: (state, action) => {
  return action.payload;
},
  },
});

export const {
  toggleGuard,
  setMode,
  addBlockedSite,
  removeBlockedSite,
  addDeepFocusSite,
  removeDeepFocusSite,
  addStrictWhitelistSite,
  removeStrictWhitelistSite,
  toggleCategory,
  hydrate,
} = blockingSlice.actions;

export default blockingSlice.reducer;
