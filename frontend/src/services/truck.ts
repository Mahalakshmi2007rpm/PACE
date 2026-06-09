import { api } from "./api";
import type { Truck } from "@/types";

export async function fetchTrucks() {
  const { data } = await api.get<Truck[]>("/trucks");
  return data;
}

export async function fetchAvailableTrucks() {
  const { data } = await api.get<Truck[]>("/trucks/available");
  return data;
}
