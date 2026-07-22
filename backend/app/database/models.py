"""
Import every SQLAlchemy model once so:

- SQLAlchemy registry is populated
- Alembic discovers all tables
- pytest isolated tests work correctly
"""

# Auth
from app.modules.auth.models.user import User
from app.modules.auth.models.roles import Role

# Catalog
from app.modules.catalog.models.category import Category
from app.modules.catalog.models.product import Product

# Orders
from app.modules.orders.models.order import Order
from app.modules.orders.models.order_item import OrderItem

__all__ = [
    "User",
    "Role",
    "Category",
    "Product",
    "Order",
    "OrderItem",
]
