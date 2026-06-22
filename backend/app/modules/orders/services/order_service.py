from uuid import UUID
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.modules.orders.models.order import Order, OrderStatus
from app.modules.orders.models.order_item import OrderItem
from app.modules.orders.repositories.order_repository import OrderRepository
from app.modules.orders.services.inventory_service import InventoryService
from app.modules.orders.schemas.order_request import CreateOrderRequest
from app.modules.catalog.repositories.product_repository import ProductRepository # Presumed
from app.core.logger import logger 

class OrderService:
    def __init__(self, db: Session, order_repo: OrderRepository, inventory_service: InventoryService, product_repo: ProductRepository):
        self.db = db
        self.order_repo = order_repo
        self.inventory_service = inventory_service
        self.product_repo = product_repo

    def create_order(self, user_id: UUID, request: CreateOrderRequest) -> Order:
        try:
            logger.info(f"Starting order creation for user: {user_id} with items: {request.items}")   
            # 1. Row locking & Inventory validation occurs inside an active Unit of Work context
            self.inventory_service.validate_and_deduct_stock(request.items)
            
            total_amount = 0.0
            order_items_entities = []

            # 2. Extract historical product prices
            for item in request.items:
                logger.info(f"Fetching product details for product_id: {item.product_id}")  
                product = self.product_repo.get_by_id(self.db, item.product_id)
                if not product:
                    raise HTTPException(status_code=400, detail="Product invalid")
                
                item_price = float(product.price)
                total_amount += item_price * item.quantity

                order_items_entities.append(
                    OrderItem(
                        product_id=item.product_id,
                        quantity=item.quantity,
                        unit_price=item_price
                    )
                )

            # 3. Formulate Order object
            new_order = Order(
                user_id=user_id,
                total_amount=total_amount,
                status=OrderStatus.PENDING,
                items=order_items_entities
            )

            # 4. Save to DB
            saved_order = self.order_repo.create_order(new_order)
            
            # 5. Commit everything as an atomic transaction
            self.db.commit()
            return saved_order

        except Exception as e:
            self.db.rollback() # If anything went wrong above, undo all database changes
            if isinstance(e, HTTPException):
                raise e
            raise HTTPException(status_code=500, detail=f"Transaction Failed: {str(e)}")

    def get_order_history(self, user_id: UUID) -> list[Order]:
        return self.order_repo.get_orders_by_user(user_id)

    def get_order_details(self, order_id: UUID, current_user_id: UUID) -> Order:
        order = self.order_repo.get_order_by_id(order_id)
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        if order.user_id != current_user_id:
            raise HTTPException(status_code=403, detail="Not authorized to view this order")
        return order

    def get_all_orders(self) -> list[Order]:
        return self.order_repo.get_all_orders()

    def update_order_status(self, order_id: UUID, new_status: OrderStatus) -> Order:
        order = self.order_repo.get_order_by_id(order_id)
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")

        # Finite State Machine Transitions Validation
        valid_transitions = {
            OrderStatus.PENDING: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
            OrderStatus.SHIPPED: [OrderStatus.DELIVERED],
            OrderStatus.DELIVERED: [],
            OrderStatus.CANCELLED: []
        }

        if new_status not in valid_transitions[order.status]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid Status Transition from {order.status} to {new_status}"
            )

        updated_order = self.order_repo.update_status(order, new_status)
        self.db.commit()
        return updated_order