export const STORAGE_KEY = "ZenMind-Data";
export const AUTH_KEY = "ZenMind-Auth";
const hasChromeStorage =
  typeof chrome !== "undefined" && chrome.storage && chrome.storage.local;

export const setData = async (state) => {
  try {


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
  hasChromeStorage
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

export const setAuth = async (auth) => {
  try {

    const serializedAuth = JSON.stringify(auth);

    if (hasChromeStorage) {
      await chrome.storage.local.set({
        [AUTH_KEY]: serializedAuth,
      });
    } else {
      localStorage.setItem(AUTH_KEY, serializedAuth);
    }
  } catch (error) {
    console.error("Error saving auth:", error);
  }
};

export const getAuth=async()=>{
  try {
    if (hasChromeStorage) {
      const result = await chrome.storage.local.get(AUTH_KEY);

      const serializedAuth = result[AUTH_KEY];

      if (!serializedAuth) return null;

      return JSON.parse(serializedAuth);
    }

    const serializedAuth = localStorage.getItem(AUTH_KEY);

    if (!serializedAuth) return null;

    return JSON.parse(serializedAuth);
  } catch (error) {
    console.error("Error loading auth:", error);
    return null;
  }

}
export const removeAuth=async ()=>{
  try {
    if (hasChromeStorage) {
      await chrome.storage.local.remove(AUTH_KEY);
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  } catch (error) {
    console.error("Error clearing auth:", error);
  }

}