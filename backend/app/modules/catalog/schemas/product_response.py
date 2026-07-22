from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class ProductResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    name: str
    description: str | None = None
    category: str
    price: Decimal

    sku: str | None = None
    image_url: str | None = None
