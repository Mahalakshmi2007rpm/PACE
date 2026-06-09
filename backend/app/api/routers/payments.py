from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app.api.deps import get_current_user
from backend.app.db.session import get_db
from backend.app.models.payment import Payment
from backend.app.schemas.entities import PaymentCreate, PaymentRead, PaymentUpdate
from backend.app.services.crud import delete_record, get_record, list_records, update_record

router = APIRouter(prefix="/payments", tags=["payments"])


@router.get("", response_model=list[PaymentRead])
def list_payments(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return list_records(db, Payment)


@router.post("", response_model=PaymentRead, status_code=status.HTTP_201_CREATED)
def create_payment(payload: PaymentCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    payment = Payment(**payload.model_dump())
    db.add(payment)
    db.commit()
    db.refresh(payment)
    return payment


@router.get("/{payment_id}", response_model=PaymentRead)
def read_payment(payment_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    payment = get_record(db, Payment, payment_id)
    if not payment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Payment not found")
    return payment


@router.put("/{payment_id}", response_model=PaymentRead)
def update_payment(payment_id: int, payload: PaymentUpdate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    payment = get_record(db, Payment, payment_id)
    if not payment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Payment not found")
    return update_record(db, payment, payload)


@router.delete("/{payment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_payment(payment_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    payment = get_record(db, Payment, payment_id)
    if not payment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Payment not found")
    delete_record(db, payment)
