"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types";
import { authService } from "@/lib/services/authService";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    name: string,
    email: string,
    phone: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error("Auth check failed:", err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { user, access, refresh } = await authService.login({
        email,
        password,
      });
      setUser(user);
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      toast.success("Login successful!");
      router.push("/");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.response?.data?.message || "Login failed.");
      throw err;
    }
  };

  const signup = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ) => {
    try {
      const { user, access, refresh } = await authService.signup({
        name,
        email,
        phone,
        password,
      });
      setUser(user);
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      toast.success("Account created successfully!");
      router.push("/");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.response?.data?.message || "Signup failed.");
      throw err;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    router.push("/");
    toast.success("Logged out successfully!");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
