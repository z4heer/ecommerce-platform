Below is a **production-ready AI prompt** for the next task in Sprint 3.1B. It is designed for another AI coding assistant or a junior developer and follows the same enterprise workflow you've established. It is intentionally scoped to **one task only**: **EmptyStateComponent**.

---

# AI Prompt – Sprint 3.1B Milestone 2

## Task: Implement Enterprise EmptyStateComponent

You are acting as my:

* Principal Software Architect
* Enterprise Solution Architect
* Senior Angular 19 Engineer
* Angular Material Expert
* UI/UX Architect
* Accessibility Specialist
* Enterprise Code Reviewer
* Performance Engineer
* Technical Lead

We are building a **production-grade Enterprise E-Commerce Platform**.

This is **NOT** a tutorial, sample project, proof-of-concept, or learning exercise.

All code must be suitable for enterprise production environments.

Implement **only** the `EmptyStateComponent`.

Do **not** modify unrelated components.

Stop immediately after completing this task.

---

# Project Context

## Backend

* FastAPI
* PostgreSQL
* Redis
* SQLAlchemy
* JWT Authentication
* Repository Pattern
* Service Layer
* Docker
* Alembic

## Frontend

* Angular 19
* Standalone Components
* Angular Material (Material 3)
* Angular Signals
* Functional Guards
* Functional Interceptors
* Reactive Forms
* RxJS
* OnPush Change Detection
* Enterprise Folder Structure

---

# Existing Enterprise Design System

Completed

* PageContainer
* PageHeader
* AppCard
* StatusChip
* SearchToolbar
* SectionHeader
* LoadingSkeleton

Current Task

**EmptyStateComponent**

---

# Objective

Develop a reusable enterprise **Empty State** component that provides a consistent user experience whenever a page, section, list, table, or dashboard has no data to display.

The component must remain:

* Presentation-only
* Generic
* Strongly typed
* Reusable
* Theme-aware
* Responsive
* Accessible
* Enterprise-ready

The component must **not** contain business logic.

---

# Intended Usage

This component will be reused throughout:

* Product Catalog
* Product Search
* Orders
* Customers
* Inventory
* Dashboard Widgets
* Reports
* Analytics
* Notifications
* Administration
* Settings

Feature modules must not create their own empty-state layouts.

---

# Architecture Principles

Follow:

* Clean Architecture
* SOLID
* DRY
* KISS
* Separation of Concerns
* Composition over Inheritance
* Angular Style Guide
* Enterprise Design System Standards

---

# Folder Structure

Create

```text
src/app/shared/components/empty-state/

    empty-state.component.ts
    empty-state.component.html
    empty-state.component.scss
    empty-state.component.spec.ts
    empty-actions.directive.ts
    index.ts
```

Update shared barrel exports if applicable.

---

# Angular Requirements

Use

* Standalone Component
* Angular Signals
* input()
* input.required()
* computed()
* contentChild()
* ChangeDetectionStrategy.OnPush

Do NOT use

* NgModule
* any
* inline templates
* inline styles
* subscriptions
* feature services
* business logic
* deprecated Angular APIs

---

# Component Selector

```html
<app-empty-state></app-empty-state>
```

---

# Public API

Implement strongly typed Angular 19 inputs.

```typescript
readonly title = input.required<string>();

readonly description = input<string>();

readonly icon = input<string>();

readonly illustration = input<string>();

readonly size = input<
'small'
| 'medium'
| 'large'
>('medium');

readonly centered = input(true);

readonly ariaLabel = input<string>();
```

---

# Content Projection

Support one named slot.

```html
<div empty-actions></div>
```

Example

```html
<app-empty-state
    title="No Products Found"
    description="Create your first product to get started."
    icon="inventory_2">

    <div empty-actions>

        <button mat-flat-button color="primary">

            Add Product

        </button>

    </div>

</app-empty-state>
```

The component must never assume which actions are projected.

---

# Rendering Rules

Support:

## Icon Mode

Render Material icon when `icon` is provided.

---

## Illustration Mode

Render illustration image when `illustration` is provided.

Illustration takes precedence over icon.

---

## Text

Always support

* title
* optional description

---

## Actions

Render projected actions only when content exists.

Do not render empty wrapper elements.

---

# Layout

Recommended structure

```text
-----------------------------------------

Illustration OR Icon

Title

Description

Projected Actions

-----------------------------------------
```

Support

* centered layout
* left aligned layout

---

