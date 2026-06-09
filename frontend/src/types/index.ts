export type Role = "user" | "logistics_company" | "admin";

export interface AuthUser {
  id: number;
  email: string;
  full_name?: string | null;
  role: Role | string;
  company_id?: number | null;
  is_active?: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  full_name?: string;
  role?: Role | string;
  company_name?: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  user: AuthUser;
}

export interface DashboardMetrics {
  active_trucks: number;
  active_shipments: number;
  empty_miles_saved: number;
  fleet_utilization: number;
  revenue: number;
}

export interface Recommendation {
  truck_id: number;
  truck_number: string;
  match_score: number;
  explanation: string;
  estimated_empty_miles_saved: number;
  estimated_profit: number;
}

export interface Shipment {
  id: number;
  user_id: number;
  company_id?: number | null;
  origin: string;
  destination: string;
  cargo_type: string;
  cargo_weight_tons: number;
  pickup_datetime?: string | null;
  status: string;
  match_score?: number | null;
  estimated_empty_miles_saved?: number | null;
  estimated_profit?: number | null;
  recommended_truck_id?: number | null;
}

export interface Truck {
  id: number;
  company_id?: number | null;
  truck_number: string;
  capacity_tons: number;
  truck_type: string;
  current_city?: string | null;
  availability_status: string;
  rating: number;
  cargo_type_compatibility?: string | null;
  is_active?: boolean;
}

export interface Driver {
  id: number;
  company_id?: number | null;
  full_name: string;
  phone?: string | null;
  license_number: string;
  assigned_truck_id?: number | null;
  is_available: boolean;
}

export interface GPSLog {
  id: number;
  truck_id: number;
  latitude: number;
  longitude: number;
  speed_kph?: number | null;
  recorded_at: string;
}

export interface ApiListResponse<T> {
  items: T[];
}
