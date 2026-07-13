Class is in session! 🎓

This specification is a beautifully designed, textbook example of an enterprise-grade transactional e-commerce engine. It uses a **clean, layered architecture** (Router $\rightarrow$ Service $\rightarrow$ Repository) and features a crucial backend pattern: **pessimistic row locking** to prevent double-spending/overselling.

Let’s implement this step-by-step. I'll provide the production-ready code along with a breakdown of **what** it does and **why** we do it that way.

---

## 1. Database Models & Registration

### `app/modules/orders/models/order.py`

```python
import uuid
from enum import Enum
from datetime import datetime
from sqlalchemy import String, Numeric, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.base import Base  # Assuming standard SQLAlchemy 2.0 Base

class OrderStatus(str, Enum):
    PENDING = "PENDING"
    SHIPPED = "SHIPPED"
    DELIVERED = "DELIVERED"
    CANCELLED = "CANCELLED"

class Order(Base):
    __tablename__ = "orders"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    total_amount: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    status: Mapped[OrderStatus] = mapped_column(String, default=OrderStatus.PENDING, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    user = relationship("User", back_populates="orders")
    items: Mapped[list["OrderItem"]] = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")

```

### `app/modules/orders/models/order_item.py`

```python
import uuid
from sqlalchemy import Numeric, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.base import Base

class OrderItem(Base):
    __tablename__ = "order_items"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    order_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    product_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("products.id"), nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    unit_price: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)

    # Relationships
    order = relationship("Order", back_populates="items")
    product = relationship("Product")  # From Catalog module

```

### `app/database/models.py`

```python
# Append these lines to your central models.py so Alembic discovers them
from app.modules.orders.models.order import Order
from app.modules.orders.models.order_item import OrderItem

```

#### 💡 The "Why"

* **SQLAlchemy 2.0 Syntax:** We use `Mapped` and `mapped_column` for strong typing, static analysis support, and full IDE auto-complete.
* **String Enums:** Storing Enums as plain strings (`str, Enum`) makes debugging database data readable while ensuring validation at the app level.
* **Cascade Delete:** `cascade="all, delete-orphan"` ensures that if an order is scrubbed, its associated items don't sit behind as database garbage.

---

## 2. Request & Response Schemas

### `app/modules/orders/schemas/order_request.py`

```python
from pydantic import BaseModel, Field, field_validator
from uuid import UUID
from app.modules.orders.models.order import OrderStatus

class OrderItemRequest(BaseModel):
    product_id: UUID
    quantity: int = Field(..., description="Quantity of items to purchase")

    @field_validator('quantity')
    @classmethod
    def validate_quantity(cls, v: int) -> int:
        if v <= 0:
            raise ValueError("Quantity must be greater than 0")
        return v

class CreateOrderRequest(BaseModel):
    items: list[OrderItemRequest]

class OrderStatusUpdateRequest(BaseModel):
    status: OrderStatus

```

### `app/modules/orders/schemas/order_response.py`

```python
from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from app.modules.orders.models.order import OrderStatus

class OrderItemResponse(BaseModel):
    product_id: UUID
    quantity: int
    unit_price: float

    class Config:
        from_attributes = True

class OrderResponse(BaseModel):
    id: UUID
    total_amount: float
    status: OrderStatus
    created_at: datetime

    class Config:
        from_attributes = True

class OrderDetailResponse(BaseModel):
    id: UUID
    status: OrderStatus
    total_amount: float
    created_at: datetime
    items: list[OrderItemResponse]

    class Config:
        from_attributes = True

```

#### 💡 The "Why"

* **Input vs. Output Separation:** Security & Data Integrity. Never expose database structures directly. Notice how `CreateOrderRequest` doesn't let the user pass `unit_price` (which would allow malicious price tampering).
* **`from_attributes = True`:** This permits Pydantic to seamlessly read ORM data attributes instead of just dictionaries.

---

## 3. Repository Layer

### `app/modules/orders/repositories/order_repository.py`

```python
from uuid import UUID
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.modules.orders.models.order import Order, OrderStatus

class OrderRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_order(self, order: Order) -> Order:
        self.db.add(order)
        self.db.flush()  # Flushes to DB to populate generated UUIDs without committing
        return order

    def get_order_by_id(self, order_id: UUID) -> Order | None:
        return self.db.execute(select(Order).where(Order.id == order_id)).scalar_one_or_none()

    def get_orders_by_user(self, user_id: UUID) -> list[Order]:
        return list(self.db.execute(select(Order).where(Order.user_id == user_id)).scalars().all())

    def get_all_orders(self) -> list[Order]:
        return list(self.db.execute(select(Order)).scalars().all())

    def update_status(self, order: Order, new_status: OrderStatus) -> Order:
        order.status = new_status
        self.db.flush()
        return order

```

### `app/modules/orders/repositories/inventory_transaction_repository.py`

