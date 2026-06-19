# Sprint 4 – Orders & Cart Implementation Assignment

## Objective

Implement Order Management and Transactional Inventory Processing for the E-Commerce Platform.

Follow the existing project architecture:

```text
Repository Layer
    ↓
Service Layer
    ↓
Router Layer
```

Do not place database logic inside routers.

Do not place business logic inside repositories.

All database operations must be performed through repositories.

---

# 1. Create Module Structure

Create the following folder structure:

```text
app/modules/orders
│
├── __init__.py
│
├── models
│   ├── __init__.py
│   ├── order.py
│   └── order_item.py
│
├── repositories
│   ├── __init__.py
│   ├── order_repository.py
│   └── inventory_transaction_repository.py
│
├── schemas
│   ├── __init__.py
│   ├── order_request.py
│   └── order_response.py
│
├── services
│   ├── __init__.py
│   ├── inventory_service.py
│   └── order_service.py
│
└── routers
    ├── __init__.py
    ├── order_router.py
    └── admin_order_router.py
```

---

# 2. Database Models

## File

```text
app/modules/orders/models/order.py
```

Create:

### Enum

```python
class OrderStatus(str, Enum):
    PENDING = "PENDING"
    SHIPPED = "SHIPPED"
    DELIVERED = "DELIVERED"
    CANCELLED = "CANCELLED"
```

### Order Table

Fields:

| Column       | Type             |
| ------------ | ---------------- |
| id           | UUID PK          |
| user_id      | UUID FK users.id |
| total_amount | Numeric(12,2)    |
| status       | OrderStatus      |
| created_at   | Timestamp        |

Relationships:

```python
user
items
```

---

## File

```text
app/modules/orders/models/order_item.py
```

Create:

| Column     | Type          |
| ---------- | ------------- |
| id         | UUID PK       |
| order_id   | UUID FK       |
| product_id | UUID FK       |
| quantity   | Integer       |
| unit_price | Numeric(12,2) |

Relationships:

```python
order
product
```

---

# 3. Register Models

Update:

```text
app/database/models.py
```

Add imports:

```python
from app.modules.orders.models.order import Order
from app.modules.orders.models.order_item import OrderItem
```

This is required for Alembic discovery.

---

# 4. Request Schemas

## File

```text
schemas/order_request.py
```

Create:

```python
OrderItemRequest
```

Fields:

```python
product_id: UUID
quantity: int
```

Validation:

```python
quantity > 0
```

---

Create:

```python
CreateOrderRequest
```

Structure:

```json
{
  "items": [
    {
      "product_id": "uuid",
      "quantity": 2
    }
  ]
}
```

---

## Admin Status Update Request

Create:

```python
OrderStatusUpdateRequest
```

Fields:

```python
status: OrderStatus
```

---

# 5. Response Schemas

## File

```text
schemas/order_response.py
```

Create:

### OrderItemResponse

Fields:

```python
product_id
quantity
unit_price
```

---

### OrderResponse

Fields:

```python
id
total_amount
status
created_at
```

---

### OrderDetailResponse

Fields:

```python
id
status
total_amount
created_at
items
```

---

# 6. Repository Layer

## File

```text
repositories/order_repository.py
```

Implement methods:

### create_order()

Responsibilities:

```text
Persist Order entity
Flush session
Return Order
```

---

### get_order_by_id()

Input:

```python
order_id
```

Return:

```python
Order | None
```

---

### get_orders_by_user()

Input:

```python
user_id
```

Return:

```python
List[Order]
```

---

### get_all_orders()

Return:

```python
List[Order]
```

---

### update_status()

Update order status.

---

# 7. Inventory Transaction Repository

## File

```text
repositories/inventory_transaction_repository.py
```

Use existing Inventory model:

```python
app.modules.catalog.models.inventory
```

Implement:

### get_inventory_for_update()

Use:

```python
SELECT ... FOR UPDATE
```

SQLAlchemy equivalent:

```python
.with_for_update()
```

Purpose:

