import apiClient from "./apiClient";
export const analyticApi = {
    async getOverview(){
        const response=await apiClient.get("/analytics/overview")
        return response.overview;
    },
    async webAnalytics(){
        const response=await apiClient.get("/analytics/websites")
        return response.websiteAnalytics;
    },
    async focusAnalytics(){
        const response=await apiClient.get("/analytics/focus")
        return response.focusAnalytics;
    },
}


export default analyticApi