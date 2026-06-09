from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app.api.deps import get_current_user
from backend.app.db.session import get_db
from backend.app.models.gps import GPSLog
from backend.app.schemas.entities import GPSLogCreate, GPSLogRead
from backend.app.services.crud import get_record, list_records
from backend.app.services.tracking import latest_gps_log, simulate_gps_update

router = APIRouter(prefix="/gps", tags=["gps"])


@router.get("/trucks/{truck_id}/latest", response_model=GPSLogRead | None)
def read_latest(truck_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return latest_gps_log(db, truck_id)


@router.get("/trucks/{truck_id}", response_model=list[GPSLogRead])
def list_logs(truck_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return db.query(GPSLog).filter(GPSLog.truck_id == truck_id).order_by(GPSLog.recorded_at.desc()).all()


@router.post("/trucks/{truck_id}/simulate", response_model=GPSLogRead, status_code=status.HTTP_201_CREATED)
def simulate(truck_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    try:
        return simulate_gps_update(db, truck_id)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc)) from exc


@router.post("", response_model=GPSLogRead, status_code=status.HTTP_201_CREATED)
def create_log(payload: GPSLogCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    log = GPSLog(**payload.model_dump())
    db.add(log)
    db.commit()
    db.refresh(log)
    return log
