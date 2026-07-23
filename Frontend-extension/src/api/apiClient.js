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
apiClient.interceptors.request.use(
  async (config) => {
    const auth = await getAuth();

    if (auth?.accessToken) {
      config.headers.set(
        "Authorization",
        `Bearer ${auth.accessToken}`
      );
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
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const auth = await getAuth();
        if (!auth || !auth.refreshToken) {
          await removeAuth();
          return Promise.reject(error);
        }
        const response = await axios.post(`${baseURL}/auth/refresh`, {
          refreshToken: auth.refreshToken,
        });

        const { accessToken } = response.data;

        await setAuth({
          ...auth,
          accessToken,
        });

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return apiClient(originalRequest);
      } catch (err) {
        await removeAuth();

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
