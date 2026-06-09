from datetime import datetime

from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.app.db.base import Base


class Truck(Base):
    __tablename__ = "trucks"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    company_id: Mapped[int | None] = mapped_column(ForeignKey("companies.id"), nullable=True)
    truck_number: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    capacity_tons: Mapped[float] = mapped_column(Float, nullable=False)
    truck_type: Mapped[str] = mapped_column(String(100), nullable=False)
    current_city: Mapped[str | None] = mapped_column(String(255), nullable=True)
    availability_status: Mapped[str] = mapped_column(String(50), default="available", nullable=False)
    rating: Mapped[float] = mapped_column(Float, default=5.0, nullable=False)
    cargo_type_compatibility: Mapped[str | None] = mapped_column(String(255), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    company = relationship("Company", back_populates="trucks")
    driver = relationship("Driver", back_populates="assigned_truck", uselist=False)
    gps_logs = relationship("GPSLog", back_populates="truck")