# Accessibility

Comply with **WCAG 2.1 AA**.

Support

* semantic HTML
* aria-label
* role="status"
* screen readers
* high contrast mode
* keyboard accessibility for projected actions

The EmptyState itself should **not** receive keyboard focus.

---

# Responsive Requirements

Support

Desktop

Laptop

Tablet

Mobile Portrait

Mobile Landscape

Large illustrations must scale gracefully.

No overflow.

---

# Theme Requirements

Support

* Angular Material Design Tokens
* Light Theme
* Dark Theme

Do not hardcode

* colors
* typography
* spacing

---

# Styling Requirements

Support

* small
* medium
* large
* centered
* responsive
* illustration mode
* icon mode
* theme compatibility

Organize SCSS into logical sections.

---

# Performance Requirements

Use

* OnPush
* Signals
* Minimal DOM
* No unnecessary wrappers
* No unnecessary computed signals

Avoid

* unnecessary change detection
* subscriptions
* timers

---

# Type Safety

Use strict typing.

No `any`.

No unsafe casting.

---

# Unit Tests

Target

95%+ coverage.

Include tests for

* component creation
* required title
* description rendering
* icon rendering
* illustration rendering
* projected actions
* centered mode
* left aligned mode
* size variants
* aria-label
* accessibility attributes
* computed CSS classes

---

# Integration Tests

Verify integration with

* AppCard
* PageContainer
* SectionHeader

Ensure layout consistency.

---

# Manual Testing Checklist

Verify

* Desktop
* Laptop
* Tablet
* Mobile Portrait
* Mobile Landscape
* Long title
* Long description
* Icon mode
* Illustration mode
* Actions projection
* No actions
* Small
* Medium
* Large
* Centered
* Left aligned
* Dark theme
* Light theme
* Screen reader compatibility

---

# Code Quality

Ensure

* No TypeScript errors
* No lint warnings
* No console errors
* No runtime errors
* No unused imports
* No dead code
* Strict typing
* Consistent formatting

---

# Deliverables

Provide

1. Architecture Review
2. Design Decisions
3. Folder Structure
4. Files to Create
5. Files to Modify
6. Complete Production-Ready Source Code
7. Unit Tests
8. Integration Tests
9. Manual Testing Checklist
10. Accessibility Review
11. Performance Review
12. Technical Lead Code Review
13. Git Commit Message
14. ADR Update Recommendation
15. Sprint Report Update

---

# Constraints

Do **NOT**

* modify existing Design System components
* implement ErrorState
* implement ConfirmationDialog
* add feature-specific business logic
* introduce breaking API changes
* perform speculative refactoring
* modify unrelated modules

---

# Acceptance Criteria

Implementation is complete only if:

* Angular application builds successfully.
* No TypeScript errors.
* No lint warnings.
* Unit tests pass.
* 95%+ test coverage achieved.
* Accessibility requirements satisfied.
* Responsive behavior verified.
* Theme compatibility verified.
* Angular 19 Signals used correctly.
* OnPush Change Detection enabled.
* Component is presentation-only.
* Component is reusable across all feature modules.
* Production-ready quality achieved.
* No technical debt introduced.

---

# Technical Lead Self-Review

Before completing the task, perform a final review covering:

* Architecture Review
* Code Quality Review
* Accessibility Review
* Performance Review
* Enterprise Readiness Assessment

Document any recommendations or future enhancements that are **non-blocking**.

---

# Git Commit

```bash
git add .

git commit -m "feat(ui): add reusable enterprise EmptyState component"
```

---

# ADR Recommendation

Create:

**ADR-012 – Enterprise Empty State Strategy**

Document:

* Context
* Problem Statement
* Decision
* Empty State vs Error State
* Component Responsibilities
* Accessibility Strategy
* Theme Integration
* Responsive Design
* Future Extensibility

---

# Sprint Report Update

**Sprint 3.1B – Milestone 2**

Task: Enterprise EmptyStateComponent

Include:

* Enterprise EmptyState component completed
* Standardized empty-state user experience established
* Responsive layout verified
* Accessibility compliance achieved
* Theme compatibility verified
* Ready for integration across Products, Orders, Customers, Inventory, Dashboard, Reports, Administration, and future modules

---

# Stop Condition

After completing **EmptyStateComponent**:

* Stop immediately.
* Do **not** implement `ErrorStateComponent`.
* Wait for **Technical Lead architecture review and approval** before proceeding to the next task.
