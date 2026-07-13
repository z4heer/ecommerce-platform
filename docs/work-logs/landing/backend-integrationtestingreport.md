# Sprint 4 Integration Test Report

## E-Commerce Platform - Orders & Inventory Module

### Project

E-Commerce Platform

### Sprint

Sprint 4 – Orders & Inventory Management

### Environment

| Component        | Version        |
| ---------------- | -------------- |
| Backend          | FastAPI        |
| Database         | PostgreSQL 17  |
| Cache            | Redis 8        |
| Runtime          | Python 3.12    |
| Containerization | Docker Compose |
| Authentication   | JWT            |
| Authorization    | RBAC           |

---

# Objective

Validate end-to-end functionality of the Orders and Inventory module including:

* Order Creation
* Inventory Validation
* Inventory Deduction
* Order Persistence
* Order Item Persistence
* JWT Authentication
* RBAC Authorization
* Admin Order Management
* Order Status Updates
* Input Validation
* Error Handling

---

# Test Results Summary

| Test ID | Test Scenario                     | Expected Result             | Actual Result         | Status |
| ------- | --------------------------------- | --------------------------- | --------------------- | ------ |
| ORD-001 | Create Order with Valid Product   | Order Created               | 201 Created           | PASS   |
| ORD-002 | Verify Order Persistence          | Order Saved in Orders Table | Record Found          | PASS   |
| ORD-003 | Verify Order Item Persistence     | Order Items Saved           | Records Found         | PASS   |
| ORD-004 | Inventory Deduction After Order   | Stock Reduced               | Inventory Updated     | PASS   |
| ORD-005 | Order Total Calculation           | Total Amount Correct        | Correct Amount Stored | PASS   |
| ORD-006 | Insufficient Inventory Validation | Reject Order                | 400 Bad Request       | PASS   |
| ORD-007 | Invalid Product Validation        | Reject Order                | 400 Bad Request       | PASS   |
| ORD-008 | JWT Authentication Validation     | Reject Invalid Token        | 401 Unauthorized      | PASS   |
| ORD-009 | Customer RBAC Validation          | Reject Unauthorized Access  | 403 Forbidden         | PASS   |
| ORD-010 | Admin RBAC Validation             | Reject Non-Admin Access     | 403 Forbidden         | PASS   |
| ORD-011 | Get Order Details                 | Return Order Information    | 200 OK                | PASS   |
| ORD-012 | Get All Orders (Admin)            | Return Order List           | 200 OK                | PASS   |
| ORD-013 | Update Order Status               | Status Updated              | 200 OK                | PASS   |
| ORD-014 | Enum Validation                   | Reject Invalid Status       | 422 Validation Error  | PASS   |

---

# Detailed Test Execution

## Test Case ORD-001

### Create Order

Request:

POST /api/v1/orders

Payload:

{
"items": [
{
"product_id": "<valid_product>",
"quantity": 7
}
]
}

Expected:

* Order Created
* Inventory Updated
* Status PENDING

Actual:

* HTTP 201 Created
* Order Generated Successfully
* Status PENDING

Result: PASS

---

## Test Case ORD-002

### Verify Order Persistence

Database Verification:

SELECT * FROM orders;

Result:

* Order ID Generated
* User ID Stored
* Total Amount Stored
* Status Stored

Result: PASS

---

## Test Case ORD-003

### Verify Order Item Persistence

Database Verification:

SELECT * FROM order_items;

Result:

* Order Item Record Created
* Product ID Stored
* Quantity Stored
* Unit Price Stored

Result: PASS

---

## Test Case ORD-004

### Inventory Deduction Validation

Before Order:

stock_quantity = 990

Order Quantity:

7

After Order:

stock_quantity = 983

Calculation:

990 - 7 = 983

Result: PASS

---

## Test Case ORD-005

### Total Amount Calculation

Product Unit Price:

41000

Quantity:

7

Expected Total:

287000

Database Value:

287000

Result: PASS

---

## Test Case ORD-006

### Insufficient Inventory Validation

Request Quantity:

991

Available Stock:

983

Expected:

400 Bad Request

Actual:

{
"detail": "Insufficient stock"
}

Result: PASS

---

## Test Case ORD-007

### Invalid Product Validation

Request:

Invalid Product UUID

Expected:

400 Bad Request

Actual:

{
"detail": "Product does not exist in inventory"
}

Result: PASS

---

## Test Case ORD-008

### JWT Validation

Scenario:

Expired / Invalid Token

Expected:

401 Unauthorized

Actual:

{
"detail": "Invalid token"
}

Result: PASS

---

## Test Case ORD-009

### Customer Authorization Validation

Scenario:

Restricted Endpoint Access

Expected:

403 Forbidden

Actual:

{
"detail": "Customer access required"
}

Result: PASS

---

## Test Case ORD-010

### Admin Authorization Validation

Scenario:

Admin Endpoint Access by Non-Admin User

Expected:

403 Forbidden

Actual:

{
"detail": "Admin access required"
}

Result: PASS

---

## Test Case ORD-011

### Get Order Details

Request:

GET /api/v1/orders/{order_id}

Expected:

Order Information Returned

Actual:

200 OK

Returned:

* Order ID
* Status
* Total Amount
* Items
* Unit Price

Result: PASS

---

## Test Case ORD-012

### Admin Get All Orders

Request:

GET /api/v1/admin/orders

Expected:

Order List Returned

Actual:

200 OK

Returned:

* Multiple Orders
* Nested Order Items
* Status Information

Result: PASS

---

## Test Case ORD-013

### Update Order Status

Request:

PATCH /api/v1/admin/orders/{order_id}/status

Payload:

{
"status": "SHIPPED"
}

Expected:

Status Updated

Actual:

200 OK

Database Verification:

Status = SHIPPED

Result: PASS

---

## Test Case ORD-014

### Enum Validation

Request:

{
"status": "AT_ADMIN"
}

Expected:

Validation Failure

Actual:

422 Unprocessable Entity

Allowed Values:

* PENDING
* SHIPPED
* DELIVERED
* CANCELLED

Result: PASS

---

# Security Validation

Verified:

✓ JWT Authentication

✓ Role-Based Access Control (RBAC)

✓ Customer Authorization

✓ Admin Authorization

✓ Invalid Token Handling

✓ Invalid Input Validation

---

# Logging Validation

Verified:

✓ Order Creation Logs

✓ Product Lookup Logs

✓ Inventory Validation Logs

✓ Exception Logging

✓ Transaction Logging

---

# Issues Identified and Resolved

| Issue                                            | Resolution                       |
| ------------------------------------------------ | -------------------------------- |
| ProductRepository.get_by_id() parameter mismatch | Added missing db parameter       |
| Product Router indentation error                 | Fixed try block indentation      |
| Container restart loop                           | Resolved after syntax correction |
| Missing order retrieval test data                | Retested with valid order ID     |

---

# Conclusion

Orders & Inventory Module successfully passed integration testing.

Overall Status:

PASS

Sprint 4 Deliverables Completed:

✓ Order Creation

✓ Inventory Validation

✓ Inventory Deduction

✓ Order Persistence

✓ Order Item Persistence

✓ JWT Security

✓ RBAC Security

✓ Order Retrieval

✓ Order Status Management

✓ Logging

Recommendation:

Sprint 4 is approved for merge into the main branch following completion of final code review and Pull Request review.
