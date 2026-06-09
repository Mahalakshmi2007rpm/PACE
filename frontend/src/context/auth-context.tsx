"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import type { AuthUser, LoginPayload, RegisterPayload } from "@/types";
import { loginRequest, registerRequest } from "@/services/auth";
import { setAuthToken } from "@/services/api";

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = window.localStorage.getItem("pace_token");
    const storedUser = window.localStorage.getItem("pace_user");
    if (storedToken) {
      setToken(storedToken);
      setAuthToken(storedToken);
    }
    if (storedUser) {
      setUser(JSON.parse(storedUser) as AuthUser);
    }
    setLoading(false);
  }, []);

  const persist = (nextToken: string, nextUser: AuthUser) => {
    setToken(nextToken);
    setUser(nextUser);
    setAuthToken(nextToken);
    window.localStorage.setItem("pace_token", nextToken);
    window.localStorage.setItem("pace_user", JSON.stringify(nextUser));
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      loading,
      login: async (payload) => {
        const response = await loginRequest(payload);
        persist(response.access_token, response.user);
      },
      register: async (payload) => {
        const response = await registerRequest(payload);
        persist(response.access_token, response.user);
      },
      logout: () => {
        setToken(null);
        setUser(null);
        setAuthToken(null);
        window.localStorage.removeItem("pace_token");
        window.localStorage.removeItem("pace_user");
      }
    }),
    [loading, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
