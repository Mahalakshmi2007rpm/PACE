from __future__ import annotations

from math import asin, cos, radians, sin, sqrt

CITY_COORDINATES: dict[str, tuple[float, float]] = {
    "london": (51.5074, -0.1278),
    "birmingham": (52.4862, -1.8904),
    "manchester": (53.4808, -2.2426),
    "liverpool": (53.4084, -2.9916),
    "sheffield": (53.3811, -1.4701),
    "leeds": (53.8008, -1.5491),
    "nottingham": (52.9548, -1.1581),
    "bristol": (51.4545, -2.5879),
    "cardiff": (51.4816, -3.1791),
    "glasgow": (55.8642, -4.2518),
    "edinburgh": (55.9533, -3.1883),
    "delhi": (28.7041, 77.1025),
    "mumbai": (19.0760, 72.8777),
    "bangalore": (12.9716, 77.5946),
    "chennai": (13.0827, 80.2707),
}


def normalize_city(city: str | None) -> str | None:
    return city.lower().strip() if city else None


def haversine_km(origin: tuple[float, float], destination: tuple[float, float]) -> float:
    lat1, lon1 = origin
    lat2, lon2 = destination
    radius_km = 6371.0
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat / 2) ** 2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2) ** 2
    return 2 * radius_km * asin(sqrt(a))


def city_distance_km(city_a: str | None, city_b: str | None) -> float | None:
    normalized_a = normalize_city(city_a)
    normalized_b = normalize_city(city_b)
    if not normalized_a or not normalized_b:
        return None
    coords_a = CITY_COORDINATES.get(normalized_a)
    coords_b = CITY_COORDINATES.get(normalized_b)
    if not coords_a or not coords_b:
        return None
    return haversine_km(coords_a, coords_b)
