#!/usr/bin/env python3
"""
scripts/verify_db.py

Quick sanity check after seeding — prints row counts and an order-status
breakdown so you can confirm the dashboard has data to show.

    python scripts/verify_db.py

Uses the same SessionLocal as seed_database.py (app.database.session).
"""
import sys
from collections import Counter
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.database.session import SessionLocal

from app.modules.catalog.models.category import Category
from app.modules.catalog.models.product import Product
from app.modules.catalog.models.inventory import Inventory
from app.modules.orders.models.order import Order
from app.modules.orders.models.order_item import OrderItem
from app.modules.users.models.user import User


def run() -> None:
    db = SessionLocal()
    try:
        counts = {
            "Categories": db.query(Category).count(),
            "Products": db.query(Product).count(),
            "Inventory rows": db.query(Inventory).count(),
            "Users": db.query(User).count(),
            "Orders": db.query(Order).count(),
            "Order items": db.query(OrderItem).count(),
        }

        statuses = [o.status for o in db.query(Order.status).all()]
        status_breakdown = Counter(
            s.value if hasattr(s, "value") else s for s in statuses
        )

        low_stock = db.query(Inventory).filter(Inventory.stock_quantity < 10).count()
        products_without_sku = db.query(Product).filter(Product.sku.is_(None)).count()

        print("=" * 44)
        print(" DATABASE SEED VERIFICATION SUMMARY")
        print("=" * 44)
        for label, value in counts.items():
            print(f"  {label:<16} {value}")
        print("-" * 44)
        print(f"  {'Low stock (<10)':<16} {low_stock}")
        print(f"  {'Products w/o SKU':<16} {products_without_sku}")
        print("-" * 44)
        print("  Orders by status:")
        if status_breakdown:
            for status, count in sorted(status_breakdown.items()):
                print(f"    {status:<14} {count}")
        else:
            print("    (no orders found)")
        print("=" * 44)

        if counts["Products"] == 0 or counts["Users"] == 0:
            print("\nWARNING: core tables look empty — run scripts/seed_database.py first.")
    finally:
        db.close()


if __name__ == "__main__":
    run()
