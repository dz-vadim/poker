import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import {api} from "../api/api";
import type {AuthContextValue, AuthUser} from "../interfaces/Auth.ts";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({children}: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(() => localStorage.getItem("accessToken"));
  const [user, setUser] = useState<AuthUser | null>(null);

  const fetchUser = async (token: string) => {
    try {
      const res = await api.get("/auth/me", {
        headers: {Authorization: `Bearer ${token}`},
      });
      setUser(res.data);
    } catch (error) {
      console.error("User fetch failed:", error);
      logout();
    }
  };

  useEffect(() => {
    if (accessToken) {
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      if (!user) {
        fetchUser(accessToken);
      }
    } else {
      delete api.defaults.headers.common.Authorization;
    }
  }, [accessToken]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAccessToken(null);
    setUser(null);
  };

  const login = async (payload: any) => {
    const res = await api.post("/auth/auth", payload);
    const token = res.data?.accessToken;

    if (token) {
      localStorage.setItem("accessToken", token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      setAccessToken(token);

      await fetchUser(token);
    }
  };

  const register = async (payload: any) => {
    const res = await api.post("/auth/register", payload);
    const token = res.data?.accessToken;

    if (token) {
      localStorage.setItem("accessToken", token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      setAccessToken(token);
      await fetchUser(token);
    }
  };

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!accessToken,
    login,
    register,
    logout,
  }), [user, accessToken]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};