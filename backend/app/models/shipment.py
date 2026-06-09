from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.app.db.base import Base


class Shipment(Base):
    __tablename__ = "shipments"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    company_id: Mapped[int | None] = mapped_column(ForeignKey("companies.id"), nullable=True)
    origin: Mapped[str] = mapped_column(String(255), nullable=False)
    destination: Mapped[str] = mapped_column(String(255), nullable=False)
    cargo_type: Mapped[str] = mapped_column(String(100), nullable=False)
    cargo_weight_tons: Mapped[float] = mapped_column(Float, nullable=False)
    pickup_datetime: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    status: Mapped[str] = mapped_column(String(50), default="pending", nullable=False)
    match_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    estimated_empty_miles_saved: Mapped[float | None] = mapped_column(Float, nullable=True)
    estimated_profit: Mapped[float | None] = mapped_column(Float, nullable=True)
    recommended_truck_id: Mapped[int | None] = mapped_column(ForeignKey("trucks.id"), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    user = relationship("User", back_populates="shipments")
    company = relationship("Company", back_populates="shipments")
    recommended_truck = relationship("Truck")
