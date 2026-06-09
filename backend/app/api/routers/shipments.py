from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app.api.deps import get_current_user
from backend.app.ai.dispatch_agent import recommend_dispatch_plan
from backend.app.db.session import get_db
from backend.app.matching_engine.optimizer import rank_trucks
from backend.app.models.shipment import Shipment
from backend.app.schemas.analytics import MatchResult
from backend.app.schemas.entities import ShipmentCreate, ShipmentRead, ShipmentUpdate
from backend.app.services.crud import delete_record, get_record, list_records, update_record

router = APIRouter(prefix="/shipments", tags=["shipments"])


@router.get("", response_model=list[ShipmentRead])
def list_shipments(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return list_records(db, Shipment)


@router.post("", response_model=ShipmentRead, status_code=status.HTTP_201_CREATED)
def create_shipment(payload: ShipmentCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    shipment = Shipment(**payload.model_dump())
    db.add(shipment)
    db.commit()
    db.refresh(shipment)
    return shipment


@router.get("/{shipment_id}", response_model=ShipmentRead)
def read_shipment(shipment_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    shipment = get_record(db, Shipment, shipment_id)
    if not shipment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Shipment not found")
    return shipment


@router.put("/{shipment_id}", response_model=ShipmentRead)
def update_shipment(shipment_id: int, payload: ShipmentUpdate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    shipment = get_record(db, Shipment, shipment_id)
    if not shipment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Shipment not found")
    return update_record(db, shipment, payload)


@router.delete("/{shipment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_shipment(shipment_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    shipment = get_record(db, Shipment, shipment_id)
    if not shipment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Shipment not found")
    delete_record(db, shipment)


@router.post("/{shipment_id}/match", response_model=MatchResult)
def match_shipment(shipment_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    shipment = get_record(db, Shipment, shipment_id)
    if not shipment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Shipment not found")
    recommendations = rank_trucks(db, shipment.origin, shipment.cargo_type, shipment.cargo_weight_tons)
    top_recommendation = recommendations[0] if recommendations else None
    if top_recommendation:
        shipment.recommended_truck_id = top_recommendation.truck_id
        shipment.match_score = top_recommendation.match_score
        shipment.estimated_empty_miles_saved = top_recommendation.estimated_empty_miles_saved
        shipment.estimated_profit = top_recommendation.estimated_profit
        shipment.status = "matched"
        db.commit()
        db.refresh(shipment)
    return MatchResult(shipment_id=shipment.id, recommendations=recommendations)


@router.get("/{shipment_id}/dispatch-plan")
def dispatch_plan(shipment_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    shipment = get_record(db, Shipment, shipment_id)
    if not shipment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Shipment not found")
    return recommend_dispatch_plan(db, shipment.origin, shipment.cargo_type, shipment.cargo_weight_tons)
