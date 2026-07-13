from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel


class ProductResponse(BaseModel):

    id: UUID

    name: str

    description: str

    category: str

    price: Decimal

    class Config:
        from_attributes = True
