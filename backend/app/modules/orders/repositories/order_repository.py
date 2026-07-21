from uuid import UUID
from sqlalchemy import select
from app.modules.orders.models.order import Order, OrderStatus
from sqlalchemy.orm import Session

class OrderRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_order(self, order: Order) -> Order:
        self.db.add(order)
        self.db.flush()  # Flushes to DB to populate generated UUIDs without committing
        return order

    def get_order_by_id(self, order_id: UUID) -> Order | None:
        return self.db.execute(
            select(Order).where(Order.id == order_id)
        ).scalar_one_or_none()

    def get_orders_by_user(self, user_id: UUID) -> list[Order]:
        return list(
            self.db.execute(select(Order).where(Order.user_id == user_id))
            .scalars()
            .all()
        )

    def get_all_orders(self) -> list[Order]:
        return list(self.db.execute(select(Order)).scalars().all())

    def update_status(self, order: Order, new_status: OrderStatus) -> Order:
        order.status = new_status
        self.db.flush()
        return order
