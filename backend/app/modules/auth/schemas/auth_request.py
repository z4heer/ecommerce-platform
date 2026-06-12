from pydantic import BaseModel, EmailStr


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    role_id: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str