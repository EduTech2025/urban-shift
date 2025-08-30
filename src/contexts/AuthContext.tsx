"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation"; // ✅ Import router
import { User } from "@/types";
import { authService } from "@/lib/services/authService";
import { toast } from "sonner";

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
  const router = useRouter(); // ✅ Initialize router
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
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
      setUser(user); // Fix here
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      toast.success("Login successful!");
      router.push("/"); // ✅ Redirect to main page
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed.");
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
      router.push("/"); // ✅ Redirect to main page
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Signup failed.");
      throw err;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/"); // ✅ Redirect to main page
    toast.success("Logged out successfully!");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
