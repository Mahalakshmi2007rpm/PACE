from __future__ import annotations

from datetime import datetime, timezone

from sqlalchemy.orm import Session

from backend.app.models.gps import GPSLog
from backend.app.models.truck import Truck
from backend.app.utils.geo import CITY_COORDINATES, normalize_city


def latest_gps_log(db: Session, truck_id: int) -> GPSLog | None:
    return db.query(GPSLog).filter(GPSLog.truck_id == truck_id).order_by(GPSLog.recorded_at.desc()).first()


def simulate_gps_update(db: Session, truck_id: int) -> GPSLog:
    truck = db.query(Truck).filter(Truck.id == truck_id).first()
    if not truck:
        raise ValueError("Truck not found")

    city_key = normalize_city(truck.current_city) or "london"
    latitude, longitude = CITY_COORDINATES.get(city_key, CITY_COORDINATES["london"])
    last_log = latest_gps_log(db, truck_id)
    offset = 0.01 if not last_log else 0.005
    gps_log = GPSLog(
        truck_id=truck_id,
        latitude=latitude + offset,
        longitude=longitude + offset,
        speed_kph=52.0,
        recorded_at=datetime.now(timezone.utc),
    )
    db.add(gps_log)
    db.commit()
    db.refresh(gps_log)
    return gps_log
