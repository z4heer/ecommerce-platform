from decimal import Decimal

from pydantic import BaseModel
from pydantic import Field


class ProductCreate(BaseModel):

    name: str = Field(
        min_length=2,
        max_length=255
    )

    description: str

    category: str

    price: Decimal

    stock_quantity: int = Field(
        ge=0
    )


class ProductUpdate(BaseModel):

    name: str | None = None

    description: str | None = None

    category: str | None = None

    price: Decimal | None = None