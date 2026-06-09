from __future__ import annotations

import json
from pathlib import Path

from backend.app.db.base import Base
from backend.app.db.session import SessionLocal, engine
import backend.app.models  # noqa: F401
from backend.app.models.company import Company
from backend.app.models.driver import Driver
from backend.app.models.gps import GPSLog
from backend.app.models.payment import Payment
from backend.app.models.shipment import Shipment
from backend.app.models.truck import Truck
from backend.app.models.user import User
from backend.app.core.security import get_password_hash

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"


def load_json(name: str) -> list[dict[str, object]]:
    path = DATA_DIR / name
    if not path.exists():
        return []
    return json.loads(path.read_text(encoding="utf-8"))


def seed() -> None:
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        if not db.query(User).first():
            users = load_json("users.json") or [
                {"email": "user@pace.local", "password": "password123", "full_name": "Demo User", "role": "user"},
                {"email": "ops@pace.local", "password": "password123", "full_name": "Ops Admin", "role": "logistics_company"},
            ]
            for item in users:
                db.add(
                    User(
                        email=item["email"],
                        hashed_password=get_password_hash(str(item["password"])),
                        full_name=item.get("full_name"),
                        role=str(item.get("role", "user")),
                    )
                )
            db.commit()

        if not db.query(Company).first():
            for item in load_json("companies.json") or [{"name": "PACE Logistics", "industry": "Freight", "city": "London", "contact_email": "ops@pace.local"}]:
                db.add(Company(**item))
            db.commit()

        if not db.query(Truck).first():
            for item in load_json("trucks.json"):
                db.add(Truck(**item))
            db.commit()

        if not db.query(Driver).first():
            for item in load_json("drivers.json"):
                db.add(Driver(**item))
            db.commit()

        if not db.query(Shipment).first():
            for item in load_json("shipments.json"):
                db.add(Shipment(**item))
            db.commit()

        if not db.query(GPSLog).first():
            for item in load_json("gps_logs.json"):
                db.add(GPSLog(**item))
            db.commit()

        if not db.query(Payment).first():
            for item in load_json("payments.json"):
                db.add(Payment(**item))
            db.commit()
    finally:
        db.close()


if __name__ == "__main__":
    seed()
    print("Seed data loaded.")
