import uuid

from sqlalchemy import String, Text, Numeric, Boolean, DateTime

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID

from app.database.base import Base


class Product(Base):
    __tablename__ = "products"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )

    name: Mapped[str] = mapped_column(String(255), nullable=False)

    description: Mapped[str] = mapped_column(Text, nullable=True)

    category: Mapped[str] = mapped_column(String(100), nullable=False)

    # Mapping fix: column already exists in DB (migration d8a6f0b93c41) but
    # was never mapped on the ORM model — reads/writes of Product.sku were
    # silently unavailable until now.
    sku: Mapped[str | None] = mapped_column(
        String(64), unique=True, nullable=True, index=True
    )

    price: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)

    image_url: Mapped[str | None] = mapped_column(String(2048), nullable=True)

    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    created_at = mapped_column(DateTime(timezone=True), server_default=func.now())

    updated_at = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    inventory = relationship("Inventory", back_populates="product", uselist=False)
