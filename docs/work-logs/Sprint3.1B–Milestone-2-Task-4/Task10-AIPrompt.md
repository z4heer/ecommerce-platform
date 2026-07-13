Below is a **production-ready AI prompt** designed for another AI coding assistant or junior developer. It follows the same enterprise workflow you've established throughout Sprint 3.1B and is focused **only on implementing the `ErrorStateComponent`**.

---

# AI Prompt – Sprint 3.1B Milestone 2

## Task: Implement Enterprise ErrorStateComponent

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

This is **NOT** a tutorial, proof-of-concept, sample project, or learning exercise.

All code must be suitable for enterprise production environments.

Implement **only** the `ErrorStateComponent`.

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
* EmptyState

Current Task

**ErrorStateComponent**

---

# Objective

Develop a reusable enterprise **Error State** component that provides a consistent user experience whenever an application error, API failure, authorization issue, or unexpected system condition occurs.

This component must remain:

* Presentation-only
* Generic
* Strongly typed
* Reusable
* Theme-aware
* Responsive
* Accessible
* Enterprise-ready

It must **not** contain business logic or invoke retry operations directly.

---

# Intended Usage

This component will be reused throughout:

* Product Catalog
* Orders
* Customers
* Inventory
* Dashboard Widgets
* Reports
* Analytics
* Authentication
* Administration
* Settings

Feature modules must not implement their own error-state layouts.

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

# Error vs Empty State

Maintain a strict architectural distinction.

### EmptyState

* No data exists
* Successful request
* Informational
* User guidance

### ErrorState

* API failure
* Network failure
* Authentication failure
* Authorization failure
* Server unavailable
* Timeout
* Unexpected application error

Never merge these responsibilities.

---

# Folder Structure

Create

```text
src/app/shared/components/error-state/

    error-state.component.ts
    error-state.component.html
    error-state.component.scss
    error-state.component.spec.ts
    error-primary-action.directive.ts
    error-secondary-action.directive.ts
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
<app-error-state></app-error-state>
```

---

# Public API

Implement strongly typed Angular 19 inputs.

```typescript
readonly title = input.required<string>();

readonly description = input<string>();

readonly errorCode = input<string>();

readonly icon = input<string>();

readonly illustration = input<string>();

readonly severity = input<
'warning'
| 'error'
| 'critical'
>('error');

readonly centered = input(true);

readonly ariaLabel = input<string>();
```

---

# Content Projection

Support two named projection slots.

Primary Action

```html
<div error-primary-action></div>
```

Secondary Action

```html
<div error-secondary-action></div>
```

Example

```html
<app-error-state
    title="Unable to load products"
    description="Please try again in a few moments."
    errorCode="HTTP 503"
    severity="error">

    <button
        error-primary-action
        mat-flat-button
        color="primary">

        Retry

    </button>

    <button
        error-secondary-action
        mat-button>

        Contact Support

    </button>

</app-error-state>
```

The component must never implement retry logic itself.

---

# Rendering Rules

Support

## Illustration Mode

If illustration exists

Render illustration only.

Do not render icon.

---

## Icon Mode

Render Material icon only when illustration is absent.

---

## Error Code

Render only when supplied.

Typical examples

```
HTTP 404

HTTP 500

HTTP 503

NETWORK_TIMEOUT

AUTH_EXPIRED
```

---

## Severity

Support

```
warning

error

critical
```

Use Material Design tokens.

Avoid hardcoded colors.

---

## Actions

Render projected actions only when content exists.

Never render empty wrappers.

---

# Layout

Recommended

```text
-------------------------------------

Illustration / Icon

Title

Description

Error Code

Primary Action

Secondary Action

-------------------------------------
```

Support

* centered
* left aligned

---

# Accessibility

Comply with WCAG 2.1 AA.

Support

* semantic HTML
* role="alert"
* aria-live="assertive"
* aria-label
* screen readers
* high contrast
* projected button accessibility

The component itself must not receive keyboard focus.

Projected buttons must maintain natural focus order.

---

# Responsive Requirements

Support

* Desktop
* Laptop
* Tablet
* Mobile Portrait
* Mobile Landscape

Illustrations and content must scale appropriately.

No overflow.

---

# Theme Requirements

Support

* Angular Material Design Tokens
* Material 3
* Light Theme
* Dark Theme
* High Contrast

Do not hardcode

* colors
* typography
* spacing

---

# Styling Requirements

Support

* severity variants
* small screens
* centered layout
* left aligned layout
* icon mode
* illustration mode
* responsive spacing
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

* subscriptions
* timers
* change detector injection
* business logic

---

# Type Safety

Use strict typing.

No `any`.

No unsafe casting.

---

# Unit Tests

Target

**95%+ coverage**

Include tests for

* component creation
* required title
* description rendering
* error code rendering
* icon rendering
* illustration precedence
* severity variants
* centered mode
* left aligned mode
* projected primary action
* projected secondary action
* aria-label
* accessibility attributes
* computed CSS classes

---

# Integration Tests

Verify compatibility with

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
* Error code
* Warning severity
* Error severity
* Critical severity
* Primary action
* Secondary action
* No actions
* Centered
* Left aligned
* Dark theme
* Light theme
* High contrast
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

Provide:

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
14. ADR-013 Update
15. Sprint Report Update

---

# Constraints

Do **NOT**

* modify existing Design System components
* implement ConfirmationDialog
* implement retry logic
* perform HTTP calls
* inject services
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

Document any **non-blocking** recommendations for future enhancements.

---

# Git Commit

```bash
git add .

git commit -m "feat(ui): add reusable enterprise ErrorState component"
```

---

# ADR Recommendation

Create:

**ADR-013 – Enterprise Error Presentation Strategy**

Document:

* Context
* Problem Statement
* Decision
* Error State vs Empty State
* Severity Model
* Accessibility Strategy
* Theme Integration
* Responsive Design
* Future Extensibility

---

# Sprint Report Update

**Sprint 3.1B – Milestone 2**

Task: Enterprise ErrorStateComponent

Include:

* Enterprise ErrorState component completed
* Standardized error presentation established
* Severity-based visual model implemented
* Responsive layout verified
* Accessibility compliance achieved
* Theme compatibility verified
* Ready for integration across Products, Orders, Customers, Inventory, Dashboard, Reports, Authentication, Administration, and future modules

---

# Stop Condition

After completing **ErrorStateComponent**:

* Stop immediately.
* Do **not** implement `ConfirmationDialogComponent`.
* Wait for **Technical Lead architecture review and approval** before proceeding to the final Design System component.