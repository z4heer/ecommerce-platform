#!/usr/bin/env python3
# ruff: noqa: E402
from pathlib import Path
import sys

PROJECT_ROOT = Path(__file__).resolve().parent.parent

if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from sqlalchemy import func, select

import app.database.models  # noqa: F401
from app.database.seeds.master_data import (
    ADMIN_USER_SEED,
    CATEGORY_SEEDS,
    CUSTOMER_USER_SEED,
    PRODUCT_SEEDS,
)
from app.database.seeds.seed_service import (
    merge_summaries,
    seed_categories,
    seed_products,
    seed_user,
)
from app.database.session import SessionLocal
from app.modules.auth.models.user import User
from app.modules.catalog.models.category import Category
from app.modules.catalog.models.inventory import Inventory
from app.modules.catalog.models.product import Product


def main() -> None:
    db = SessionLocal()
    try:
        category_summary = seed_categories(db, CATEGORY_SEEDS)
        product_summary = seed_products(db, PRODUCT_SEEDS)
        admin_summary = seed_user(db, ADMIN_USER_SEED)
        customer_summary = seed_user(db, CUSTOMER_USER_SEED)

        summary = merge_summaries(
            category_summary, product_summary, admin_summary, customer_summary
        )

        db.commit()

        category_count = db.scalar(select(func.count()).select_from(Category)) or 0
        product_count = db.scalar(select(func.count()).select_from(Product)) or 0
        inventory_count = db.scalar(select(func.count()).select_from(Inventory)) or 0
        admin_exists = db.scalar(
            select(func.count())
            .select_from(User)
            .where(User.email == ADMIN_USER_SEED["email"])
        )
        customer_exists = db.scalar(
            select(func.count())
            .select_from(User)
            .where(User.email == CUSTOMER_USER_SEED["email"])
        )

        print("Seed completed successfully.")
        print(
            "Categories: "
            f"{category_count} total "
            f"({summary.categories_created} created, {summary.categories_updated} updated)"
        )
        print(
            "Products: "
            f"{product_count} total "
            f"({summary.products_created} created, {summary.products_updated} updated)"
        )
        print(
            "Inventory: "
            f"{inventory_count} total "
            f"({summary.inventory_created} created, {summary.inventory_updated} updated)"
        )
        print(
            "Users: "
            f"{summary.users_created} created, {summary.users_updated} updated "
            f"(admin={bool(admin_exists)}, customer={bool(customer_exists)})"
        )
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    main()
