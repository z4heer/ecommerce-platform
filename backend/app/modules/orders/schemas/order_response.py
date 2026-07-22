from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from app.modules.orders.models.order import OrderStatus


class OrderItemResponse(BaseModel):
    product_id: UUID
    quantity: int
    unit_price: float
    product_name: str
    product_sku: str
    subtotal: float

    class Config:
        from_attributes = True


class OrderResponse(BaseModel):
    id: UUID
    total_amount: float
    status: OrderStatus
    shipping_address: str
    created_at: datetime
    order_number: str
    payment_method: str
    payment_status: str
    payment_reference: str | None
    payment_date: datetime | None
    currency: str

    class Config:
        from_attributes = True


class OrderDetailResponse(BaseModel):
    id: UUID
    status: OrderStatus
    total_amount: float
    shipping_address: str
    created_at: datetime
    items: list[OrderItemResponse]

    class Config:
        from_attributes = True
