from sqlalchemy.orm import Session

from backend.app.ai.recommendation_engine import recommend_best_trucks


def recommend_dispatch_plan(db: Session, pickup_city: str, cargo_type: str, shipment_weight_tons: float) -> dict[str, object]:
    recommendations = recommend_best_trucks(db, pickup_city, cargo_type, shipment_weight_tons)
    best_match = recommendations[0] if recommendations else None
    return {
        "best_match": best_match,
        "recommendations": recommendations,
        "summary": "Dispatch plan generated from distance, capacity, availability, and truck rating.",
    }
