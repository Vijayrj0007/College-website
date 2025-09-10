// src/api/authApi.ts
import api from "./apiClient";

// Login step 1: request OTP
export const requestLoginOtp = async (email: string, password: string) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

// Login step 2: verify OTP
export const verifyLoginOtp = async (email: string, otp: string) => {
  const { data } = await api.post("/auth/verify-login", { email, otp });
  localStorage.setItem("token", data.token);
  return data.user;
};

// Register step 1: request OTP
export const requestRegisterOtp = async (formData: { name: string; email: string; password: string; role: string }) => {
  const { data } = await api.post("/auth/register", formData);
  return data;
};

// Register step 2: verify OTP
export const verifyRegisterOtp = async (payload: { name: string; email: string; password: string; role: string; otp: string }) => {
  const { data } = await api.post("/auth/verify-register", payload);
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  return data.user || data;
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
};

// Forgot password step 1: request reset
export const requestPasswordReset = async (email: string) => {
  const { data } = await api.post("/auth/request-password-reset", { email });
  return data;
};

// Forgot password step 2: verify OTP & reset password
export const verifyPasswordReset = async (email: string, otp: string, newPassword: string) => {
  const { data } = await api.post("/auth/verify-password-reset", { email, otp, newPassword });
  return data;
};

// Resend OTP
export const resendOtp = async (email: string, purpose: "register" | "login" | "reset") => {
  const { data } = await api.post("/auth/resend-otp", { email, purpose });
  return data;
};
