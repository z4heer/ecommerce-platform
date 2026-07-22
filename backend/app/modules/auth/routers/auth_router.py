from fastapi import APIRouter, Depends, HTTPException, status

from sqlalchemy.orm import Session

from app.database.session import get_db

from app.modules.auth.schemas.auth_request import RegisterRequest, LoginRequest

from app.modules.auth.schemas.auth_response import TokenResponse

from app.modules.auth.repositories.auth_repository import AuthRepository

from app.modules.auth.services.auth_service import AuthService
from app.modules.auth.dependencies import (
    get_current_user,
    require_admin,
    require_customer,
)

router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])


@router.post("/register", summary="Register User")
async def register(request: RegisterRequest, db: Session = Depends(get_db)):

    try:

        service = AuthService(AuthRepository(db))

        user = await service.register(request.email, request.password, request.role_id)

        return {"id": str(user.id), "email": user.email}

    except ValueError as ex:

        raise HTTPException(
            ##status_code=status.HTTP_400_BAD_REQUEST,
            status_code=400,
            detail=str(ex),
        )


@router.post("/login", response_model=TokenResponse, summary="Authenticate User")
async def login(request: LoginRequest, db: Session = Depends(get_db)):

    try:

        service = AuthService(AuthRepository(db))

        return await service.login(request.email, request.password)

    except ValueError as ex:

        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(ex))


@router.get("/whoami")
def who_am_i(current_user=Depends(get_current_user)):
    return {
        "id": str(current_user.id),
        "email": current_user.email,
        "role": current_user.role.name,
    }


@router.get("/admin-only")
def admin_only(current_user=Depends(require_admin)):
    return {"message": "success"}


@router.get("/customer-only")
def customer_only(current_user=Depends(require_customer)):
    return {"message": "success"}
