// src/api/authApi.ts
import api from "./apiClient";


  

export const requestLoginOtp = async (email: string, password: string) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

export const verifyLoginOtp = async (email: string, otp: string) => {
  const { data } = await api.post("/auth/verify-login", { email, otp });
  localStorage.setItem("token", data.token);
  return data.user;
};

export const requestRegisterOtp = async (formData: any) => {
  const { data } = await api.post("/auth/register", formData);
  return data;
};

export const verifyRegisterOtp = async (payload: { name: string; email: string; password: string; role: string; otp: string; }) => {
  const { data } = await api.post("/auth/verify-register", payload);
  return data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const requestPasswordReset = async (email: string) => {
  const { data } = await api.post("/auth/request-password-reset", { email });
  return data;
};

export const verifyPasswordReset = async (email: string, otp: string, newPassword: string) => {
  const { data } = await api.post("/auth/verify-password-reset", { email, otp, newPassword });
  return data;
};

export const resendOtp = async (email: string, purpose: 'register' | 'login' | 'reset') => {
  const { data } = await api.post('/auth/resend-otp', { email, purpose });
  return data;
};

