import api from "./apiClient";

export const fetchResults = async (params?: { page?: number; limit?: number; search?: string; studentId?: string; courseId?: string; semester?: string }) => {
  const { data } = await api.get("/results", { params });
  return data;
};

export const fetchStudentResults = async (studentId: string, params?: { semester?: string; academicYear?: string }) => {
  const { data } = await api.get(`/results/student/${studentId}`, { params });
  return data;
};

export const addResult = async (payload: any) => {
  const { data } = await api.post("/results", payload);
  return data;
};

export const updateResult = async (id: string, payload: any) => {
  const { data } = await api.put(`/results/${id}`, payload);
  return data;
};

export const deleteResult = async (id: string) => {
  const { data } = await api.delete(`/results/${id}`);
  return data;
};

