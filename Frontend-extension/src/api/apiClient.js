import axios from "axios";
import { getAuth, removeAuth, setAuth } from "@/utils/chromeStorage";
const baseURL = import.meta.env.VITE_BACKEND_URL;
if (!baseURL) {
  throw new Error("VITE_BACKEND_URL is not defined.");
}

const apiClient = axios.create({
  baseURL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

let refreshPromise = null;

const setAuthorizationHeader = (config, token) => {
  if (!token) {
    return;
  }

  if (config.headers && typeof config.headers.set === "function") {
    config.headers.set("Authorization", `Bearer ${token}`);
    return;
  }

  config.headers = {
    ...(config.headers || {}),
    Authorization: `Bearer ${token}`,
  };
};

const refreshAccessToken = async () => {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    const auth = await getAuth();

    if (!auth?.refreshToken) {
      throw new Error("No refresh token available.");
    }

    const response = await apiClient.post("/auth/refresh", {
      refreshToken: auth.refreshToken,
    });

    const accessToken = response?.data?.accessToken;

    if (!accessToken) {
      throw new Error("Refresh response did not include a new access token.");
    }

    await setAuth({
      ...auth,
      accessToken,
    });

    return accessToken;
  })();

  try {
    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
};

apiClient.interceptors.request.use(
  async (config) => {
    const auth = await getAuth();

    if (auth?.accessToken) {
      setAuthorizationHeader(config, auth.accessToken);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isAuthRefreshRequest = /\/auth\/refresh($|\?)/.test(originalRequest.url || "");

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRefreshRequest) {
      originalRequest._retry = true;

      try {
        const accessToken = await refreshAccessToken();
        setAuthorizationHeader(originalRequest, accessToken);

        return apiClient(originalRequest);
      } catch (err) {
        await removeAuth();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
