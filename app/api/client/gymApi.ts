import { apiClient } from ".";

export const getNearbyGyms = async (params?: { latitude?: number; longitude?: number; limit?: number }) => {
  try {
    const response = await apiClient.get("customer/gyms/near-you", {
      params: { limit: 4, ...params },
    });
   
    return response.data;
  } catch (error) {
    console.error("Failed to fetch nearby gyms:", error);
    throw error;
  }
};

export const getGyms = async (params?: { q?: string; search?: string; limit?: number }) => {
  try {
    const response = await apiClient.get("customer/gyms", { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch gyms:", error);
    throw error;
  }
};

