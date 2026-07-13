from pydantic import BaseModel, Field, field_validator
from uuid import UUID
from app.modules.orders.models.order import OrderStatus


class OrderItemRequest(BaseModel):
    product_id: UUID
    quantity: int = Field(..., description="Quantity of items to purchase")

    @field_validator("quantity")
    @classmethod
    def validate_quantity(cls, v: int) -> int:
        if v <= 0:
            raise ValueError("Quantity must be greater than 0")
        return v


class CreateOrderRequest(BaseModel):
    items: list[OrderItemRequest]


class OrderStatusUpdateRequest(BaseModel):
    status: OrderStatus
