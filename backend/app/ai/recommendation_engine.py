from sqlalchemy.orm import Session

from backend.app.matching_engine.optimizer import rank_trucks


def recommend_best_trucks(db: Session, pickup_city: str, cargo_type: str, shipment_weight_tons: float) -> list[dict[str, object]]:
    recommendations = rank_trucks(db, pickup_city, cargo_type, shipment_weight_tons)
    return [item.model_dump() for item in recommendations]
