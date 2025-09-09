// src/api/noticeApi.ts
import api from "./apiClient";

export const fetchNotices = async (params?: { page?: number; limit?: number; search?: string }) => {
  const { data } = await api.get("/notices", { params });
  return data;
};

export const addNotice = async (noticeData: any) => {
  const { data } = await api.post("/notices", noticeData);
  return data;
};

export const updateNotice = async (id: string, payload: any) => {
  const { data } = await api.put(`/notices/${id}`, payload);
  return data;
};

export const deleteNotice = async (id: string) => {
  const { data } = await api.delete(`/notices/${id}`);
  return data;
};
