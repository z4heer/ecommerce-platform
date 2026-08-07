#!/usr/bin/env python3
# ruff: noqa: E402
"""
scripts/seed_database.py

Bootstrap & recovery seeder for the local dev database — adapted to the
actual project schema (UUID PKs, Product.category as a plain string,
role-based Users, 4-value OrderStatus).

    python scripts/seed_database.py

Both open items from earlier drafts are now resolved against your real
`app/database/session.py` and `app/modules/users/models/roles.py`:
  - Sync `Session` via `sessionmaker` (session.py) — confirmed no async
    engine is in play, matches the sync-only calls in your repos.
  - `Role` is a simple id/name table — role resolution below looks it up
    by name and auto-creates it if missing (see _resolve_role_id).

ONE THING STILL WORTH A QUICK CHECK: I'm assuming your existing roles
(if any are already seeded) are named "admin" and "customer" in
lowercase. If your app actually uses different names (e.g. "ADMIN",
"Administrator"), update ADMIN_ROLE_NAME / CUSTOMER_ROLE_NAME below —
otherwise this will just create new lowercase role rows alongside
whatever you already have, which is harmless but may leave a stray
duplicate-looking role.

What it does, in order:
  1. Ensures tables exist (Base.metadata.create_all — safe no-op if your
     Alembic migrations already created them; drop this line if you'd
     rather seeding fail loudly when migrations haven't been run).
  2. Seeds the 5 master categories (categories table) — and note
     Product.category is a plain string, not a category_id FK, so it's
     also set directly on each product to keep both consistent.
  3. Generates a small SVG placeholder per product and seeds 30 products,
     each with a matching Inventory row (stock_quantity + reserved_quantity)
     created in the same transaction.
  4. Seeds the standard admin + customer users (bcrypt via your
     app.core.security.hash_password, written to User.password_hash).
  5. Seeds 8 demo orders across PENDING / SHIPPED / DELIVERED / CANCELLED
     (your OrderStatus has no PROCESSING value), each with a
     shipping_address since that column is required.

Idempotent: re-running this script will not create duplicate rows — every
insert checks for an existing row first, keyed on a natural unique field
(category name, product sku, user email).

NOTE ON SYNC VS ASYNC: your ProductRepository / InventoryRepository are
type-hinted `db: AsyncSession` but their methods call `db.query(...)` and
un-awaited `db.execute(...)` — that only works on a sync `Session`. This
script uses a sync Session throughout, matching what the repo methods
actually do rather than their type hints. Worth fixing the type hints
project-wide at some point.
"""

import random
import sys
from decimal import Decimal
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.database.base import Base
from app.database.session import SessionLocal, engine

from app.core.security import hash_password
from app.modules.catalog.models.category import Category
from app.modules.catalog.models.product import Product
from app.modules.catalog.models.inventory import Inventory
from app.modules.catalog.repositories.product_repository import ProductRepository
from app.modules.catalog.repositories.inventory_repository import InventoryRepository
from app.modules.orders.models.order_item import OrderItem
from app.modules.orders.repositories.order_repository import OrderRepository
from app.modules.auth.models.user import User
from app.modules.auth.models.roles import Role
from scripts.generate_placeholder_images import generate_product_svgs
from seed_data.categories import CATEGORIES
from seed_data.products import PRODUCTS
from app.modules.orders.models.order import (
    Order,
    OrderStatus,
    PaymentMethod,
    PaymentStatus,
    Currency,
)

ADMIN_EMAIL = "admin@test.com"
ADMIN_PASSWORD = "Admin@12345"  # rotate before using outside local/demo
CUSTOMER_EMAIL = "cust01@company.com"
CUSTOMER_PASSWORD = "Customer@12345"
ADMIN_ROLE_NAME = "admin"  # verify against your existing roles table
CUSTOMER_ROLE_NAME = "customer"  # verify against your existing roles table

DEMO_ORDER_COUNT = 8
# Your OrderStatus only has these 4 values (no PROCESSING).
ORDER_STATUS_WEIGHTS = {
    OrderStatus.PENDING: 3,
    OrderStatus.SHIPPED: 2,
    OrderStatus.DELIVERED: 3,
    OrderStatus.CANCELLED: 1,
}
DEMO_SHIPPING_ADDRESSES = [
    "221B Baker Street, London, UK",
    "42 Wallaby Way, Sydney, NSW, Australia",
    "1600 Amphitheatre Pkwy, Mountain View, CA, USA",
    "4 Privet Drive, Little Whinging, Surrey, UK",
    "350 Fifth Avenue, New York, NY, USA",
    "1 Infinite Loop, Cupertino, CA, USA",
]


def slugify(name: str) -> str:
    return name.lower().replace(" ", "-")


def _resolve_role_id(db, role_name: str):
    """
    Looks up a Role by name; creates it if it doesn't exist yet (Role is
    just id + name, so this is safe). If your app pre-seeds roles with
    different casing/naming, update ADMIN_ROLE_NAME / CUSTOMER_ROLE_NAME
    above instead of relying on the auto-create fallback.
    """
    role = db.query(Role).filter(Role.name == role_name).first()
    if role:
        return role.id

    role = Role(name=role_name)
    db.add(role)
    db.flush()
    print(f"  note: role {role_name!r} didn't exist — created it")
    return role.id


