import { api } from "./api";
import type { Recommendation, Shipment } from "@/types";

export async function fetchShipments() {
  const { data } = await api.get<Shipment[]>("/shipments");
  return data;
}

export async function createShipment(payload: Partial<Shipment>) {
  const { data } = await api.post<Shipment>("/shipments", payload);
  return data;
}

export async function matchShipment(shipmentId: number) {
  const { data } = await api.post<{ shipment_id: number; recommendations: Recommendation[] }>(`/shipments/${shipmentId}/match`);
  return data;
}
