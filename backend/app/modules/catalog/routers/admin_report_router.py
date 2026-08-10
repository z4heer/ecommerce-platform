from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select
from sqlalchemy.orm import joinedload

from app.database.session import get_db
from app.modules.auth.dependencies import require_admin
from app.modules.catalog.models.product import Product
from app.modules.catalog.models.inventory import Inventory
from pydantic import BaseModel
from typing import List
import uuid
import datetime

class LowStockResponse(BaseModel):
    product_id: uuid.UUID
    name: str
    sku: str
    stock_quantity: int
    last_updated: datetime.datetime

    class Config:
        from_attributes = True

admin_report_router = APIRouter(prefix="/api/v1/admin/reports", tags=["Admin Reports"])

@admin_report_router.get("/low-stock", response_model=List[LowStockResponse], dependencies=[Depends(require_admin)])
def get_low_stock(db: Session = Depends(get_db)):
    products = db.query(Product).join(Product.inventory).filter(Inventory.stock_quantity <= 10).options(joinedload(Product.inventory)).all()

    return [
        LowStockResponse(
            product_id=p.id,
            name=p.name,
            sku=p.sku,
            stock_quantity=p.inventory.stock_quantity if p.inventory else 0,
            last_updated=p.inventory.last_updated if p.inventory else datetime.datetime.now()
        )
        for p in products
    ]
