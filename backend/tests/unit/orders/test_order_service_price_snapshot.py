import uuid
from unittest.mock import MagicMock


from app.modules.orders.models.order import Order
from app.modules.orders.schemas.order_request import (
    CreateOrderRequest,
    OrderItemRequest,
)
from app.modules.orders.services.order_service import OrderService
from decimal import Decimal


class _FakeProduct:
    def __init__(self, price: float) -> None:
        self.id = uuid.uuid4()
        self.price = Decimal(str(price))
        self.name = "Test Product"
        self.sku = "TEST-001"


def _build_service(product_price: float):
    db = MagicMock()
    order_repo = MagicMock()
    inventory_service = MagicMock()
    product_repo = MagicMock()

    product = _FakeProduct(price=product_price)
    product_repo.get_by_id.return_value = product

    def _create_order(order: Order) -> Order:
        order.id = uuid.uuid4()
        return order

    order_repo.create_order.side_effect = _create_order

    service = OrderService(
        db=db,
        order_repo=order_repo,
        inventory_service=inventory_service,
        product_repo=product_repo,
    )
    return service, product


def test_order_item_snapshots_price_at_creation_time() -> None:
    """unit_price on OrderItem must be captured at order-creation time."""
    service, _ = _build_service(product_price=19.99)

    request = CreateOrderRequest(
        items=[OrderItemRequest(product_id=uuid.uuid4(), quantity=2)],
        shipping_address="221B Baker Street, London",
    )

    order = service.create_order(user_id=uuid.uuid4(), request=request)

    assert len(order.items) == 1
    assert order.items[0].unit_price == Decimal("19.99")
    assert order.items[0].subtotal == Decimal("39.98")


def test_order_total_is_immune_to_later_price_changes() -> None:
    """Changing Product.price after order creation must not alter a
    previously created order's snapshot unit_price or total_amount."""
    service, product = _build_service(product_price=50.00)

    request = CreateOrderRequest(
        items=[OrderItemRequest(product_id=uuid.uuid4(), quantity=1)],
        shipping_address="221B Baker Street, London",
    )

    order = service.create_order(user_id=uuid.uuid4(), request=request)
    original_unit_price = order.items[0].unit_price
    original_total = order.total_amount

    # Simulate an admin price change happening after the order was placed.
    product.price = 999.00

    assert order.items[0].unit_price == original_unit_price
    assert order.total_amount == original_total
    assert order.items[0].unit_price != product.price


def test_shipping_address_persisted_on_order() -> None:
    service, _ = _build_service(product_price=10.0)

    request = CreateOrderRequest(
        items=[OrderItemRequest(product_id=uuid.uuid4(), quantity=1)],
        shipping_address="742 Evergreen Terrace, Springfield",
    )

    order = service.create_order(user_id=uuid.uuid4(), request=request)

    assert order.shipping_address == "742 Evergreen Terrace, Springfield"
