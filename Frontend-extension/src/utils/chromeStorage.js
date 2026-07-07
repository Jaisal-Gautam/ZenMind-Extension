const STORAGE_KEY = "ZenMind-Data";

const hasChromeStorage =
  typeof chrome !== "undefined" &&
  chrome.storage &&
  chrome.storage.local;

export const setData = async (state) => {
  try {
    console.log("Saving", state);

    const serializedState = JSON.stringify(state);

    if (hasChromeStorage) {
      await chrome.storage.local.set({
        [STORAGE_KEY]: serializedState,
      });
    } else {
      localStorage.setItem(STORAGE_KEY, serializedState);
    }
  } catch (error) {
    console.error("Error saving state:", error);
  }
};

export const getData = async () => {
  try {
    if (hasChromeStorage) {
      const result = await chrome.storage.local.get(STORAGE_KEY);

      const serializedState = result[STORAGE_KEY];

      if (!serializedState) return null;

      return JSON.parse(serializedState);
    }

    const serializedState = localStorage.getItem(STORAGE_KEY);

    if (!serializedState) return null;

    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading state:", error);
    return null;
  }
};

export const removeData = async () => {
  try {
    if (hasChromeStorage) {
      await chrome.storage.local.remove(STORAGE_KEY);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.error("Error clearing state:", error);
  }
};
