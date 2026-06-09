import { api } from "./api";
import type { GPSLog } from "@/types";

export async function fetchLatestLocation(truckId: number) {
  const { data } = await api.get<GPSLog | null>(`/gps/trucks/${truckId}/latest`);
  return data;
}

export async function simulateLocation(truckId: number) {
  const { data } = await api.post<GPSLog>(`/gps/trucks/${truckId}/simulate`);
  return data;
}