```python
from uuid import UUID
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.modules.catalog.models.inventory import Inventory # Presumed system location

class InventoryTransactionRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_inventory_for_update(self, product_id: UUID) -> Inventory | None:
        # Crucial: Pessimistic locking pattern
        stmt = select(Inventory).where(Inventory.product_id == product_id).with_for_update()
        return self.db.execute(stmt).scalar_one_or_none()

```

#### 💡 The "Why"

* **`.flush()` vs `.commit()`:** Repositories must never run `.commit()`. If a repo commits, it strips the parent Service Layer of its power to roll back a multi-table workflow when things break.
* **`with_for_update()`:** This produces a `SELECT ... FOR UPDATE` query. It locks down the specific product row at the database level. If two people buy the last PlayStation simultaneously, the second user waits safely in line until the first transaction concludes.

---

## 4. Service Layer

### `app/modules/orders/services/inventory_service.py`

```python
from fastapi import HTTPException, status
from app.modules.orders.repositories.inventory_transaction_repository import InventoryTransactionRepository
from app.modules.orders.schemas.order_request import OrderItemRequest

class InventoryService:
    def __init__(self, inventory_repo: InventoryTransactionRepository):
        self.inventory_repo = inventory_repo

    def validate_and_deduct_stock(self, order_items: list[OrderItemRequest]) -> None:
        for item in order_items:
            inventory = self.inventory_repo.get_inventory_for_update(item.product_id)
            
            if not inventory:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Product {item.product_id} does not exist in inventory"
                )
            
            if inventory.stock_quantity < item.quantity:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Insufficient stock for product {item.product_id}."
                )
            
            # Mutate but DO NOT commit here
            inventory.stock_quantity -= item.quantity

```

### `app/modules/orders/services/order_service.py`

```python
from uuid import UUID
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.modules.orders.models.order import Order, OrderStatus
from app.modules.orders.models.order_item import OrderItem
from app.modules.orders.repositories.order_repository import OrderRepository
from app.modules.orders.services.inventory_service import InventoryService
from app.modules.orders.schemas.order_request import CreateOrderRequest
from app.modules.catalog.repositories.product_repository import ProductRepository # Presumed

class OrderService:
    def __init__(self, db: Session, order_repo: OrderRepository, inventory_service: InventoryService, product_repo: ProductRepository):
        self.db = db
        self.order_repo = order_repo
        self.inventory_service = inventory_service
        self.product_repo = product_repo

    def create_order(self, user_id: UUID, request: CreateOrderRequest) -> Order:
        try:
            # 1. Row locking & Inventory validation occurs inside an active Unit of Work context
            self.inventory_service.validate_and_deduct_stock(request.items)
            
            total_amount = 0.0
            order_items_entities = []

            # 2. Extract historical product prices
            for item in request.items:
                product = self.product_repo.get_by_id(item.product_id)
                if not product:
                    raise HTTPException(status_code=400, detail="Product invalid")
                
                item_price = float(product.price)
                total_amount += item_price * item.quantity

                order_items_entities.append(
                    OrderItem(
                        product_id=item.product_id,
                        quantity=item.quantity,
                        unit_price=item_price
                    )
                )

            # 3. Formulate Order object
            new_order = Order(
                user_id=user_id,
                total_amount=total_amount,
                status=OrderStatus.PENDING,
                items=order_items_entities
            )

            # 4. Save to DB
            saved_order = self.order_repo.create_order(new_order)
            
            # 5. Commit everything as an atomic transaction
            self.db.commit()
            return saved_order

        except Exception as e:
            self.db.rollback() # If anything went wrong above, undo all database changes
            if isinstance(e, HTTPException):
                raise e
            raise HTTPException(status_code=500, detail=f"Transaction Failed: {str(e)}")

    def get_order_history(self, user_id: UUID) -> list[Order]:
        return self.order_repo.get_orders_by_user(user_id)

    def get_order_details(self, order_id: UUID, current_user_id: UUID) -> Order:
        order = self.order_repo.get_order_by_id(order_id)
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        if order.user_id != current_user_id:
            raise HTTPException(status_code=403, detail="Not authorized to view this order")
        return order

    def get_all_orders(self) -> list[Order]:
        return self.order_repo.get_all_orders()

    def update_order_status(self, order_id: UUID, new_status: OrderStatus) -> Order:
        order = self.order_repo.get_order_by_id(order_id)
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")

        # Finite State Machine Transitions Validation
        valid_transitions = {
            OrderStatus.PENDING: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
            OrderStatus.SHIPPED: [OrderStatus.DELIVERED],
            OrderStatus.DELIVERED: [],
            OrderStatus.CANCELLED: []
        }

        if new_status not in valid_transitions[order.status]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid Status Transition from {order.status} to {new_status}"
            )

        updated_order = self.order_repo.update_status(order, new_status)
        self.db.commit()
        return updated_order

```

#### 💡 The "Why"

