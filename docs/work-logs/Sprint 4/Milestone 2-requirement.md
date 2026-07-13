Following the **Proposed Execution Framework**, we are now moving to **Sprint 4: Milestone 2 – Cart Business Logic & Enterprise UI Integration**. 

With the **Cart Module Foundation** successfully signed off and the repository quality gates established [Conversation History], the objective of this milestone is to transform the empty cart skeleton into a fully functional shopping feature that consumes your **Enterprise Design System**.

### **Step 1: Task Implementation Package (Principal Architect Role)**

#### **1. Architecture Review & Design Decisions**
*   **Business Logic Location:** All state manipulation (Add, Remove, Clear, Update Quantity) must reside strictly within the `CartService` using **Angular Signals**.
*   **Reactivity:** The `CartComponent` should not calculate totals; it must consume `computed` signals from the service for `subtotal`, `tax`, and `grandTotal`.
*   **UI Consistency:** The cart list must use the `AppCard` for line items and `SectionHeader` for the summary block.
*   **Inventory Handshake:** While we are not yet performing the final checkout, the cart must use the `StatusChip` to reflect stock availability (e.g., "In Stock" vs "Limited Stock") based on the `stock_quantity` retrieved from your verified backend inventory.

#### **2. Folder Structure & Files**
*   **Files to Modify:**
    *   `src/app/core/services/cart.service.ts`: Implement logic methods.
    *   `src/app/features/cart/cart.component.ts`: Integrate service methods.
    *   `src/app/features/cart/cart.component.html`: Build the enterprise UI.
*   **Files to Create:** 
    *   `src/app/features/cart/cart-item-card/`: (Optional) A dedicated sub-component for cart rows to keep the main component lean.

#### **3. Acceptance Criteria (Definition of Done)**
*   ✅ **State Persistence:** Adding a product from the Catalog increments the `itemCount` signal visible in the global toolbar.
*   ✅ **Quantity Management:** Users can increase/decrease quantities directly in the cart, with totals updating reactively.
*   ✅ **Empty State:** The `EmptyState` component displays when the cart signal is empty.
*   ✅ **Enterprise UI:** The checkout summary uses a sticky `AppCard` on desktop layouts.

---

### **Step 2: AI Coding Assistant Prompt (Implementation Engineer Role)**

Copy and paste the block below into your **AI Coding Assistant** chat:

> **"Act as an Implementation Engineer.** We are implementing the **Business Logic and UI** for the Cart Module in our Enterprise E-Commerce Platform.
>
> **Task:** Upgrade the existing `CartService` and `CartComponent` to support a full shopping experience.
>
> **1. Service Logic (cart.service.ts):**
> *   Implement `addToCart(product)`, `removeFromCart(productId)`, `updateQuantity(productId, quantity)`, and `clearCart()`.
> *   Ensure the `cartItems` signal is updated immutably.
> *   Create `computed` signals for `subtotal`, `estimatedTax` (8%), and `grandTotal`.
>
> **2. UI Integration (cart.component.html/.ts):**
> *   **Layout:** Use a two-column responsive grid (Items List on the left, Order Summary card on the right).
> *   **Components:** 
>     *   Use `<app-page-header>` for the title 'Shopping Cart'.
>     *   Use `<app-app-card>` for each cart item, displaying image, name, price, and a quantity selector.
>     *   Use `<app-status-chip>` to show availability based on the product's `stock_quantity`.
>     *   Use `<app-empty-state>` if the cart is empty.
> *   **Actions:** Implement a 'Proceed to Checkout' button (link to `/checkout`) and a 'Clear Cart' button using `<app-confirmation-dialog>` for the clear action.
>
> **Technical Requirements:**
> *   Use **Angular Signals** for all reactivity.
> *   Enforce **OnPush Change Detection**.
> *   Follow **Material 3** spacing and typography standards.
> *   Do **NOT** modify the backend APIs or existing models.
>
> **Deliverables:** Provide the code for `cart.service.ts`, `cart.component.ts`, and `cart.component.html`. Include a unit test verifying that `grandTotal` updates correctly when multiple items with different quantities are added."

---

### **Next Steps for You (Technical Lead / QA Role)**

1.  **Execute the Prompt:** Use the prompt above with your AI Coding Assistant.
2.  **Verify Locally:** 
    *   Add items from the Product List and navigate to `/cart`.
    *   Ensure the quantity controls update the totals immediately.
    *   Test the **Empty State** by removing all items.
3.  **Audit:** Confirm the code does not introduce new CSS but uses your **Design System** utility classes and components.
4.  **Principal Review:** Once functional, provide the code or a summary of the changes here for my **Architect Review** before you commit and move to **Sprint 4: Milestone 3 – Checkout Workflow**.