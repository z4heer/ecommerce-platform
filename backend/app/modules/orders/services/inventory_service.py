from fastapi import HTTPException, status
from app.modules.orders.repositories.inventory_transaction_repository import InventoryTransactionRepository
from app.modules.orders.schemas.order_request import OrderItemRequest

class InventoryService:
    def __init__(self, inventory_repo: InventoryTransactionRepository):
        self.inventory_repo = inventory_repo

    def validate_and_deduct_stock(self, order_items: list[OrderItemRequest]) -> None:
        for item in order_items:
            inventory = self.inventory_repo.get_inventory_for_update(item.product_id)
            
            if not inventory:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Product {item.product_id} does not exist in inventory"
                )
            
            if inventory.stock_quantity < item.quantity:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Insufficient stock for product {item.product_id}."
                )
            
            # Mutate but DO NOT commit here
            inventory.stock_quantity -= item.quantity