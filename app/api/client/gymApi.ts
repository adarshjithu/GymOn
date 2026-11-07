import { apiClient } from ".";

export const getFeaturedGyms = async (params?: { latitude?: number; longitude?: number; limit?: number }) => {
  try {
    const response = await apiClient.get("customer/gyms/featured", {
      params: { limit: 4, ...params },
    });
    return response.data;
  } catch (error) {
    try {
      const fallbackResponse = await apiClient.get("customer/gyms/near-you", {
        params: { limit: 4, ...params },
      });
      return fallbackResponse.data;
    } catch (fallbackError) {
      console.error("Failed to fetch featured gyms from nodejs server:", fallbackError);
      throw fallbackError;
    }
  }
};

export const getNearbyGyms = async (params?: { latitude?: number; longitude?: number; limit?: number }) => {
  try {
    const response = await apiClient.get("customer/gyms/near-you", {
      params: { limit: 4, ...params },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch nearby gyms from nodejs server:", error);
    throw error;
  }
};

export const getGyms = async (params?: { q?: string; search?: string; limit?: number }) => {
  try {
    const response = await apiClient.get("customer/gyms", { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch gyms from nodejs server:", error);
    throw error;
  }
};

export const getGymBySlug = async (slug: string) => {
  if (!slug) return null;
  const cleanSlug = String(slug).toLowerCase().trim();

  // 1. Try explicit slug endpoint
  try {
    const response = await apiClient.get(`customer/gyms/slug/${encodeURIComponent(cleanSlug)}`);
    if (response?.data?.data) return response.data;
  } catch (error) {
    // Continue
  }

  // 2. Try :id endpoint (which also accepts slug on nodejs backend)
  try {
    const response = await apiClient.get(`customer/gyms/${encodeURIComponent(cleanSlug)}`);
    if (response?.data?.data) return response.data;
  } catch (error) {
    console.error(`Failed to fetch gym by slug ${cleanSlug} from nodejs server:`, error);
    throw error;
  }

  return null;
};

export const getGymById = async (id: string | number) => {
  return getGymBySlug(String(id));
};
