import axios from "axios";

const DEFAULT_SERVER_URL = "https://gymon-server.onrender.com";
const DEFAULT_PREFIX = "api";
const DEFAULT_VERSION = "v1";

const getBaseUrl = () => {
  // 1. Direct explicit API URL (e.g., https://gymon-server.onrender.com/api/v1)
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, "");
  }

  // 2. Base host from environment variables
  const host =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_PROD_BASE_URL
      : process.env.NEXT_PUBLIC_DEV_BASE_URL) ||
    process.env.NEXT_PUBLIC_PROD_BASE_URL ||
    process.env.NEXT_PUBLIC_DEV_BASE_URL ||
    DEFAULT_SERVER_URL;

  const prefix =
    process.env.NEXT_PUBLIC_API_PREFIX ||
    process.env.API_PREFIX ||
    DEFAULT_PREFIX;

  const version =
    process.env.NEXT_PUBLIC_API_VERSION ||
    process.env.API_VERSION ||
    DEFAULT_VERSION;

  return `${host.replace(/\/+$/, "")}/${prefix}/${version}`;
};

export const API_CLIENT_URL = getBaseUrl();

export const apiClient = axios.create({
  baseURL: API_CLIENT_URL,
  timeout: 20000, // 20s to accommodate Render free-tier cold starts
  headers: {
    "Content-Type": "application/json",
  },
});
