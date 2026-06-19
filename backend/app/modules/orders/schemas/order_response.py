from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from app.modules.orders.models.order import OrderStatus

class OrderItemResponse(BaseModel):
    product_id: UUID
    quantity: int
    unit_price: float

    class Config:
        from_attributes = True

class OrderResponse(BaseModel):
    id: UUID
    total_amount: float
    status: OrderStatus
    created_at: datetime

    class Config:
        from_attributes = True

class OrderDetailResponse(BaseModel):
    id: UUID
    status: OrderStatus
    total_amount: float
    created_at: datetime
    items: list[OrderItemResponse]

    class Config:
        from_attributes = True