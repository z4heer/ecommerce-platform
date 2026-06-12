from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db

from app.modules.auth.schemas.auth_request import (
    RegisterRequest,
    LoginRequest
)

from app.modules.auth.schemas.auth_response import (
    TokenResponse
)

from app.modules.auth.repositories.auth_repository import (
    AuthRepository
)

from app.modules.auth.services.auth_service import (
    AuthService
)

router = APIRouter(
    prefix="/api/v1/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    summary="Register User"
)
async def register(
    request: RegisterRequest,
    db: AsyncSession = Depends(get_db)
):

    try:

        service = AuthService(
            AuthRepository(db)
        )

        user = await service.register(
            request.email,
            request.password,
            request.role_id
        )

        return {
            "id": str(user.id),
            "email": user.email
        }

    except ValueError as ex:

        raise HTTPException(
            ##status_code=status.HTTP_400_BAD_REQUEST,
            status_code=400,
            detail=str(ex)
        )


@router.post(
    "/login",
    response_model=TokenResponse,
    summary="Authenticate User"
)
async def login(
    request: LoginRequest,
    db: AsyncSession = Depends(get_db)
):

    try:

        service = AuthService(
            AuthRepository(db)
        )

        return await service.login(
            request.email,
            request.password
        )

    except ValueError as ex:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(ex)
        )