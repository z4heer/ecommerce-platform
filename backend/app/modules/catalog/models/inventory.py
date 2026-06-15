import uuid

from sqlalchemy import (
    Integer,
    ForeignKey,
    DateTime
)

from sqlalchemy.orm import (
    relationship,
    Mapped,
    mapped_column
)

from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID

from app.database.base import Base

class Inventory(Base):
    __tablename__ = "inventory"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    product_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("products.id"),
        unique=True,
        nullable=False
    )

    stock_quantity: Mapped[int] = mapped_column(
        Integer,
        default=0
    )

    reserved_quantity: Mapped[int] = mapped_column(
        Integer,
        default=0
    )

    updated_at = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    product = relationship(
        "Product",
        back_populates="inventory"
    )