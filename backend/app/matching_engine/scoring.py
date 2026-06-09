from backend.app.matching_engine.availability_match import availability_score
from backend.app.matching_engine.capacity_match import capacity_score
from backend.app.matching_engine.distance_match import distance_score


def calculate_match_score(
    truck_city: str | None,
    pickup_city: str | None,
    capacity_tons: float,
    shipment_weight_tons: float,
    availability_status: str,
    cargo_type_compatibility: str | None,
    shipment_cargo_type: str,
    truck_rating: float,
) -> float:
    distance = distance_score(truck_city, pickup_city)
    capacity = capacity_score(capacity_tons, shipment_weight_tons)
    availability = availability_score(availability_status, cargo_type_compatibility, shipment_cargo_type)
    rating = max(0.0, min(truck_rating / 5.0, 1.0))
    score = (0.4 * distance) + (0.3 * capacity) + (0.2 * availability) + (0.1 * rating)
    return round(score * 100, 2)
