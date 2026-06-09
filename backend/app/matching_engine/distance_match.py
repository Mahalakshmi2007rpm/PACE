from backend.app.utils.geo import city_distance_km


def distance_score(truck_city: str | None, pickup_city: str | None) -> float:
    distance = city_distance_km(truck_city, pickup_city)
    if distance is None:
        return 0.5
    if distance <= 25:
        return 1.0
    if distance <= 100:
        return 0.85
    if distance <= 250:
        return 0.65
    if distance <= 500:
        return 0.4
    return 0.15
