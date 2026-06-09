from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app.api.deps import get_current_user
from backend.app.db.session import get_db
from backend.app.models.truck import Truck
from backend.app.schemas.entities import TruckCreate, TruckRead, TruckUpdate
from backend.app.services.crud import delete_record, get_record, list_records, update_record

router = APIRouter(prefix="/trucks", tags=["trucks"])


@router.get("", response_model=list[TruckRead])
def list_trucks(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return list_records(db, Truck)


@router.get("/available", response_model=list[TruckRead])
def list_available_trucks(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return db.query(Truck).filter(Truck.is_active.is_(True), Truck.availability_status == "available").all()


@router.post("", response_model=TruckRead, status_code=status.HTTP_201_CREATED)
def create_truck(payload: TruckCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    truck = Truck(**payload.model_dump())
    db.add(truck)
    db.commit()
    db.refresh(truck)
    return truck


@router.get("/{truck_id}", response_model=TruckRead)
def read_truck(truck_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    truck = get_record(db, Truck, truck_id)
    if not truck:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Truck not found")
    return truck


@router.put("/{truck_id}", response_model=TruckRead)
def update_truck(truck_id: int, payload: TruckUpdate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    truck = get_record(db, Truck, truck_id)
    if not truck:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Truck not found")
    return update_record(db, truck, payload)


@router.delete("/{truck_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_truck(truck_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    truck = get_record(db, Truck, truck_id)
    if not truck:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Truck not found")
    delete_record(db, truck)
