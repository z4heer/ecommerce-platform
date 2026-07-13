from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.auth.models.user import User


class AuthRepository:

    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_user_by_email(self, email: str) -> User | None:

        stmt = select(User).where(User.email == email)

        result = self.db.execute(stmt)

        return result.scalar_one_or_none()

    async def create_user(self, user: User) -> User:

        self.db.add(user)

        self.db.commit()

        self.db.refresh(user)

        return user