```text
Prevent overselling
Lock inventory row during transaction
```

---

# 8. Inventory Service

## File

```text
services/inventory_service.py
```

Implement:

### validate_and_deduct_stock()

Input:

```python
order_items
```

Process:

Step 1:

Load inventory rows using FOR UPDATE.

Step 2:

Validate stock quantity.

Example:

```python
inventory.stock_quantity >= requested_qty
```

Step 3:

If any validation fails:

```python
HTTPException(
    status_code=400,
    detail="Insufficient stock"
)
```

Step 4:

Deduct stock.

```python
inventory.stock_quantity -= qty
```

Important:

```text
Do not commit transaction here.
```

Service must remain transaction-safe.

---

# 9. Order Service

## File

```text
services/order_service.py
```

Implement:

---

### create_order()

Input:

```python
user_id
CreateOrderRequest
```

Flow:

```text
BEGIN TRANSACTION

Validate stock

Deduct stock

Calculate order total

Create Order

Create OrderItem rows

Persist Order

COMMIT

Return Order

ROLLBACK on error
```

---

### Pricing Rule

Use current product price.

Store copy in:

```python
OrderItem.unit_price
```

Reason:

```text
Historical pricing must not change.
```

---

### get_order_history()

Return orders belonging to authenticated user.

---

### get_order_details()

Validation:

```python
order.user_id == current_user.id
```

If not:

```python
403 Forbidden
```

---

### get_all_orders()

Admin use only.

---

### update_order_status()

Allowed transitions:

```python
PENDING -> SHIPPED
PENDING -> CANCELLED
SHIPPED -> DELIVERED
```

Reject:

```python
DELIVERED -> PENDING
```

Return:

```python
400 Invalid Status Transition
```

---

# 10. Customer Router

## File

```text
routers/order_router.py
```

Create:

### POST /api/v1/orders

Requirements:

```python
Depends(get_current_user)
```

Description:

```text
Create order and deduct inventory.
```

---

### GET /api/v1/orders

Return authenticated user's orders.

---

### GET /api/v1/orders/{order_id}

Return single order details.

Verify ownership.

---

# 11. Admin Router

## File

```text
routers/admin_order_router.py
```

Use existing RBAC dependency.

Example:

```python
Depends(require_admin)
```

Create:

---

### GET /api/v1/admin/orders

Return all orders.

---

### PATCH /api/v1/admin/orders/{order_id}/status

Request:

```json
{
  "status": "SHIPPED"
}
```

Update order status.

---

# 12. Swagger Documentation

Every endpoint must include:

```python
summary=
description=
response_model=
```

Example:

```python
summary="Create Order"
```

---

# 13. Alembic Migration

Generate migration:

```bash
alembic revision --autogenerate \
-m "add_orders_tables"
```

Verify migration creates:

```text
orders
order_items
```

Verify:

```text
foreign keys
indexes
enum
```

Apply:

```bash
alembic upgrade head
```

---

# 14. Test Cases Required

Developer must execute and provide evidence.

### Success Cases

* Create Order
* Order History
* Order Details
* Admin View All Orders
* Admin Update Status

---

### Failure Cases

* Insufficient Stock
* Invalid Product
* Unauthorized User
* Non Admin Access
* Invalid Status Transition

---

# Acceptance Criteria

| Requirement            | Expected |
| ---------------------- | -------- |
| Order Creation         | Working  |
| Inventory Deduction    | Working  |
| Rollback               | Working  |
| JWT Security           | Working  |
| RBAC                   | Working  |
| Swagger                | Working  |
| Alembic Migration      | Working  |
| Order History          | Working  |
| Order Details          | Working  |
| Admin Order Management | Working  |
| PostgreSQL Transaction | Working  |
| Row Locking            | Working  |

This is the level of detail I would hand to a junior developer. It defines **what to build, where to build it, architectural constraints, validation rules, transaction behavior, security requirements, and acceptance criteria**, while still leaving the actual coding and implementation decisions for review by the Solution Architect.
