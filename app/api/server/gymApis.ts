import { apiServer } from ".";

// Fetch featured gyms near user from nodejs api (default limit: 4)
export const getFeaturedGyms = async (params?: { latitude?: number; longitude?: number; limit?: number }) => {
  try {
    const response = await apiServer.get("/customer/gyms/featured", { params: { limit: 4, ...params } });
    return response.data;
  } catch (error) {
    try {
      const fallback = await apiServer.get("/customer/gyms/near-you", { params: { limit: 4, ...params } });
      return fallback.data;
    } catch (fallbackError) {
      console.error("Failed to fetch featured gyms from nodejs server:", fallbackError);
      return null;
    }
  }
};

// Fetch gyms near user from nodejs api
export const getNearbyGyms = async (params?: { latitude?: number; longitude?: number; limit?: number }) => {
  try {
    const response = await apiServer.get("/customer/gyms/near-you", { params: { limit: 4, ...params } });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch nearby gyms from nodejs server:", error);
    return null;
  }
};

// Fetch all gyms from nodejs api
export const getGyms = async (params?: Record<string, any>) => {
  try {
    const response = await apiServer.get("/customer/gyms", { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch gyms from nodejs server:", error);
    throw error;
  }
};

// Fetch single gym details by slug from nodejs api
export const getGymBySlug = async (slug: string) => {
  if (!slug) return null;
  const cleanSlug = String(slug).toLowerCase().trim();

  // 1. Try slug endpoint
  try {
    const response = await apiServer.get(`/customer/gyms/slug/${encodeURIComponent(cleanSlug)}`);
    if (response?.data?.data) return response.data;
  } catch (error) {
    // Continue
  }

  // 2. Try :id endpoint (which also accepts slug on nodejs backend)
  try {
    const response = await apiServer.get(`/customer/gyms/${encodeURIComponent(cleanSlug)}`);
    if (response?.data?.data) return response.data;
  } catch (error) {
    console.error(`Failed to fetch gym by slug ${cleanSlug} from nodejs server:`, error);
  }

  return null;
};

// Fetch single gym details by ID from nodejs api
export const getGymById = async (id: string | number) => {
  return getGymBySlug(String(id));
};
