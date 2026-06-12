from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token
)

from app.modules.auth.models.user import User
from app.modules.auth.repositories.auth_repository import (
    AuthRepository
)


class AuthService:

    def __init__(
        self,
        repository: AuthRepository
    ):
        self.repository = repository

    async def register(
        self,
        email: str,
        password: str,
        role_id: str
    ):

        existing_user = (
            await self.repository
            .get_user_by_email(email)
        )

        if existing_user:
            raise ValueError(
                "User already exists"
            )

        user = User(
            email=email,
            password_hash=hash_password(password),
            role_id=role_id
        )

        return await self.repository.create_user(
            user
        )

    async def login(
        self,
        email: str,
        password: str
    ):

        user = (
            await self.repository
            .get_user_by_email(email)
        )

        if not user:
            raise ValueError(
                "Invalid credentials"
            )

        if not verify_password(
            password,
            user.password_hash
        ):
            raise ValueError(
                "Invalid credentials"
            )

        access_token = create_access_token(
            {
                "sub": str(user.id),
                "email": user.email
            }
        )

        refresh_token = create_refresh_token(
            {
                "sub": str(user.id)
            }
        )

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer"
        }