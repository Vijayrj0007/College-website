// src/api/contactApi.ts
import api from "./apiClient";

export const submitContactForm = async (formData: any) => {
  const { data } = await api.post("/contact", formData);
  return data;
};
