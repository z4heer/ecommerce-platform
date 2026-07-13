# Sprint 3.1B – Milestone 2

# Enterprise Design System

## Goal

Build a reusable UI framework that every business module will consume.

This is the last major "foundation" milestone before feature work.

---

# What We Will Build

```
Enterprise Design System

↓

Page Container

↓

Page Header

↓

Page Actions

↓

Section Header

↓

App Card

↓

Status Chip

↓

Search Toolbar

↓

Loading Skeleton

↓

Empty State

↓

Error State

↓

Confirmation Dialog
```

---

# Reuse Matrix

| Component          | Products | Orders | Cart | Dashboard | Admin | Reports |
| ------------------ | :------: | :----: | :--: | :-------: | :---: | :-----: |
| PageContainer      |     ✅    |    ✅   |   ✅  |     ✅     |   ✅   |    ✅    |
| PageHeader         |     ✅    |    ✅   |   ✅  |     ✅     |   ✅   |    ✅    |
| AppCard            |     ✅    |    ✅   |   ✅  |     ✅     |   ✅   |    ✅    |
| StatusChip         |     ✅    |    ✅   |   ❌  |     ✅     |   ✅   |    ✅    |
| SearchToolbar      |     ✅    |    ✅   |   ❌  |     ✅     |   ✅   |    ✅    |
| LoadingSkeleton    |     ✅    |    ✅   |   ✅  |     ✅     |   ✅   |    ✅    |
| EmptyState         |     ✅    |    ✅   |   ✅  |     ✅     |   ✅   |    ✅    |
| ErrorState         |     ✅    |    ✅   |   ✅  |     ✅     |   ✅   |    ✅    |
| ConfirmationDialog |     ✅    |    ✅   |   ✅  |     ✅     |   ✅   |    ✅    |

---

# Implementation Order

We'll implement from the most reusable components to the most specialized.

## Task 1 (Next)

### PageContainerComponent

This becomes the wrapper for every page.

Example:

```
Dashboard

↓

PageContainer

↓

PageHeader

↓

Content
```

Products:

```
PageContainer

↓

PageHeader

↓

SearchToolbar

↓

Product Grid
```

Orders:

```
PageContainer

↓

PageHeader

↓

SearchToolbar

↓

Order Table
```

---

## Task 2

PageHeader

Contains:

* Page title
* Subtitle
* Breadcrumb slot (future)
* Actions slot

Reusable everywhere.

---

## Task 3

PageActions

Reusable buttons.

Examples:

```
Add Product

Export

Refresh

Filter
```

---

## Task 4

SectionHeader

```
Products

Inventory

Statistics
```

Used inside pages.

---

## Task 5

AppCard

One of the biggest components.

Later becomes:

```
Product Card

Order Card

Customer Card

Report Card

Dashboard Card
```

---

## Task 6

StatusChip

```
Available

Low Stock

Out of Stock

Pending

Completed

Cancelled
```

One component.

Many uses.

---

## Task 7

SearchToolbar

Contains

```
Search

Category

Sort

Refresh

Filter
```

Later reused everywhere.

---

## Task 8

LoadingSkeleton

This replaces the spinner.

Much better UX.

---

## Task 9

EmptyState

```
No Products

No Orders

No Customers
```

Reusable.

---

## Task 10

ErrorState

One component.

Used for

* Backend Down
* Network Error
* API Failure

Includes:

* Retry
* Home

---

## Task 11

ConfirmationDialog

Used by

Delete

Cancel Order

Logout

Reset

---

# Folder Structure

```
shared/

ui/

    page-container/

    page-header/

    page-actions/

    section-header/

    app-card/

    status-chip/

    search-toolbar/

    loading-skeleton/

    empty-state/

    error-state/

    confirmation-dialog/
```

---

# Development Standards

Every component must be:

* Standalone
* OnPush
* Strongly typed
* Reusable
* No business logic
* Theme-ready
* Responsive
* Accessible
* Unit tested

---

# Technical Lead Workflow

Every component will follow this sequence:

```
Architecture Review

↓

Folder Structure

↓

Files

↓

Production Code

↓

Compile

↓

PR Review

↓

Testing

↓

Git Commit

↓

ADR Update

↓

Sprint Report
```

No shortcuts.

---

# Branch Strategy

Create a new feature branch from `develop`:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/design-system
```

---

# First Commit Target

The first milestone commit will be:

```bash
git commit -m "feat(ui): add enterprise page container component"
```

---

# Deliverables for the Next Session

We'll start with **Task 1 – PageContainerComponent**.

I'll provide:

1. Architecture review.
2. Design rationale.
3. Folder structure.
4. Files to create.
5. Complete production-ready Angular 19 code.
6. Unit tests.
7. Accessibility checklist.
8. Performance review.
9. Git commit.
10. ADR-005 (Enterprise Design System Foundation).

---

## Technical Lead Decision

I'm making one additional architectural decision before we begin Milestone 2.

Instead of placing design system components directly under `shared/ui`, we'll organize them into categories as the library grows:

```text
shared/
└── ui/
    ├── layout/
    │   ├── page-container/
    │   ├── page-header/
    │   ├── page-actions/
    │   └── section-header/
    ├── feedback/
    │   ├── loading-skeleton/
    │   ├── empty-state/
    │   ├── error-state/
    │   └── confirmation-dialog/
    ├── data-display/
    │   ├── app-card/
    │   └── status-chip/
    └── navigation/
        └── search-toolbar/
```

