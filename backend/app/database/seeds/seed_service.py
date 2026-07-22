from __future__ import annotations

from dataclasses import dataclass

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.modules.auth.models.roles import Role
from app.modules.auth.models.user import User
from app.modules.catalog.models.category import Category
from app.modules.catalog.models.inventory import Inventory
from app.modules.catalog.models.product import Product


@dataclass
class SeedSummary:
    categories_created: int = 0
    categories_updated: int = 0
    products_created: int = 0
    products_updated: int = 0
    inventory_created: int = 0
    inventory_updated: int = 0
    users_created: int = 0
    users_updated: int = 0


def seed_categories(db: Session, category_seeds: list[dict]) -> SeedSummary:
    summary = SeedSummary()

    for payload in category_seeds:
        category = db.scalar(
            select(Category).where(
                (Category.slug == payload["slug"]) | (Category.name == payload["name"])
            )
        )

        if category is None:
            category = Category(**payload)
            db.add(category)
            summary.categories_created += 1
        else:
            category.name = payload["name"]
            category.slug = payload["slug"]
            category.description = payload["description"]
            summary.categories_updated += 1

    db.flush()
    return summary


def seed_products(db: Session, product_seeds: list[dict]) -> SeedSummary:
    summary = SeedSummary()

    for payload in product_seeds:
        product = db.scalar(
            select(Product).where(
                (Product.sku == payload["sku"]) | (Product.name == payload["name"])
            )
        )

        if product is None:
            product = Product(
                sku=payload["sku"],
                name=payload["name"],
                description=payload["description"],
                category=payload["category"],
                price=payload["price"],
                image_url=payload["image_url"],
                image_alt=payload["image_alt"],
                is_active=True,
            )
            db.add(product)
            db.flush()
            summary.products_created += 1
        else:
            product.sku = payload["sku"]
            product.name = payload["name"]
            product.description = payload["description"]
            product.category = payload["category"]
            product.price = payload["price"]
            product.image_url = payload["image_url"]
            product.is_active = True
            db.flush()
            summary.products_updated += 1

        inventory = db.scalar(
            select(Inventory).where(Inventory.product_id == product.id)
        )
        if inventory is None:
            inventory = Inventory(
                product_id=product.id,
                stock_quantity=payload["stock"],
                reserved_quantity=0,
            )
            db.add(inventory)
            summary.inventory_created += 1
        else:
            inventory.stock_quantity = payload["stock"]
            inventory.reserved_quantity = 0
            summary.inventory_updated += 1

    db.flush()
    return summary


def seed_user(db: Session, payload: dict) -> SeedSummary:
    summary = SeedSummary()

    role = db.scalar(select(Role).where(Role.name == payload["role_name"]))
    if role is None:
        role = Role(name=payload["role_name"])
        db.add(role)
        db.flush()

    user = db.scalar(select(User).where(User.email == payload["email"]))
    password_hash = hash_password(payload["password"])

    if user is None:
        user = User(
            email=payload["email"],
            password_hash=password_hash,
            role_id=role.id,
        )
        db.add(user)
        summary.users_created += 1
    else:
        user.password_hash = password_hash
        user.role_id = role.id
        summary.users_updated += 1

    db.flush()
    return summary


def merge_summaries(*summaries: SeedSummary) -> SeedSummary:
    merged = SeedSummary()
    for summary in summaries:
        merged.categories_created += summary.categories_created
        merged.categories_updated += summary.categories_updated
        merged.products_created += summary.products_created
        merged.products_updated += summary.products_updated
        merged.inventory_created += summary.inventory_created
        merged.inventory_updated += summary.inventory_updated
        merged.users_created += summary.users_created
        merged.users_updated += summary.users_updated
    return merged
