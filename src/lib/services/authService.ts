import { LoginCredentials, SignupCredentials, User } from "@/types";
import api from "../axios";

export const authService = {
  login: async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
    // In a real app, this would call your backend API
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  signup: async (credentials: SignupCredentials): Promise<{ user: User; token: string }> => {
    // In a real app, this would call your backend API
    const response = await api.post("/auth/signup", credentials);
    return response.data;
  },

  logout: async (): Promise<void> => {
    // In a real app, this would call your backend API
    await api.post("/auth/logout");
  },

  getCurrentUser: async (): Promise<User> => {
    // In a real app, this would call your backend API
    const response = await api.get("/auth/me");
    return response.data;
  },
};