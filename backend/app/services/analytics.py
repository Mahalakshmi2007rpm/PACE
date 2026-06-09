from sqlalchemy import func
from sqlalchemy.orm import Session

from backend.app.models.gps import GPSLog
from backend.app.models.payment import Payment
from backend.app.models.shipment import Shipment
from backend.app.models.truck import Truck
from backend.app.schemas.analytics import DashboardMetrics


def get_dashboard_metrics(db: Session) -> DashboardMetrics:
    total_trucks = db.query(func.count(Truck.id)).scalar() or 0
    active_trucks = db.query(func.count(Truck.id)).filter(Truck.is_active.is_(True), Truck.availability_status == "available").scalar() or 0
    active_shipments = db.query(func.count(Shipment.id)).filter(Shipment.status.in_(["pending", "matched", "in_transit"])).scalar() or 0
    empty_miles_saved = db.query(func.coalesce(func.sum(Shipment.estimated_empty_miles_saved), 0.0)).scalar() or 0.0
    revenue = db.query(func.coalesce(func.sum(Payment.amount), 0.0)).filter(Payment.status == "paid").scalar() or 0.0
    fleet_utilization = round((active_trucks / total_trucks * 100.0), 2) if total_trucks else 0.0
    return DashboardMetrics(
        active_trucks=active_trucks,
        active_shipments=active_shipments,
        empty_miles_saved=round(float(empty_miles_saved), 2),
        fleet_utilization=fleet_utilization,
        revenue=round(float(revenue), 2),
    )


def shipment_tracking_summary(db: Session, shipment_id: int) -> dict[str, object]:
    shipment = db.query(Shipment).filter(Shipment.id == shipment_id).first()
    if not shipment:
        raise ValueError("Shipment not found")
    truck = db.query(Truck).filter(Truck.id == shipment.recommended_truck_id).first() if shipment.recommended_truck_id else None
    log = db.query(GPSLog).filter(GPSLog.truck_id == truck.id).order_by(GPSLog.recorded_at.desc()).first() if truck else None
    return {
        "shipment_id": shipment.id,
        "status": shipment.status,
        "truck": truck.truck_number if truck else None,
        "location": None if not log else {"latitude": log.latitude, "longitude": log.longitude},
    }
