from uuid import uuid4

from sqlalchemy import String
from sqlalchemy.dialects.postgresql import UUID
from enum import Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class SystemRole(str, Enum):
    ADMIN = "ADMIN"
    CUSTOMER = "CUSTOMER"


class Role(Base):
    __tablename__ = "roles"

    id: Mapped[str] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid4)

    name: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)

    users = relationship("User", back_populates="role")
