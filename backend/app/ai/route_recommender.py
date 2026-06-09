from backend.app.utils.geo import city_distance_km


def recommend_route(origin: str, destination: str) -> dict[str, float | str | None]:
    distance_km = city_distance_km(origin, destination)
    if distance_km is None:
        return {"route_type": "city-simulated", "distance_km": None, "eta_hours": None}
    return {"route_type": "leaflet-optimized", "distance_km": round(distance_km, 2), "eta_hours": round(distance_km / 65.0, 2)}
