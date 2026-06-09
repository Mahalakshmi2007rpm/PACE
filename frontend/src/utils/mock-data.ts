import type { DashboardMetrics, Driver, Recommendation, Shipment, Truck } from "@/types";

export const mockMetrics: DashboardMetrics = {
  active_trucks: 42,
  active_shipments: 18,
  empty_miles_saved: 1840,
  fleet_utilization: 86.4,
  revenue: 124780
};

export const mockRecommendations: Recommendation[] = [
  {
    truck_id: 1,
    truck_number: "PACE-TRK-101",
    match_score: 96.4,
    explanation: "Close to pickup location, compatible with refrigerated cargo, and highly rated.",
    estimated_empty_miles_saved: 144,
    estimated_profit: 3825
  },
  {
    truck_id: 2,
    truck_number: "PACE-TRK-205",
    match_score: 91.7,
    explanation: "Has spare capacity and is already heading toward the pickup corridor.",
    estimated_empty_miles_saved: 121,
    estimated_profit: 3294
  },
  {
    truck_id: 3,
    truck_number: "PACE-TRK-309",
    match_score: 88.1,
    explanation: "Available now, cargo-compatible, and positioned near the origin city.",
    estimated_empty_miles_saved: 103,
    estimated_profit: 3011
  }
];

export const mockTrucks: Truck[] = [
  {
    id: 1,
    truck_number: "PACE-TRK-101",
    capacity_tons: 18,
    truck_type: "Reefer",
    current_city: "London",
    availability_status: "available",
    rating: 4.9,
    cargo_type_compatibility: "food, pharma, frozen"
  },
  {
    id: 2,
    truck_number: "PACE-TRK-205",
    capacity_tons: 24,
    truck_type: "Box",
    current_city: "Birmingham",
    availability_status: "available",
    rating: 4.7,
    cargo_type_compatibility: "general, retail"
  },
  {
    id: 3,
    truck_number: "PACE-TRK-309",
    capacity_tons: 32,
    truck_type: "Flatbed",
    current_city: "Manchester",
    availability_status: "in_transit",
    rating: 4.8,
    cargo_type_compatibility: "machinery, steel, construction"
  }
];

export const mockShipments: Shipment[] = [
  {
    id: 1,
    user_id: 10,
    origin: "London",
    destination: "Birmingham",
    cargo_type: "food",
    cargo_weight_tons: 12,
    status: "matched",
    match_score: 96.4,
    estimated_empty_miles_saved: 144,
    estimated_profit: 3825,
    recommended_truck_id: 1
  },
  {
    id: 2,
    user_id: 12,
    origin: "Leeds",
    destination: "Liverpool",
    cargo_type: "general",
    cargo_weight_tons: 9,
    status: "pending"
  },
  {
    id: 3,
    user_id: 14,
    origin: "Bristol",
    destination: "Cardiff",
    cargo_type: "machinery",
    cargo_weight_tons: 21,
    status: "in_transit",
    recommended_truck_id: 3
  }
];

export const mockDrivers: Driver[] = [
  { id: 1, full_name: "Adeel Khan", phone: "+44 7400 000101", license_number: "LIC-101", assigned_truck_id: 1, is_available: true },
  { id: 2, full_name: "Maya Thompson", phone: "+44 7400 000205", license_number: "LIC-205", assigned_truck_id: 2, is_available: true },
  { id: 3, full_name: "Jordan Price", phone: "+44 7400 000309", license_number: "LIC-309", assigned_truck_id: 3, is_available: false }
];
