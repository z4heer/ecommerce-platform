Following the **Proposed Execution Framework**, we are now transitioning to **Sprint 4: Orders & Cart Module**. As the **Principal Architect**, I have prepared the first implementation package for this phase.

This task, **Sprint 4 – Milestone 1**, focuses on the **Repository Polish & Cart Foundation**. It addresses the critical recommendations from your **Final Release 1.0 Sign-off** while establishing the architectural skeleton for the shopping cart.

### **1. Role 1: Architecture Review & Design Decisions**
*   **Objective:** Implement the repository quality gates (ESLint/Prettier) and initialize the `Cart` feature module using the approved enterprise structure.
*   **State Management:** The Cart will utilize **Angular Signals** for reactive state management (items, quantity, total) to maintain the project's **10/10 architecture score**.
*   **Quality Gates:** Configuration of **ESLint, Prettier, and Husky** is mandatory to resolve the technical debt (TD-002) identified in the last audit.
*   **Pattern:** Follow the **Feature-based Routing pattern** established in Sprint 3.1B.

### **2. Implementation Details**
*   **New Feature Module:** `src/app/features/cart/`
*   **Key Files to Create:**
    *   `cart.service.ts`: Signal-based cart state.
    *   `cart.routes.ts`: Lazy-loaded cart routes.
    *   `cart.component.ts`: Main cart container.
*   **Key Files to Modify:**
    *   `package.json`: Add linting and formatting scripts.
    *   `.eslintrc.json` & `.prettierrc`: Configuration files.
    *   `app.routes.ts`: Register the new Cart route.

### **3. Acceptance Criteria (Definition of Done)**
*   ✅ **Linting:** `npm run lint` executes successfully without errors.
*   ✅ **Formatting:** Prettier is integrated and enforces consistent style.
*   ✅ **Cart Skeleton:** The Cart page is accessible via `/cart` and uses the `MainLayout`.
*   ✅ **Design System:** The Cart UI consumes the `PageHeader` and `AppCard` primitives.
*   ✅ **State:** `CartService` successfully exposes a `computed` signal for the total cart count.

---

### **4. Role 2: AI Coding Assistant Prompt (Implementation Engineer)**
**Instructions:** Copy and paste the block below into a **new AI chat** dedicated to implementation.

> **"Act as an Implementation Engineer.** We are starting **Sprint 4** of the Enterprise E-Commerce Platform using **Angular 19** and a **FastAPI** backend. 
>
> **Task 1: Quality Gates Setup**
> 1. Configure **ESLint**, **Prettier**, and **Husky** in the Angular project.
> 2. Add `lint`, `format`, and `test:ci` scripts to `package.json`.
> 3. Ensure Husky runs linting on git pre-commit.
>
> **Task 2: Cart Module Foundation**
> 1. Create a new feature folder: `src/app/features/cart/`.
> 2. Implement a `CartService` using **Angular Signals** to manage an array of cart items. Include signals for `cartItems`, `totalPrice`, and `itemCount`.
> 3. Create a standalone `CartComponent` that consumes the **Enterprise Design System**. Use `<app-page-header>` and `<app-card>` for the cart items list.
> 4. Implement `cart.routes.ts` and lazy-load it in the main `app.routes.ts` file under the `MainLayout`.
>
> **Technical Requirements:**
> *   Maintain **OnPush Change Detection**.
> *   Use **Strong Typing** for Cart models (ID, Name, Price, Quantity).
> *   Follow the **Feature-based Routing** architecture established in the project.
> *   Ensure the UI remains responsive using the existing layout service.
>
> **Deliverables:** Provide the updated `package.json`, configuration files, and the new Cart module files (service, component, routes). Provide a simple unit test for the `CartService` to verify signal updates when an item is added."

---

### **5. Role 3: Next Action Items for You (QA)**
1.  **Execute the Prompt:** Paste the instructions above into your AI Coding Assistant.
2.  **Local Implementation:** Apply the code to a new branch `feature/cart-foundation`.
3.  **Verification:**
    *   Run `npm run lint` to confirm the new quality gates work.
    *   Navigate to `http://localhost:4200/cart` to verify the page loads within the enterprise shell.
    *   Check the console to ensure no routing errors exist.
4.  **Architectural Review:** Return here with the `git diff` or the new files for my **Principal Review** before you commit and move to the Cart UI logic.
