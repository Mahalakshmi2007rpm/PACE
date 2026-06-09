from __future__ import annotations

from typing import Any, TypeVar

from pydantic import BaseModel
from sqlalchemy.orm import Session

from backend.app.db.base import Base

ModelType = TypeVar("ModelType", bound=Base)


def list_records(db: Session, model: type[ModelType], limit: int = 100, offset: int = 0) -> list[ModelType]:
    return db.query(model).offset(offset).limit(limit).all()


def get_record(db: Session, model: type[ModelType], record_id: int) -> ModelType | None:
    return db.query(model).filter(model.id == record_id).first()


def create_record(db: Session, model: type[ModelType], payload: BaseModel | dict[str, Any]) -> ModelType:
    data = payload.model_dump(exclude_unset=True) if isinstance(payload, BaseModel) else payload
    record = model(**data)
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


def update_record(db: Session, record: ModelType, payload: BaseModel | dict[str, Any]) -> ModelType:
    data = payload.model_dump(exclude_unset=True) if isinstance(payload, BaseModel) else payload
    for key, value in data.items():
        setattr(record, key, value)
    db.commit()
    db.refresh(record)
    return record


def delete_record(db: Session, record: ModelType) -> None:
    db.delete(record)
    db.commit()
