from sqlalchemy.orm import Session

from backend.app.matching_engine.scoring import calculate_match_score
from backend.app.models.truck import Truck
from backend.app.schemas.analytics import Recommendation


def rank_trucks(db: Session, pickup_city: str, cargo_type: str, shipment_weight_tons: float) -> list[Recommendation]:
    trucks = db.query(Truck).filter(Truck.is_active.is_(True)).all()
    recommendations: list[Recommendation] = []
    for truck in trucks:
        match_score = calculate_match_score(
            truck.current_city,
            pickup_city,
            truck.capacity_tons,
            shipment_weight_tons,
            truck.availability_status,
            truck.cargo_type_compatibility,
            cargo_type,
            truck.rating,
        )
        recommendations.append(
            Recommendation(
                truck_id=truck.id,
                truck_number=truck.truck_number,
                match_score=match_score,
                explanation=(
                    f"Truck {truck.truck_number} is a strong fit because it is {truck.availability_status.lower()}, "
                    f"rated {truck.rating:.1f}/5, and located in {truck.current_city or 'an unknown city'}."
                ),
                estimated_empty_miles_saved=round(match_score * 1.2, 2),
                estimated_profit=round(match_score * 18.0, 2),
            )
        )
    return sorted(recommendations, key=lambda item: item.match_score, reverse=True)
