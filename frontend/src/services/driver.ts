import { api } from "./api";
import type { Driver } from "@/types";

export async function fetchDrivers() {
  const { data } = await api.get<Driver[]>("/drivers");
  return data;
}
