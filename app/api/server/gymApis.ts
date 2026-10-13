import { apiServer } from ".";

// Fetch gyms near user (default limit: 4)
export const getNearbyGyms = async (params?: { latitude?: number; longitude?: number; limit?: number }) => {
  try {
    const response = await apiServer.get("/customer/gyms/near-you", { params: { limit: 4, ...params } });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch nearby gyms:", error);
    return null;
  }
};

// Fetch all gyms
export const getGyms = async (params?: Record<string, any>) => {
  try {
    const response = await apiServer.get("/customer/gyms", { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch gyms:", error);
    throw error;
  }
};

// Fetch single gym details by ID
export const getGymById = async (id: string | number) => {
  try {
    const response = await apiServer.get(`/customer/gyms/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch gym with id ${id}:`, error);
    throw error;
  }
};
