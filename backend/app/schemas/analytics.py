from pydantic import BaseModel


class DashboardMetrics(BaseModel):
    active_trucks: int
    active_shipments: int
    empty_miles_saved: float
    fleet_utilization: float
    revenue: float


class Recommendation(BaseModel):
    truck_id: int
    truck_number: str
    match_score: float
    explanation: str
    estimated_empty_miles_saved: float
    estimated_profit: float


class MatchResult(BaseModel):
    shipment_id: int
    recommendations: list[Recommendation]
