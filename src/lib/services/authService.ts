import api from "../axios";
import { LoginCredentials, SignupCredentials, User } from "@/types";

import { AxiosError } from "axios";

export const authService = {
  login: async (
    credentials: LoginCredentials
  ): Promise<{ user: User; access: string; refresh: string }> => {
    const response = await api.post(`/auth/login/`, {
      username: credentials.email,
      password: credentials.password,
    });

    const { tokens } = response.data;

    const userResponse = await api.get(`/auth/me/`, {
      headers: { Authorization: `Bearer ${tokens.access}` },
    });

    return {
      user: userResponse.data,
      access: tokens.access,
      refresh: tokens.refresh,
    };
  },

  signup: async (
    credentials: SignupCredentials
  ): Promise<{ user: User; access: string; refresh: string }> => {
    const response = await api.post(`/auth/register/`, {
      username: credentials.email,
      email: credentials.email,
      phone_number: credentials.phone,
      password: credentials.password,
      first_name: credentials.name,
      last_name: "",
    });

    const { tokens } = response.data;

    const userResponse = await api.get(`/auth/me/`, {
      headers: { Authorization: `Bearer ${tokens.access}` },
    });

    return {
      user: userResponse.data,
      access: tokens.access,
      refresh: tokens.refresh,
    };
  },

  refreshToken: async (): Promise<string | null> => {
    const refresh = localStorage.getItem("refreshToken");
    if (!refresh) return null;

    try {
      const response = await api.post(`/token/refresh/`, { refresh });
      const newAccess = response.data.access;
      localStorage.setItem("accessToken", newAccess);
      return newAccess;
    } catch (error) {
      console.error("Token refresh failed:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return null;
    }
  },

  getCurrentUser: async (): Promise<User | null> => {
    const token = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!token || !refreshToken) {
      return null;
    }

    try {
      // Try with existing access token
      const response = await api.get(`/auth/me/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      // If token expired, try refreshing
      if (error.response?.status === 401 && refreshToken) {
        try {
          const refreshResponse = await api.post(`/token/refresh/`, {
            refresh: refreshToken,
          });

          const newAccess = refreshResponse.data.access;
          localStorage.setItem("accessToken", newAccess);

          // Retry fetching user
          const response = await api.get(`/auth/me/`, {
            headers: { Authorization: `Bearer ${newAccess}` },
          });
          return response.data;
        } catch (refreshErr) {
          const error = refreshErr as AxiosError<{ message?: string }>;
          console.error(
            "Token refresh failed:",
            error.response?.data?.message || error.message
          );
          // Refresh also failed → force logout
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          throw new Error("Session expired, please log in again");
        }
      }
      throw err;
    }
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
};
