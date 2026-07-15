import apiClient from "./apiClient";

export const authApi = {
  async register(userData) {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
  },

  async login(credentials) {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  },

  async me(){
    const response=await apiClient.get("/auth/me");
    return response.data;
  },
  
  async logout(){
    const response= await apiClient.post("/auth/logout");
    return response.data;
  }
};
