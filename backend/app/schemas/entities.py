from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class ORMBase(BaseModel):
    model_config = {"from_attributes": True}


class CompanyBase(BaseModel):
    name: str
    industry: str | None = None
    city: str | None = None
    contact_email: EmailStr | None = None


class CompanyCreate(CompanyBase):
    pass


class CompanyUpdate(BaseModel):
    name: str | None = None
    industry: str | None = None
    city: str | None = None
    contact_email: EmailStr | None = None


class CompanyRead(ORMBase, CompanyBase):
    id: int
    created_at: datetime


class UserBase(BaseModel):
    email: EmailStr
    full_name: str | None = None
    role: str = "user"
    company_id: int | None = None
    is_active: bool = True


class UserCreate(UserBase):
    password: str = Field(min_length=8)


class UserUpdate(BaseModel):
    email: EmailStr | None = None
    full_name: str | None = None
    role: str | None = None
    company_id: int | None = None
    is_active: bool | None = None
    password: str | None = Field(default=None, min_length=8)


class UserRead(ORMBase, UserBase):
    id: int
    created_at: datetime


class TruckBase(BaseModel):
    company_id: int | None = None
    truck_number: str
    capacity_tons: float
    truck_type: str
    current_city: str | None = None
    availability_status: str = "available"
    rating: float = 5.0
    cargo_type_compatibility: str | None = None
    is_active: bool = True


class TruckCreate(TruckBase):
    pass


class TruckUpdate(BaseModel):
    company_id: int | None = None
    truck_number: str | None = None
    capacity_tons: float | None = None
    truck_type: str | None = None
    current_city: str | None = None
    availability_status: str | None = None
    rating: float | None = None
    cargo_type_compatibility: str | None = None
    is_active: bool | None = None


class TruckRead(ORMBase, TruckBase):
    id: int
    created_at: datetime


class DriverBase(BaseModel):
    company_id: int | None = None
    full_name: str
    phone: str | None = None
    license_number: str
    assigned_truck_id: int | None = None
    is_available: bool = True


class DriverCreate(DriverBase):
    pass


class DriverUpdate(BaseModel):
    company_id: int | None = None
    full_name: str | None = None
    phone: str | None = None
    license_number: str | None = None
    assigned_truck_id: int | None = None
    is_available: bool | None = None


class DriverRead(ORMBase, DriverBase):
    id: int
    created_at: datetime


class ShipmentBase(BaseModel):
    user_id: int
    company_id: int | None = None
    origin: str
    destination: str
    cargo_type: str
    cargo_weight_tons: float
    pickup_datetime: datetime | None = None
    status: str = "pending"


class ShipmentCreate(ShipmentBase):
    pass


class ShipmentUpdate(BaseModel):
    user_id: int | None = None
    company_id: int | None = None
    origin: str | None = None
    destination: str | None = None
    cargo_type: str | None = None
    cargo_weight_tons: float | None = None
    pickup_datetime: datetime | None = None
    status: str | None = None
    match_score: float | None = None
    estimated_empty_miles_saved: float | None = None
    estimated_profit: float | None = None
    recommended_truck_id: int | None = None


class ShipmentRead(ORMBase, ShipmentBase):
    id: int
    match_score: float | None = None
    estimated_empty_miles_saved: float | None = None
    estimated_profit: float | None = None
    recommended_truck_id: int | None = None
    created_at: datetime


class GPSLogBase(BaseModel):
    truck_id: int
    latitude: float
    longitude: float
    speed_kph: float | None = None


class GPSLogCreate(GPSLogBase):
    pass


class GPSLogRead(ORMBase, GPSLogBase):
    id: int
    recorded_at: datetime


class PaymentBase(BaseModel):
    shipment_id: int
    company_id: int | None = None
    amount: float
    currency: str = "USD"
    status: str = "pending"
    description: str | None = None
    paid_at: datetime | None = None


class PaymentCreate(PaymentBase):
    pass


class PaymentUpdate(BaseModel):
    shipment_id: int | None = None
    company_id: int | None = None
    amount: float | None = None
    currency: str | None = None
    status: str | None = None
    description: str | None = None
    paid_at: datetime | None = None


class PaymentRead(ORMBase, PaymentBase):
    id: int
    created_at: datetime
