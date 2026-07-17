from app.database.seeds.master_data import (
    ADMIN_USER_SEED,
    CATEGORY_SEEDS,
    CUSTOMER_USER_SEED,
    PRODUCT_SEEDS,
)
from app.modules.orders.models.order import Order


def test_category_seed_has_expected_coverage() -> None:
    assert len(CATEGORY_SEEDS) >= 7
    assert len({category["slug"] for category in CATEGORY_SEEDS}) == len(CATEGORY_SEEDS)
    assert len({category["name"] for category in CATEGORY_SEEDS}) == len(CATEGORY_SEEDS)


def test_product_seed_has_expected_coverage() -> None:
    assert 20 <= len(PRODUCT_SEEDS) <= 30
    assert len({product["sku"] for product in PRODUCT_SEEDS}) == len(PRODUCT_SEEDS)
    assert all(product["image_url"].endswith(".svg") for product in PRODUCT_SEEDS)
    assert all(product["stock"] >= 0 for product in PRODUCT_SEEDS)


def test_seed_users_are_distinct() -> None:
    assert ADMIN_USER_SEED["email"] != CUSTOMER_USER_SEED["email"]
    assert ADMIN_USER_SEED["role_name"] == "Admin"
    assert CUSTOMER_USER_SEED["role_name"] == "Customer"


def test_order_relationship_keeps_order_item_mapping() -> None:
    assert "items" in Order.__dict__
