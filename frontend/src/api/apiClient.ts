/// <reference types="vite/client" />
// src/api/apiClient.ts
import axios from "axios";

const rawBase =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? "https://college-website-iota-jet.vercel.app"
    : "http://localhost:5000");

// Ensure the base URL always ends with /api
const BASE_URL = rawBase.replace(/\/$/, "") + "/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Attach JWT token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
