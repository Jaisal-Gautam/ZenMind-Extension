import axios from "axios";
import { getAuth } from "@/utils/chromeStorage";
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
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;