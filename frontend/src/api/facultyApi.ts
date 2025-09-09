// src/api/facultyApi.ts
import api from "./apiClient";

export const fetchFaculty = async () => {
  const { data } = await api.get("/faculty");
  return data;
};

export const addFaculty = async (facultyData: any) => {
  const { data } = await api.post("/faculty", facultyData);
  return data;
};

export const updateFaculty = async (id: string, payload: any) => {
  const { data } = await api.put(`/faculty/${id}`, payload);
  return data;
};

export const deleteFaculty = async (id: string) => {
  const { data } = await api.delete(`/faculty/${id}`);
  return data;
};