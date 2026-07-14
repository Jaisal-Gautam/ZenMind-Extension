import axios from "axios";

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

export default apiClient;