* **ACID Transactions:** The explicit `try...except...rollback` pattern guarantees Atomicity. If an unexpected runtime exception triggers after stock is deducted but before the order records can write, everything is cleanly undone.
* **Price Freezing (Snapshotting):** Notice we copy `product.price` right onto `OrderItem.unit_price`. If an administrator changes an item's price next Tuesday, historical orders remain mathematically correct.
* **Finite State Machine (FSM):** Hardcoding valid target lists protects our order tracking lifecycle from moving backwards (like resurrecting a `DELIVERED` order back to `PENDING`).

---

## 5. Router Layer (API Routing)

### Dependency Injection Hook

*Assuming standard configuration utilities are established for database context management and authorization injection.*

### `app/modules/orders/routers/order_router.py`

```python
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from uuid import UUID

from app.database.session import get_db # standard pattern dependency
from app.auth.dependencies import get_current_user # standard pattern dependency
from app.modules.orders.schemas.order_request import CreateOrderRequest
from app.modules.orders.schemas.order_response import OrderResponse, OrderDetailResponse
from app.modules.orders.services.order_service import OrderService
from app.modules.orders.repositories.order_repository import OrderRepository
from app.modules.orders.services.inventory_service import InventoryService
from app.modules.orders.repositories.inventory_transaction_repository import InventoryTransactionRepository
from app.modules.catalog.repositories.product_repository import ProductRepository

router = APIRouter(prefix="/api/v1/orders", tags=["Orders"])

def get_order_service(db: Session = Depends(get_db)) -> OrderService:
    order_repo = OrderRepository(db)
    inv_repo = InventoryTransactionRepository(db)
    inv_service = InventoryService(inv_repo)
    prod_repo = ProductRepository(db)
    return OrderService(db, order_repo, inv_service, prod_repo)

@router.post(
    "", 
    response_model=OrderResponse, 
    status_code=status.HTTP_201_CREATED,
    summary="Create Order",
    description="Processes user cart items, deducts active inventory records with row locking protection, and issues an order record."
)
def create_user_order(
    request: CreateOrderRequest, 
    current_user = Depends(get_current_user), 
    service: OrderService = Depends(get_order_service)
):
    return service.create_order(user_id=current_user.id, request=request)

@router.get(
    "", 
    response_model=list[OrderResponse],
    summary="Get Order History",
    description="Retrieves a list containing the order histories associated with the currently authenticated user session."
)
def get_user_orders(
    current_user = Depends(get_current_user), 
    service: OrderService = Depends(get_order_service)
):
    return service.get_order_history(user_id=current_user.id)

@router.get(
    "/{order_id}", 
    response_model=OrderDetailResponse,
    summary="Get Order Details",
    description="Fetches comprehensive profile details and breakdown item listings for a target order, provided user access ownership checks out."
)
def get_user_order_by_id(
    order_id: UUID, 
    current_user = Depends(get_current_user), 
    service: OrderService = Depends(get_order_service)
):
    return service.get_order_details(order_id=order_id, current_user_id=current_user.id)

```

### `app/modules/orders/routers/admin_order_router.py`

```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID

from app.database.session import get_db
from app.auth.dependencies import require_admin # RBAC structural placeholder 
from app.modules.orders.schemas.order_request import OrderStatusUpdateRequest
from app.modules.orders.schemas.order_response import OrderDetailResponse
from app.modules.orders.routers.order_router import get_order_service
from app.modules.orders.services.order_service import OrderService

admin_router = APIRouter(prefix="/api/v1/admin/orders", tags=["Admin Orders"])

@admin_router.get(
    "", 
    response_model=list[OrderDetailResponse],
    dependencies=[Depends(require_admin)],
    summary="Get All Orders",
    description="Privileged administrative query yielding system-wide order profiles records."
)
def admin_get_all_orders(service: OrderService = Depends(get_order_service)):
    return service.get_all_orders()

@admin_router.patch(
    "/{order_id}/status", 
    response_model=OrderDetailResponse,
    dependencies=[Depends(require_admin)],
    summary="Update Order Status",
    description="Administrative lifecycle router used to alter progress status codes for an order via State-Machine evaluations."
)
def admin_update_order(
    order_id: UUID, 
    request: OrderStatusUpdateRequest, 
    service: OrderService = Depends(get_order_service)
):
    return service.update_order_status(order_id=order_id, new_status=request.status)

```

#### 💡 The "Why"

* **Lean Routers:** The routes have zero logic inside them. They handle HTTP status mappings, read incoming requests, and pass the data down to the services.
* **Self-documenting Swagger:** Adding the metadata (`summary`, `description`, and `response_model`) ensures your `/docs` endpoint stays perfectly documented automatically.

---

## 6. Alembic Orchestration

To finalize discovery and apply changes to your PostgreSQL instance, execute the following commands in your terminal environment:

```bash
# 1. Construct a structural snapshot of the schemas
alembic revision --autogenerate -m "add_orders_tables"

# 2. Review the autogenerated script under alembic/versions/ then apply to production
alembic upgrade head

```