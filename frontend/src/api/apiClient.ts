// src/api/apiClient.ts
import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD 
    ? "https://college-website-iota-jet.vercel.app/api" 
    : "http://localhost:5000/api");

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
