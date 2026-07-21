import uuid
from sqlalchemy import Numeric, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.base import Base
from sqlalchemy import (
    ForeignKey,
    Integer,
    Numeric,
    String,
)

class OrderItem(Base):
    __tablename__ = "order_items"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    order_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("orders.id", ondelete="CASCADE"), nullable=False
    )
    product_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("products.id"), nullable=False
    )
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    unit_price: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)

    subtotal: Mapped[float] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    product_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    product_sku: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    # Relationships
    order = relationship("Order", back_populates="items")
    product = relationship("Product")  # From Catalog module
