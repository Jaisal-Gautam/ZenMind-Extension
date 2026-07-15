import apiClient from "./apiClient";

export const prefApi = {
  async getPreferences() {
    const response = await apiClient.get("/preferences");
    return response.data;
  },
  async updatePreferences(data) {
    const response =await apiClient.patch("/preferences",data)
    return response.data;
  },
};

export default prefApi;