// src/api/studentApi.ts
import api from "./apiClient";

export const fetchStudents = async (params?: { page?: number; limit?: number; search?: string }) => {
  const { data } = await api.get("/students", { params });
  return data;
};

export const fetchStudentById = async (id: string) => {
  const { data } = await api.get(`/students/${id}`);
  return data;
};

export const addStudent = async (studentData: any) => {
  const { data } = await api.post("/students", studentData);
  return data;
};

export const updateStudent = async (id: string, studentData: any) => {
  const { data } = await api.put(`/students/${id}`, studentData);
  return data;
};

export const deleteStudent = async (id: string) => {
  const { data } = await api.delete(`/students/${id}`);
  return data;
};
