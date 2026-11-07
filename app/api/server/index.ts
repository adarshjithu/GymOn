import axios from "axios";

const DEFAULT_SERVER_URL = "https://gymon-server.onrender.com";
const DEFAULT_PREFIX = "api";
const DEFAULT_VERSION = "v1";

const getBaseUrl = () => {
  // 1. Direct explicit API URL
  if (process.env.API_URL || process.env.NEXT_PUBLIC_API_URL) {
    return (process.env.API_URL || process.env.NEXT_PUBLIC_API_URL)!.replace(/\/+$/, "");
  }

  const prefix =
    process.env.API_PREFIX ||
    process.env.NEXT_PUBLIC_API_PREFIX ||
    DEFAULT_PREFIX;

  const version =
    process.env.API_VERSION ||
    process.env.NEXT_PUBLIC_API_VERSION ||
    DEFAULT_VERSION;

  // 2. Base host
  const host =
    process.env.BASE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.NODE_ENV === "production"
      ? process.env.PROD_BASE_URL || process.env.NEXT_PUBLIC_PROD_BASE_URL
      : process.env.DEV_BASE_URL || process.env.NEXT_PUBLIC_DEV_BASE_URL) ||
    process.env.PROD_BASE_URL ||
    process.env.NEXT_PUBLIC_PROD_BASE_URL ||
    process.env.DEV_BASE_URL ||
    DEFAULT_SERVER_URL;

  return `${host.replace(/\/+$/, "")}/${prefix}/${version}`;
};

export const API_SERVER_URL = getBaseUrl();

export const apiServer = axios.create({
  baseURL: API_SERVER_URL,
  timeout: 20000, // 20s to accommodate Render free-tier cold starts
  headers: {
    "Content-Type": "application/json",
  },
});
