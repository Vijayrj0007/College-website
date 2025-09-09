// src/api/deptApi.ts
import api from "./apiClient";

export const fetchDepartments = async (params?: { page?: number; limit?: number; search?: string }) => {
  const { data } = await api.get("/departments", { params });
  return data;
};

export const addDepartment = async (departmentData: any) => {
  const { data } = await api.post("/departments", departmentData);
  return data;
};

export const updateDepartment = async (id: string, departmentData: any) => {
  const { data } = await api.put(`/departments/${id}`, departmentData);
  return data;
};

export const deleteDepartment = async (id: string) => {
  const { data } = await api.delete(`/departments/${id}`);
  return data;
};
