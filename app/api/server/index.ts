import axios from "axios";

const VERSION = process.env.VERSION || "v1"
const API_PREFIX = process.env.API_PREFIX || "api"
const NODE_ENV = process.env.NODE_ENV


export const API_SERVER_URL =
  process.env.NODE_ENV === "development"
    ? `${process.env.DEV_BASE_URL}/${API_PREFIX}/${VERSION}`
    : `${process.env.PROD_BASE_URL}/${API_PREFIX}/${VERSION}`;

export const apiServer = axios.create({
  baseURL: API_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

