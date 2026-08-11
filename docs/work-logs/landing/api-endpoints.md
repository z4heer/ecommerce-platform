This document summarizes the current state of the **Enterprise E-Commerce Platform's** backend, drawing from the verified testing evidence in Sprints 3 and 4. The backend is built using **FastAPI** and is fully containerized with **PostgreSQL 17** and **Redis 8**.

### **1. Current Backend API Overview**
The backend has evolved through four sprints, achieving a **50% completion status** [Artifact 4]. It currently features three core functional modules:
*   **Authentication & Security:** Stateless JWT-based authentication with Role-Based Access Control (RBAC).
*   **Product Catalog:** High-performance catalog management utilizing Redis for caching (<1s response target).
*   **Orders & Inventory:** Transactional order processing with atomic inventory validation and deduction.

---

### **2. Swagger/OpenAPI Endpoints**
The following endpoints are currently active and accessible via the local development environment at `http://localhost:8000/docs`.

| Module | Method | Endpoint | Access Level | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | POST | `/api/v1/auth/register` | Public | Registers a new user with a hashed password. |
| | POST | `/api/v1/auth/login` | Public | Authenticates user; returns Access & Refresh tokens. |
| **Products**| GET | `/api/v1/products` | Public | Retrieves all products (Cached in Redis). |
| | GET | `/api/v1/products/{id}` | Public | Retrieves specific product details. |
| | POST | `/api/v1/products` | **Admin Only** | Creates a new product and inventory record. |
| | PUT | `/api/v1/products/{id}` | **Admin Only** | Updates existing product details. |
| | DELETE | `/api/v1/products/{id}` | **Admin Only** | Removes product from catalog. |
| **Orders** | POST | `/api/v1/orders` | Customer | Creates order, validates and deducts inventory. |
| | GET | `/api/v1/orders` | Customer | Retrieves order history for the logged-in user. |
| | GET | `/api/v1/orders/{id}` | Customer | Retrieves specific order line-items and status. |
| **Admin** | GET | `/api/v1/admin/orders` | **Admin Only** | Views all orders across the system. |
| | PATCH | `/api/v1/admin/orders/{id}/status`| **Admin Only** | Updates status (e.g., PENDING to SHIPPED). |

---

### **3. Request & Response Examples**
The following examples are synthesized from the verified integration testing reports and visual evidence.

#### **A. User Login (`POST /api/v1/auth/login`)**
**Request Payload:**
```json
{
  "email": "admin@test.com",
  "password": "Admin123"
}
```
**Successful Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1...",
  "refresh_token": "eyJhbGciOiJIUzI1...",
  "token_type": "bearer"
}
```
*Source:*

#### **B. Create Order (`POST /api/v1/orders`)**
**Request Payload (Customer Role Required):**
```json
{
  "items": [
    {
      "product_id": "99b1faac-875f-42e4-9b1c-6b897b35b6fb",
      "quantity": 7
    }
  ]
}
```
**Successful Response (201 Created):**
*The system atomically verifies that stock exists (e.g., 990 units) and decrements it (to 983 units) before confirming the order.*
```json
{
  "order_id": "...",
  "total_amount": 287000,
  "status": "PENDING"
}
```
*Source:*

#### **C. RBAC Hardening Example (`PUT /api/v1/products/{id}`)**
**Scenario: Customer attempts to update a product.**
**Response (403 Forbidden):**
```json
{
  "detail": "Admin access required"
}
```
*Source:*

### **4. Verification Status**
*   **Atomic Inventory Integrity:** Verified. Stock is correctly deducted during the order lifecycle.
*   **Cache Performance:** Verified. The `all_products` key exists in Redis with a valid TTL.
*   **Security:** Verified. RBAC successfully blocks unauthorized access to Product and Admin Order endpoints.

###

### **1. Authentication Module**
These endpoints manage user registration and secure, stateless sessions using JWT.

*   **Register User (`POST /api/v1/auth/register`)**
    *   **Request Payload:** 
        ```json
        {
          "email": "admin@test.com",
          "password": "Admin123",
          "role_id": "a63fa89a-7520-45a3-9976-5d62f8775132"
        }
        ```
    *   **Successful Response (200 OK):**
        ```json
        {
          "id": "e90bd3a6-c065-40e9-bf15-522f155d9dd7",
          "email": "admin@test.com"
        }
        ```

*   **Login (`POST /api/v1/auth/login`)**
    *   **Request Payload:**
        ```json
        {
          "email": "admin@test.com",
          "password": "Admin123"
        }
        ```
    *   **Successful Response (200 OK):**
        ```json
        {
          "access_token": "eyJhbGciOiJIUzI1...",
          "refresh_token": "eyJhbGciOiJIUzI1...",
          "token_type": "bearer"
        }
        ```

---

### **2. Product Catalog Module**
The catalog uses **Redis caching** for public browsing to ensure response times of less than one second.

*   **Get Products (`GET /api/v1/products`)**
    *   **Query Parameters:** `category`, `size`.
    *   **Example Response (200 OK):**
        ```json
        [
          {
            "category": "Electronics",
            "is_active": true,
            "name": "Dell Inspiron 15",
            "id": "99b1faac-875f-42e4-9b1c-6b897b35b6fb",
            "price": 65000.00,
            "updated_at": "2026-06-15T15:59:30.934415+00:00"
          }
        ]
        ```

*   **Create Product (`POST /api/v1/products`) — Admin Only**
    *   **Request Payload:**
        ```json
        {
          "name": "Intel Cemndspiron 9015",
          "description": "Intel i7 Laptop",
          "category": "Electronics",
          "price": 80000.00,
          "stock_quantity": 30
        }
        ```
    *   **Result:** Product record is created in PostgreSQL and a corresponding inventory record is initialized.

---

### **3. Orders & Inventory Module**
This module implements atomic inventory validation and transaction persistence.

*   **Create Order (`POST /api/v1/orders`) — Customer Only**
    *   **Request Payload:**
        ```json
        {
          "items": [
            {
              "product_id": "99b1faac-875f-42e4-9b1c-6b897b35b6fb",
              "quantity": 7
            }
          ]
        }
        ```
    *   **Successful Response (201 Created):**
        ```json
        {
          "order_id": "...",
          "total_amount": 287000.00,
          "status": "PENDING"
        }
        ```

*   **Get Order Details (`GET /api/v1/orders/{order_id}`)**
    *   **Response (200 OK):** Includes order ID, current status, total amount, and nested item details like `unit_price`.

---

### **4. Admin Management**
*   **Update Order Status (`PATCH /api/v1/admin/orders/{order_id}/status`)**
    *   **Request Payload:**
        ```json
        {
          "status": "SHIPPED"
        }
        ```
    *   **Validation:** Accepts only valid Enum values: `PENDING`, `SHIPPED`, `DELIVERED`, `CANCELLED`. Invalid status values return a **422 Unprocessable Entity**.

### **Summary of Common Error Responses**
*   **400 Bad Request:** Returned for "Insufficient stock" or "Product does not exist".
*   **401 Unauthorized:** Returned for expired or invalid JWT tokens.
*   **403 Forbidden:** Returned when a Customer attempts to access Admin endpoints (e.g., product updates).

### **Other Portfolio Projects (Sample Endpoints)**
While the e-commerce flagship is the most detailed, the sources list the following sample APIs for upcoming automation projects:
*   **Document AI:** `/upload`, `/extract`, `/export`.
*   **Workflow Automation:** `/workflow/create`, `/execute`.
*   **AI Reporting:** `/upload`, `/report/generate`.
*   **Trading Automation:** `/trade/add`, `/analytics`, `/backtest`.