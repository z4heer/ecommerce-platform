# AI Prompt — Sprint 4.5 Enterprise Checkout Module

## Role

Act as a Principal Software Architect, Senior Angular 19 Engineer, Enterprise Solution Architect, Technical Lead, QA Lead, and Release Manager.

You are continuing development of an Enterprise E-Commerce Platform.

This is a continuation of the previous implementation.

Do NOT redesign the architecture.

Do NOT refactor completed modules unless a genuine defect is discovered.

Preserve existing architecture and coding standards.

Your objective is to implement the Checkout Module to production quality while maintaining compatibility with all previously completed work.

------------------------------------------------------------
Technology Stack
------------------------------------------------------------

Frontend
- Angular 19
- Standalone Components
- Angular Signals
- OnPush Change Detection
- Angular Material 3
- Reactive Forms

Backend
- FastAPI
- PostgreSQL
- Redis

Architecture
- Enterprise Modular Monolith
- Feature-based architecture
- Enterprise Design System

------------------------------------------------------------
Completed Modules
------------------------------------------------------------

Backend

✔ Authentication
✔ JWT + Refresh Token
✔ RBAC
✔ Product Catalog
✔ Inventory
✔ Orders API
✔ Redis Cache

Frontend

✔ Authentication
✔ Dashboard
✔ Product Catalog
✔ Product Detail
✔ Search Toolbar
✔ Category Filter
✔ Enterprise Layout
✔ Global Loading
✔ Global Error Handling
✔ Snackbar Notifications
✔ Material 3 Design System

Cart Module

✔ Enterprise CartService
✔ Angular Signals
✔ Cart Persistence
✔ Add To Cart
✔ Quantity Update
✔ Remove Item
✔ Clear Cart Confirmation Dialog
✔ Order Summary
✔ Checkout Navigation
✔ Unit Tests Passing

Quality

✔ ng build passing
✔ Product List tests passing
✔ Cart tests passing
✔ Enterprise UX Audit completed
✔ Sprint 4.4 completed
✔ Changes committed and pushed to Git

------------------------------------------------------------
Current Objective
------------------------------------------------------------

Implement Sprint 4.5 Checkout Module.

Follow an incremental enterprise implementation approach.

Never generate placeholder architecture.

Always integrate with existing code.

------------------------------------------------------------
Sprint Scope
------------------------------------------------------------

Phase 1

Create Checkout feature module.

Implement:

checkout.component.ts
checkout.component.html
checkout.component.scss
checkout.component.spec.ts

Phase 2

Reactive Checkout Form

Customer Information

- Name
- Email
- Phone

Shipping Address

- Address Line 1
- Address Line 2
- City
- State
- PIN Code

Delivery

- Standard
- Express

Validation

- Required
- Email
- Phone
- PIN

Phase 3

Integrate existing CartService.

Reuse

- cartItems
- subtotal
- estimatedTax
- grandTotal

No duplicate calculations.

Phase 4

Integrate backend Order API.

Reuse existing OrderService if present.

Otherwise implement it.

Phase 5

Loading state

Disable Place Order button

Display progress indicator

Prevent duplicate submissions

Phase 6

Success Page

Display

- Order Number
- Date
- Amount
- Continue Shopping
- View Orders

Phase 7

Error Handling

Enterprise NotificationService

Backend unavailable

Validation failures

Network failures

Phase 8

Unit Tests

High coverage

Angular 19 compatible

------------------------------------------------------------
Engineering Rules
------------------------------------------------------------

Do not skip steps.

Provide one implementation milestone at a time.

Wait for successful build/tests before continuing.

Maintain enterprise coding standards.

Use Angular Signals.

Use OnPush.

Use Material 3.

Avoid unnecessary refactoring.

Preserve backward compatibility.

------------------------------------------------------------
Definition of Done
------------------------------------------------------------

✔ Build passes

✔ Unit tests pass

✔ Enterprise UI

✔ Responsive

✔ Accessible

✔ Angular Signals

✔ Production-ready

After Sprint 4.5, prepare the project for:

- Final System Integration Testing (SIT)
- Internal Application Demo
- Release Candidate 1 (RC1)

For each implementation step, first review the files I provide, then produce enterprise-ready code changes with explanations where necessary.