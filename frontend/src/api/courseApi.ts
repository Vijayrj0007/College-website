import api from "./apiClient";

export const fetchCourses = async (params?: { page?: number; limit?: number; search?: string }) => {
  const { data } = await api.get("/courses", { params });
  return data;
};

export const addCourse = async (payload: any) => {
  const { data } = await api.post("/courses", payload);
  return data;
};

export const updateCourse = async (id: string, payload: any) => {
  const { data } = await api.put(`/courses/${id}`, payload);
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await api.delete(`/courses/${id}`);
  return data;
};


