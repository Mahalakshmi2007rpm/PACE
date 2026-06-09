import { api } from "./api";
import type { DashboardMetrics, Recommendation } from "@/types";

export async function fetchDashboardMetrics() {
  const { data } = await api.get<DashboardMetrics>("/analytics/dashboard");
  return data;
}

export async function fetchRecommendations() {
  const { data } = await api.get<{ recommendations: Recommendation[] }>("/analytics/recommendations");
  return data.recommendations;
}
