This revised AI prompt is tailored to your current project state: **Authentication and Product Catalog backends are verified, and the RBAC security fix is officially completed.** 

Following your "Backend-First" strategy, this prompt directs the **Lead Developer AI** to finalize the entire backend lifecycle for the **Orders & Cart** module, including advanced transactional logic and administrative controls as defined in your project blueprints.

### **Revised Lead Developer AI Prompt: Orders & Cart Finalization**

> "Act as a **Lead Python Developer** expert in **FastAPI** and **SQLAlchemy 2.0**. We have successfully completed the Authentication and Product modules, including a critical **RBAC security hardening** for administrative endpoints. We are now moving to the final backend phase for **Sprint 4: Orders & Cart**.
>
> **Task Requirements:**
> 1. **Database Schema (SQLAlchemy):** 
>    * Implement the `Order` model: `id` (UUID), `user_id` (FK to Users), `total_amount` (Numeric), `status` (Enum: PENDING, SHIPPED, DELIVERED, CANCELLED), and `created_at`.
>    * Implement the `OrderItem` model: `id` (UUID), `order_id` (FK to Orders), `product_id` (FK to Products), `quantity` (Integer), and `unit_price` (Numeric - capturing the price at the time of purchase).
>
> 2. **Transactional Inventory Service:** 
>    * Create an `InventoryService` method for stock validation and deduction.
>    * It must use a **SQL database transaction** to ensure that:
>        a) Stock is checked for every item in the cart.
>        b) If sufficient, `stock_quantity` is decremented in the `inventory` table.
>        c) If any item fails validation, the entire transaction is rolled back with a '400 Bad Request' (Insufficient Stock).
>
> 3. **API Catalog Implementation:**
>    * **Customer Endpoints (JWT Required):**
>        * `POST /api/v1/orders`: Accepts a list of product IDs and quantities, executes the inventory transaction, and returns the order summary.
>        * `GET /api/v1/orders`: Returns the order history for the authenticated customer.
>        * `GET /api/v1/orders/{id}`: Returns full details for a specific order and its line items.
>    * **Admin Endpoints (ADMIN Role Required):**
>        * `GET /api/v1/admin/orders`: Allows administrators to view all orders across the system.
>        * `PATCH /api/v1/admin/orders/{id}/status`: Allows admins to update the order status (e.g., PENDING to SHIPPED).
>
> 4. **Project Structure:**
>    * Adhere strictly to the **Repository and Service Layer patterns** established in our architecture.
>    * Ensure all code is stateless and includes clear docstrings for **Swagger/OpenAPI** documentation.
>
> 5. **Migrations:** Provide the **Alembic migration script** to initialize these new tables in the existing `ecommerce_db` container."

***

### **Why this Revised Prompt is Critical Now:**
*   **Atomic Transactions:** By requiring a SQL transaction for inventory deduction, you meet the **>99% Inventory Accuracy KPI**. This prevents race conditions where two customers might buy the last item simultaneously.
*   **Admin Lifecycle:** It adds the `PATCH` endpoint for status updates, closing a functional gap for the **Admin Dashboard** requirements found in your BRD.
*   **Security Baseline:** It assumes the RBAC fix is done, meaning the AI will focus its "brainpower" on the complex order logic rather than repeating security fixes.

### **Next Human Step:**
Once the AI generates this code, your primary responsibility is to review the **Transaction Logic**. Ensure that the inventory deduction happens *inside* the same database session as the order creation to maintain data integrity. 

**Would you like me to prepare a tracking update for your Master Progress Sheet once you start this implementation?**