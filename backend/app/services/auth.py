from sqlalchemy.orm import Session

from backend.app.core.security import create_access_token, get_password_hash, verify_password
from backend.app.models.company import Company
from backend.app.models.user import User
from backend.app.schemas.auth import RegisterRequest
from backend.app.schemas.entities import UserCreate


def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()


def authenticate_user(db: Session, email: str, password: str) -> User | None:
    user = get_user_by_email(db, email)
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user


def register_user(db: Session, payload: RegisterRequest) -> tuple[User, str]:
    if get_user_by_email(db, payload.email):
        raise ValueError("A user with this email already exists")

    company = None
    if payload.company_name:
        company = db.query(Company).filter(Company.name == payload.company_name).first()
        if not company:
            company = Company(name=payload.company_name, contact_email=payload.email)
            db.add(company)
            db.flush()

    user = User(
        email=payload.email,
        hashed_password=get_password_hash(payload.password),
        full_name=payload.full_name,
        role=payload.role,
        company_id=company.id if company else None,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    token = create_access_token(subject=user.email)
    return user, token


def create_user_from_schema(db: Session, payload: UserCreate) -> User:
    if get_user_by_email(db, payload.email):
        raise ValueError("A user with this email already exists")
    user = User(
        email=payload.email,
        hashed_password=get_password_hash(payload.password),
        full_name=payload.full_name,
        role=payload.role,
        company_id=payload.company_id,
        is_active=payload.is_active,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
