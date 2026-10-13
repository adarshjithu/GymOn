import axios from "axios";

export const API_CLIENT_URL =
  process.env.NODE_ENV === "development"
    ? process.env.DEV_BASE_URL || "http://localhost:5000/api/v1"
    : process.env.PROD_BASE_URL || "http://localhost:5000/api/v1";

export const apiClient = axios.create({
  baseURL: API_CLIENT_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


