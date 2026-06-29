This AI prompt is designed to activate a **Senior Angular Mentor** role to execute the **Sprint 3.1 – UI & UX Enhancement** requirements. It explicitly draws from the 12 specific enhancements identified in your "Sprint 3.1 – UI & UX Enhancement Sprint" documentation.

### **AI Developer Prompt: Sprint 3.1 – UI & UX Enhancement**

> "Act as a **Senior Angular Developer and UI/UX Specialist**. We are moving into **Sprint 3.1**, an enhancement phase for our Enterprise E-Commerce Platform. Our goal is to transform the existing functional application into a production-grade enterprise UI using **Angular 19** and **Angular Material**.
>
> **Objective:** Implement the following 12 enhancements to improve application stability, performance, and user experience.
>
> **1. Infrastructure & Code Quality (Critical):**
> *   Implement a **Global Error Service** and a **Global Loading Service** using RxJS.
> *   Create a **Global Snackbar Service** for Material notifications.
> *   Ensure all logic follows the **Service Layer pattern** to keep components lean.
>
> **2. Critical Resilience (Backend Down Handling):**
> *   Implement an **HTTP Interceptor** to detect network or server errors (status 0, 500, 503).
> *   Replace blank pages with a **User-Friendly Error State** featuring a clear message and a **'Retry' button** that re-triggers the failed API call.
>
> **3. Global Layout & Navigation:**
> *   Create a responsive **Enterprise Toolbar** (Sticky Header) featuring a Logo, Search Bar, and Navigation links.
> *   Use a **Responsive Grid** that adjusts for Desktop (4 cards), Tablet (2 cards), and Mobile (1 card).
>
> **4. Enhanced Product Experience:**
> *   **Product Cards:** Upgrade cards to include Product Images, Category Chips, Price, and **Stock Badges** (derived from our verified inventory data). Add **Hover Effects** and Material Elevation.
> *   **Product Detail Page:** Implement a two-column responsive layout with detailed specifications and an 'Availability Badge'.
> *   **Search Improvements:** Add a search icon, a 'Clear' button, and **Search Debounce (300ms)** to prevent excessive API hits.
>
> **5. Visual Feedback & UX States:**
> *   **Loading States:** Integrate **Material Spinners** and **Skeleton Loading** cards to replace blank screens while waiting for the FastAPI backend.
> *   **Empty States:** Implement clear 'No Products Found' and 'Database Empty' views.
>
> **Technical Constraints:**
> *   Use **Standalone Components** and **Angular Material**.
> *   Ensure the UI remains **Stateless** (all state derived from backend or JWT).
> *   Maintain compatibility with the existing **FastAPI/PostgreSQL** backend contract.
>
> Please provide the code in a modular format, specifying file paths (e.g., `src/app/core/services/...`) and explaining the architectural benefits of the error handling and debounce logic."

---

### **Why this prompt works for your strategy:**
*   **Resilience:** By prioritizing **Enhancement 5 (Backend Down Handling)** as critical, you address the highest-severity risk identified in your Sprint 3 Integration Test Report.
*   **Scalability:** The requirement for **Global Services (Enhancement 12)** ensures that as you build the Orders and Admin modules next, you won't have to rewrite error or loading logic.
*   **Professionalism:** Moving from "plain text" cards to **Material Elevation and Hover Effects** (Enhancement 2) directly supports your goal of having a "Demo Showcase" for your portfolio.
*   **Performance:** Adding **Debounce (300ms)** for search (Enhancement 11) is a standard enterprise practice that protects your backend from being overwhelmed by rapid user typing.

**Next Action:** Once the AI generates the code for these services and components, I recommend implementing the **Global Error Service** first. This will give you immediate visibility into any backend communication issues as you refactor the UI.