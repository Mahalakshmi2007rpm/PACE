import { api } from "./api";
import type { AuthUser, LoginPayload, RegisterPayload, TokenResponse } from "@/types";

export async function loginRequest(payload: LoginPayload): Promise<TokenResponse> {
  const body = new URLSearchParams();
  body.set("username", payload.email);
  body.set("password", payload.password);
  const { data } = await api.post("/auth/login", body, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });
  return data as TokenResponse;
}

export async function registerRequest(payload: RegisterPayload): Promise<TokenResponse> {
  const { data } = await api.post("/auth/register", payload);
  return data as TokenResponse;
}

export async function fetchCurrentUser(token: string): Promise<AuthUser> {
  const { data } = await api.get("/auth/me", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data as AuthUser;
}
