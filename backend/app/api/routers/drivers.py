from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app.api.deps import get_current_user
from backend.app.db.session import get_db
from backend.app.models.driver import Driver
from backend.app.schemas.entities import DriverCreate, DriverRead, DriverUpdate
from backend.app.services.crud import delete_record, get_record, list_records, update_record

router = APIRouter(prefix="/drivers", tags=["drivers"])


@router.get("", response_model=list[DriverRead])
def list_drivers(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return list_records(db, Driver)


@router.post("", response_model=DriverRead, status_code=status.HTTP_201_CREATED)
def create_driver(payload: DriverCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    driver = Driver(**payload.model_dump())
    db.add(driver)
    db.commit()
    db.refresh(driver)
    return driver


@router.get("/{driver_id}", response_model=DriverRead)
def read_driver(driver_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    driver = get_record(db, Driver, driver_id)
    if not driver:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Driver not found")
    return driver


@router.put("/{driver_id}", response_model=DriverRead)
def update_driver(driver_id: int, payload: DriverUpdate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    driver = get_record(db, Driver, driver_id)
    if not driver:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Driver not found")
    return update_record(db, driver, payload)


@router.delete("/{driver_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_driver(driver_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    driver = get_record(db, Driver, driver_id)
    if not driver:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Driver not found")
    delete_record(db, driver)
