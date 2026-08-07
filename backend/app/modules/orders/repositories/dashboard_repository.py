from sqlalchemy import select, func
from sqlalchemy.orm import Session, joinedload
from app.modules.orders.models.order import Order
from app.modules.catalog.models.product import Product


class DashboardRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_total_orders_count(self) -> int:
        stmt = select(func.count(Order.id))
        return self.db.execute(stmt).scalar() or 0

    def get_total_revenue(self) -> float:
        stmt = select(func.coalesce(func.sum(Order.total_amount), 0.0))
        return float(self.db.execute(stmt).scalar() or 0.0)

    def get_active_products_count(self) -> int:
        stmt = select(func.count(Product.id)).where(Product.is_active.is_(True))
        return self.db.execute(stmt).scalar() or 0

    def get_recent_orders(self, limit: int = 10) -> list[Order]:
        stmt = (
            select(Order)
            .options(joinedload(Order.user))
            .order_by(Order.created_at.desc())
            .limit(limit)
        )
        return list(self.db.execute(stmt).scalars().all())
