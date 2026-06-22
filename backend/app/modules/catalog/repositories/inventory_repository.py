from app.modules.catalog.models.inventory import Inventory
from sqlalchemy.ext.asyncio import AsyncSession

class InventoryRepository:

    def __init__(
        self,
        db: AsyncSession
    ):
        self.db = db

    def create(
        self,
        db,
        inventory
    ):
        db.add(inventory)
        db.flush()
        db.refresh(inventory)

        return inventory

    def get_by_product_id(
        self,
        db,
        product_id
    ):
        return (
            db.query(Inventory)
            .filter(
                Inventory.product_id == product_id
            )
            .first()
        )

    def update_stock(
        self,
        db,
        inventory,
        quantity
    ):
        inventory.stock_quantity = quantity

        db.add(inventory)

        return inventory