def seed_categories(db) -> dict[str, str]:
    """Returns {category_name: category_id} — category_id isn't used as an
    FK yet (see module docstring) but returned for completeness."""
    name_to_id: dict[str, str] = {}
    for item in CATEGORIES:
        existing = db.query(Category).filter(Category.name == item["name"]).first()
        if existing:
            name_to_id[item["name"]] = existing.id
            print(f"  exists   category: {item['name']}")
            continue

        category = Category(
            name=item["name"],
            slug=slugify(item["name"]),
            description=item["description"],
        )
        db.add(category)
        db.flush()
        name_to_id[item["name"]] = category.id
        print(f"  created  category: {item['name']}")
    return name_to_id


def seed_products(db) -> list:
    product_repo = ProductRepository(db)
    inventory_repo = InventoryRepository(db)
    image_map = generate_product_svgs(PRODUCTS)  # {sku: image_url}

    product_ids = []
    for item in PRODUCTS:
        existing = db.query(Product).filter(Product.sku == item["sku"]).first()
        if existing:
            existing.image_url = image_map[item["sku"]]
            product_ids.append(existing.id)
            continue

        product = Product(
            name=item["name"],
            description=item["description"],
            category=item["category"],  # plain string, see module docstring
            sku=item["sku"],
            price=Decimal(item["price"]),
            image_url=image_map[item["sku"]],
            is_active=True,
        )
        product = product_repo.create(
            db, product
        )  # matches their (db, product) signature

        inventory = Inventory(
            product_id=product.id,
            stock_quantity=item["stock_quantity"],
            reserved_quantity=0,
        )
        inventory_repo.create(db, inventory)

        product_ids.append(product.id)

    print(f"  seeded {len(product_ids)} products (each with an Inventory row)")
    return product_ids


def seed_users(db) -> tuple:
    admin_role_id = _resolve_role_id(db, ADMIN_ROLE_NAME)
    customer_role_id = _resolve_role_id(db, CUSTOMER_ROLE_NAME)

    admin = db.query(User).filter(User.email == ADMIN_EMAIL).first()
    if not admin:
        admin = User(
            email=ADMIN_EMAIL,
            password_hash=hash_password(ADMIN_PASSWORD),
            role_id=admin_role_id,
        )
        db.add(admin)
        db.flush()
    print(f"  admin user:    {admin.email}")

    customer = db.query(User).filter(User.email == CUSTOMER_EMAIL).first()
    if not customer:
        customer = User(
            email=CUSTOMER_EMAIL,
            password_hash=hash_password(CUSTOMER_PASSWORD),
            role_id=customer_role_id,
        )
        db.add(customer)
        db.flush()
    print(f"  customer user: {customer.email}")

    return admin.id, customer.id


def seed_orders(db, customer_id, product_ids: list) -> None:
    order_repo = OrderRepository(db)

    if db.query(Order).first():
        print("  orders already exist — skipping demo order generation")
        return

    statuses = list(ORDER_STATUS_WEIGHTS.keys())
    weights = list(ORDER_STATUS_WEIGHTS.values())

    # Load complete Product objects once
    products = db.query(Product).filter(Product.id.in_(product_ids)).all()

    product_lookup = {product.id: product for product in products}

    created = 0

    for order_index in range(DEMO_ORDER_COUNT):

        status = random.choices(statuses, weights=weights, k=1)[0]

        chosen_products = random.sample(product_ids, k=random.randint(1, 3))

        items = []
        total_amount = Decimal("0.00")

        for pid in chosen_products:

            product = product_lookup[pid]

            quantity = random.randint(1, 3)

            unit_price = Decimal(product.price)

            subtotal = unit_price * quantity

            item = OrderItem(
                product_id=product.id,
                quantity=quantity,
                unit_price=unit_price,
                subtotal=subtotal,
                product_name=product.name,
                product_sku=product.sku or "",
            )

            items.append(item)

            total_amount += subtotal

        order = Order(
            order_number=f"ORD-{100000 + order_index}",
            user_id=customer_id,
            status=status,
            total_amount=total_amount,
            shipping_address=random.choice(DEMO_SHIPPING_ADDRESSES),
            payment_method=PaymentMethod.COD,
            payment_status=PaymentStatus.PENDING,
            currency=Currency.INR,
            items=items,
        )

        order_repo.create_order(order)

        created += 1

    print(f"  seeded {created} demo orders across {len(statuses)} statuses")


def run() -> None:
    print("Ensuring tables exist (create_all)...")
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        print("\n[1/4] Seeding categories...")
        seed_categories(db)
        db.commit()

        print("\n[2/4] Generating placeholder images + seeding products/inventory...")
        product_ids = seed_products(db)
        db.commit()

        print("\n[3/4] Seeding users...")
        admin_id, customer_id = seed_users(db)
        db.commit()

        print("\n[4/4] Seeding demo orders...")
        seed_orders(db, customer_id, product_ids)
        db.commit()

        print("\nDatabase seed complete.")
        print(f"  Admin login:    {ADMIN_EMAIL} / {ADMIN_PASSWORD}")
        print(f"  Customer login: {CUSTOMER_EMAIL} / {CUSTOMER_PASSWORD}")
        print(
            "  (rotate these passwords before using outside a local/demo environment)"
        )
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    run()
