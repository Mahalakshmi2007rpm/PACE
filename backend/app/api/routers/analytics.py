from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.api.deps import get_current_user
from backend.app.db.session import get_db
from backend.app.schemas.analytics import DashboardMetrics
from backend.app.services.analytics import get_dashboard_metrics
from backend.app.ai.recommendation_engine import recommend_best_trucks
from backend.app.models.shipment import Shipment
from backend.app.models.truck import Truck

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("/dashboard", response_model=DashboardMetrics)
def dashboard(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return get_dashboard_metrics(db)


@router.get("/recommendations")
def recommendations(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    shipment = db.query(Shipment).order_by(Shipment.created_at.desc()).first()
    if not shipment:
        return {"recommendations": []}
    return {"recommendations": recommend_best_trucks(db, shipment.origin, shipment.cargo_type, shipment.cargo_weight_tons)}
