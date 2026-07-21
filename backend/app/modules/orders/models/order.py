import uuid
from enum import Enum
from datetime import datetime
from sqlalchemy import String, Numeric, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.base import Base
from app.modules.orders.models.order_item import OrderItem 
from sqlalchemy import (
    String,
    Text,
    Numeric,
    DateTime,
    ForeignKey,
    Enum as SqlEnum,
)
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

class OrderStatus(str, Enum):
    PENDING = "PENDING"
    CONFIRMED = "CONFIRMED"
    PROCESSING = "PROCESSING"
    SHIPPED = "SHIPPED"
    DELIVERED = "DELIVERED"
    CANCELLED = "CANCELLED"


class PaymentMethod(str, Enum):
    COD = "COD"
    CARD = "CARD"
    UPI = "UPI"
    NETBANKING = "NETBANKING"


class PaymentStatus(str, Enum):
    PENDING = "PENDING"
    PAID = "PAID"
    FAILED = "FAILED"
    REFUNDED = "REFUNDED"


class Currency(str, Enum):
    INR = "INR"
    USD = "USD"

class Order(Base):
    __tablename__ = "orders"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    total_amount: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    status: Mapped[OrderStatus] = mapped_column(
        String, default=OrderStatus.PENDING, nullable=False
    )
    shipping_address: Mapped[str] = mapped_column(String(500), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, nullable=False
    )

    order_number: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        index=True,
        nullable=False,
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    status: Mapped[OrderStatus] = mapped_column(
        SqlEnum(OrderStatus),
        default=OrderStatus.PENDING,
        nullable=False,
    )

    total_amount: Mapped[float] = mapped_column(
        Numeric(10, 2),
        default=0,
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    shipping_address: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    payment_method: Mapped[PaymentMethod] = mapped_column(
        SqlEnum(PaymentMethod),
        default=PaymentMethod.COD,
        nullable=False,
    )

    payment_status: Mapped[PaymentStatus] = mapped_column(
        SqlEnum(PaymentStatus),
        default=PaymentStatus.PENDING,
        nullable=False,
    )

    payment_reference: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    payment_date: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    currency: Mapped[Currency] = mapped_column(
        SqlEnum(Currency),
        default=Currency.INR,
        nullable=False,
    )
    # Relationships
    user = relationship("User", back_populates="orders")
    items: Mapped[list["OrderItem"]] = relationship(
        "OrderItem", back_populates="order", cascade="all, delete-orphan"
    )