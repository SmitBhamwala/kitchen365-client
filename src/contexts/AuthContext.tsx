"use client";

import { AuthResponse, LoginDto, SignupDto, User } from "@/types/auth";
import { authApi } from "@/utils/api";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginDto) => Promise<void>;
  signup: (userData: SignupDto) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    const userData = Cookies.get("user");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        // Invalid user data, clear cookies
        Cookies.remove("token");
        Cookies.remove("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginDto) => {
    try {
      const response: AuthResponse = await authApi.login(credentials);

      // Store token and user data
      Cookies.set("token", response.token, {
        expires: 7,
        secure: true,
        sameSite: "strict"
      });
      Cookies.set("user", JSON.stringify(response.user), {
        expires: 7,
        secure: true,
        sameSite: "strict"
      });

      setUser(response.user);
      toast.success("Login successful!");
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      throw new Error(message);
    }
  };

  const signup = async (userData: SignupDto) => {
    try {
      const response: AuthResponse = await authApi.signup(userData);

      // Store token and user data
      Cookies.set("token", response.token, {
        expires: 7,
        secure: true,
        sameSite: "strict"
      });
      Cookies.set("user", JSON.stringify(response.user), {
        expires: 7,
        secure: true,
        sameSite: "strict"
      });

      setUser(response.user);
      toast.success("Account created successfully!");
    } catch (error: any) {
      const message = error.response?.data?.message || "Signup failed";
      toast.error(message);
      throw new Error(message);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setUser(null);
    toast.success("Logged out successfully!");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
