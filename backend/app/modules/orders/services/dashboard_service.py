from app.modules.orders.repositories.dashboard_repository import DashboardRepository
from app.modules.orders.schemas.dashboard_schema import (
    DashboardResponse,
    MetricItem,
    SystemOrder,
)
from app.modules.orders.models.order import OrderStatus


class DashboardService:
    def __init__(self, repo: DashboardRepository):
        self.repo = repo

    def get_dashboard_metrics(self) -> DashboardResponse:
        total_orders = self.repo.get_total_orders_count()
        total_revenue = self.repo.get_total_revenue()
        active_products = self.repo.get_active_products_count()
        recent_orders_raw = self.repo.get_recent_orders(limit=10)

        metrics = [
            MetricItem(
                id="m1",
                label="Quarterly Revenue",
                value=f"${total_revenue:,.2f}",
                trend="up",
            ),
            MetricItem(
                id="m2",
                label="Active Products",
                value=str(active_products),
                trend="stable",
            ),
            MetricItem(
                id="m3",
                label="System Error Rate",
                value="0.04%",
                trend="down",
            ),
            MetricItem(
                id="m4",
                label="Total Orders",
                value=str(total_orders),
                trend="up",
            ),
        ]

        orders = []
        for order in recent_orders_raw:
            customer_name = (
                order.user.email
                if (order.user and order.user.email)
                else f"Customer-{str(order.user_id)[:8]}"
            )

            status_lower = "pending"
            if (
                order.status == OrderStatus.DELIVERED
                or order.status == OrderStatus.CONFIRMED
            ):
                status_lower = "completed"
            elif order.status == OrderStatus.CANCELLED:
                status_lower = "cancelled"

            orders.append(
                SystemOrder(
                    id=str(order.id),
                    customerName=customer_name,
                    amount=float(order.total_amount),
                    status=status_lower,
                    canCancel=(order.status == OrderStatus.PENDING),
                )
            )

        return DashboardResponse(metrics=metrics, orders=orders)
