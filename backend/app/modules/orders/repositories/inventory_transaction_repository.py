from uuid import UUID
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.modules.catalog.models.inventory import Inventory  # Presumed system location
from sqlalchemy.ext.asyncio import AsyncSession


class InventoryTransactionRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    def get_inventory_for_update(self, product_id: UUID) -> Inventory | None:
        # Crucial: Pessimistic locking pattern
        stmt = (
            select(Inventory)
            .where(Inventory.product_id == product_id)
            .with_for_update()
        )
        return self.db.execute(stmt).scalar_one_or_none()
