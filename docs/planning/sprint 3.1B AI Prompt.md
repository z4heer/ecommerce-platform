Act as a Senior Angular Architect, Enterprise UI/UX Specialist, Solution Architect, Technical Lead, Enterprise Software Engineer, and Code Reviewer.

We are continuing development of an Enterprise E-Commerce Platform.

=========================================================
CURRENT PROJECT STATUS
=========================================================

Backend
--------

Technology

- FastAPI
- PostgreSQL
- Redis
- JWT Authentication
- Repository Pattern
- Service Layer
- Docker

Completed

- Authentication APIs
- Product APIs
- Search APIs
- Category APIs
- Inventory APIs

Frontend
---------

Technology

- Angular 19
- Standalone Components
- Angular Material
- RxJS
- Functional Guards
- Functional Interceptors
- Reactive Forms
- Signals (where appropriate)

Completed Sprint 3.1A

✔ Core Infrastructure

✔ Authentication

✔ Login

✔ Register

✔ Logout

✔ JWT Authentication

✔ Auth Guard

✔ Admin Guard

✔ Storage Service

✔ Logger Service

✔ Loading Service

✔ Loading Interceptor

✔ Authentication Interceptor

✔ Error Interceptor

✔ Enterprise Folder Structure

✔ ProductService

✔ Backend Integration

Sprint 3.1A is complete.

DO NOT redesign completed infrastructure.

Reuse existing architecture.

=========================================================
SPRINT NAME
=========================================================

Sprint 3.1B

Enterprise UI Foundation & Product Experience

=========================================================
SPRINT OBJECTIVES
=========================================================

This sprint establishes the reusable Enterprise UI Foundation that all future modules will consume.

Modules such as

- Cart
- Orders
- Checkout
- Dashboard
- Admin
- Reports

must reuse the UI components created during this sprint.

No duplicated UI code.

=========================================================
PHASE 1
Enterprise Application Layout
=========================================================

Create

layout/

    main-layout/

    auth-layout/

MainLayoutComponent

Contains

- Material Toolbar
- Responsive Side Navigation
- Router Outlet
- Footer
- Breadcrumb

Toolbar

Left

- Company Logo
- Application Name

Center

- Global Search Placeholder

Right

- Notifications
- User Avatar
- User Menu

User Menu

- Profile
- Settings
- Logout

Responsive

Desktop

Permanent Side Navigation

Tablet

Collapsible Navigation

Mobile

Overlay Drawer

=========================================================
PHASE 2
Enterprise UI Design System
=========================================================

Create reusable UI components.

shared/ui/

    page-header/

    page-container/

    section-header/

    app-card/

    status-chip/

    search-toolbar/

    empty-state/

    error-state/

    loading-skeleton/

    confirmation-dialog/

    breadcrumb/

    page-actions/

    page-title/

    no-data/

Every component must be generic.

Future modules must consume these components.

=========================================================
PHASE 3
Enterprise Theme System
=========================================================

Create

core/theme/

    theme.service.ts

    theme.constants.ts

    material-theme.scss

    typography.scss

    spacing.scss

    colors.scss

    elevation.scss

    responsive.scss

Requirements

- Centralized color palette
- Typography scale
- Material Design tokens
- Consistent spacing
- Responsive breakpoints
- Elevation system
- Support future Dark Theme
- Theme switching architecture (Light only for now)
- No hardcoded colors in components
- No duplicated SCSS variables

Future-ready architecture for branding and white-label support.

=========================================================
PHASE 4
Enterprise Product Catalog
=========================================================

Redesign Product List.

Use Angular Material Cards.

Each card displays

- Product Image

- Product Name

- Category

- Price

- Stock Status

- Description

- View Details

Responsive

Desktop

4 Columns

Tablet

2 Columns

Mobile

1 Column

=========================================================
PHASE 5
Enterprise Search
=========================================================

Implement

Debounced Search

RxJS debounceTime

Search

- Product Name

- Category

Live Filtering

=========================================================
PHASE 6
Category Filter
=========================================================

Material Chips

or

Material Select

Reuse existing ProductService.

=========================================================
PHASE 7
Sorting
=========================================================

Implement

Sort By

- Name

- Price Low → High

- Price High → Low

- Category

=========================================================
PHASE 8
Pagination
=========================================================

Angular Material Paginator

Client-side Pagination

=========================================================
PHASE 9
Loading Experience
=========================================================

Keep Spinner.

Create reusable

Loading Skeleton Component.

Product Catalog must consume it.

=========================================================
PHASE 10
Reusable Empty State
=========================================================

Create reusable component.

Contains

- Icon

- Title

- Description

- Action Button

Product Catalog must use it.

Future modules must reuse it.

=========================================================
PHASE 11
Reusable Error State
=========================================================

Create reusable

Enterprise Error Component

Displays

Cloud Off Icon

Friendly Message

Retry Button

Home Button

Never display raw HttpErrorResponse.

=========================================================
PHASE 12
Product Details
=========================================================

Enterprise Detail Page

Material Layout

Large Product Image

Description

Category

Price

Stock

Metadata

Responsive

=========================================================
PHASE 13
Performance
=========================================================

Implement

OnPush

trackBy

Signals where beneficial

Lazy Loading

takeUntilDestroyed()

Avoid unnecessary subscriptions.

=========================================================
PHASE 14
Accessibility
=========================================================

ARIA Labels

Keyboard Navigation

Focus Management

Semantic HTML

Accessible Material Components

=========================================================
PHASE 15
Responsive Design
=========================================================

Desktop

Tablet

Mobile

CSS Grid

Flexbox

=========================================================
PHASE 16
Production Quality
=========================================================

Apply

SOLID

DRY

KISS

Single Responsibility

Reusable Components

Constants

Configuration Driven Design

No magic strings

No duplicated code

No code smells

=========================================================
TESTING
=========================================================

Provide

Unit Tests

Integration Tests

Manual Test Cases

Regression Test Cases

Accessibility Checklist

Responsive Testing Checklist

=========================================================
IMPLEMENTATION STRATEGY
=========================================================

Implement one phase at a time.

For every phase provide

1.

Architecture Review

2.

Folder Structure

3.

Files to Create

4.

Files to Modify

5.

Complete Production-Ready Code

No pseudo code.

No partial snippets.

6.

Design Decisions

Explain every architectural decision.

7.

Testing Steps

8.

Git Commit

Wait for confirmation before moving to the next phase.

=========================================================
DO NOT MODIFY
=========================================================

Authentication

Storage Service

Logger Service

Interceptors

Guards

ProductService

Infrastructure

Reuse existing implementation.

=========================================================
FINAL GOAL
=========================================================

At the completion of Sprint 3.1B, the application should resemble a production-grade enterprise Angular application with a reusable UI framework, centralized theme system, reusable design system, and a polished Product Catalog that will serve as the foundation for all future business modules.