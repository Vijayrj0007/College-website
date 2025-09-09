// src/api/eventApi.ts
import api from "./apiClient";

export const fetchEvents = async () => {
  const { data } = await api.get("/events");
  return data;
};

export const addEvent = async (eventData: any) => {
  const { data } = await api.post("/events", eventData);
  return data;
};
