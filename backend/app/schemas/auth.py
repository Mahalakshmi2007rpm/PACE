from pydantic import BaseModel, EmailStr, Field

from backend.app.schemas.entities import UserRead


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)
    full_name: str | None = None
    role: str = "user"
    company_name: str | None = None


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class AuthResponse(Token):
    user: UserRead


class TokenPayload(BaseModel):
    sub: str | None = None
