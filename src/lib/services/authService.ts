import api from "../axios";
import { LoginCredentials, SignupCredentials, User } from "@/types";

export const authService = {
  login: async (
    credentials: LoginCredentials
  ): Promise<{ user: User; access: string; refresh: string }> => {
    // Call Django JWT login endpoint
    const response = await api.post("http://localhost:8000/api/auth/login/", {
      username: credentials.email, // Django login expects 'username'
      password: credentials.password,
    });

    // response should contain: { message, tokens: { access, refresh } }
    const { tokens } = response.data;

    // Get current user info
    const userResponse = await api.get("http://localhost:8000/api/auth/me/", {
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
    // Call Django register endpoint
    const response = await api.post(
      "http://localhost:8000/api/auth/register/",
      {
        username: credentials.email,
        email: credentials.email,
        phone_number: credentials.phone,
        password: credentials.password,
        first_name: credentials.name,
        last_name: "", // optional
      }
    );

    const { tokens } = response.data;

    // Get current user info
    const userResponse = await api.get("http://localhost:8000/api/auth/me/", {
      headers: { Authorization: `Bearer ${tokens.access}` },
    });

    return {
      user: userResponse.data,
      access: tokens.access,
      refresh: tokens.refresh,
    };
  },

  logout: async (): Promise<void> => {
    // Clear tokens from frontend
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // Optional: call backend to blacklist token
  },

  getCurrentUser: async (): Promise<User> => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No access token found");

    const response = await api.get("http://localhost:8000/api/auth/me/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};
