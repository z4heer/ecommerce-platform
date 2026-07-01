Below is a **production-ready AI prompt** designed for another AI coding assistant or junior developer. It follows the same enterprise workflow you've established throughout Sprint 3.1B and is focused **only on implementing the `ConfirmationDialogComponent`**.

---

# AI Prompt – Sprint 3.1B Milestone 2

## Task: Implement Enterprise ConfirmationDialogComponent

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

Implement **only** the `ConfirmationDialogComponent`.

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
* ErrorState

Current Task

**ConfirmationDialogComponent**

This is the **final shared component** of Sprint 3.1B.

---

# Objective

Develop a reusable enterprise **Confirmation Dialog** that standardizes confirmation workflows across the application.

The component must remain:

* Presentation-only
* Generic
* Strongly typed
* Reusable
* Theme-aware
* Responsive
* Accessible
* Enterprise-ready

The dialog must **not** execute business logic.

It should only collect user intent and return the result to the calling feature.

---

# Intended Usage

This dialog will be reused for:

* Delete Product
* Delete Customer
* Delete Order
* Cancel Order
* Archive Records
* Logout
* Reset Filters
* Clear Cart
* Publish Changes
* Bulk Operations
* Administrative Actions

Feature modules must never build their own confirmation dialogs.

---

# Architecture Principles

Follow

* Clean Architecture
* SOLID
* DRY
* KISS
* Separation of Concerns
* Angular Style Guide
* Enterprise Design System Standards

The dialog must never know what operation is being confirmed.

---

# Folder Structure

Create

```text
src/app/shared/components/confirmation-dialog/

    confirmation-dialog.component.ts
    confirmation-dialog.component.html
    confirmation-dialog.component.scss
    confirmation-dialog.component.spec.ts
    confirmation-dialog.models.ts
    confirmation-dialog.tokens.ts
    index.ts
```

Update shared barrel exports if applicable.

---

# Angular Requirements

Use

* Standalone Component
* Angular Signals
* input.required()
* input()
* computed()
* output() (only if necessary)
* ChangeDetectionStrategy.OnPush
* Angular Material Dialog
* Angular Material Button
* Angular Material Icon

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

# Material Dialog Integration

Use

* `MatDialog`
* `MatDialogRef`
* `MAT_DIALOG_DATA`

The dialog should be usable as follows:

```typescript
this.dialog.open(ConfirmationDialogComponent, {
  data: {
    title: 'Delete Product',
    message: 'Are you sure you want to delete this product?',
    severity: 'danger'
  }
});
```

---

# Public Dialog Data Model

Create

```typescript
export interface ConfirmationDialogData {

  title: string;

  message: string;

  severity?:
    | 'default'
    | 'info'
    | 'warning'
    | 'danger';

  confirmLabel?: string;

  cancelLabel?: string;

  icon?: string;

  disableClose?: boolean;
}
```

---

# Dialog Result

The dialog returns

```typescript
boolean
```

Example

```typescript
true

false
```

Do not return domain objects.

---

# Public Inputs

If the dialog also supports standalone rendering outside MatDialog, expose:

```typescript
readonly title = input.required<string>();

readonly message = input.required<string>();

readonly severity = input<
'default'
| 'info'
| 'warning'
| 'danger'
>('default');

readonly confirmLabel = input('Confirm');

readonly cancelLabel = input('Cancel');

readonly icon = input<string>();

readonly disableClose = input(false);

readonly ariaLabel = input<string>();
```

---

# Rendering Rules

Support

## Icon

Render only when supplied.

If omitted

Render a severity-specific default icon.

Suggested defaults

```text
default → help

info → info

warning → warning

danger → delete_forever
```

---

## Severity

Support

```text
default

info

warning

danger
```

Use Material Design Tokens.

Avoid hardcoded colors.

---

## Buttons

Always render

* Cancel
* Confirm

Labels configurable.

Order

```text
Cancel

Confirm
```

---

# Optional Content Projection

Support

```html
<div dialog-content></div>
```

Use this for

* Additional warnings
* Lists
* Metadata
* Notes

Do not render wrapper when unused.

---

# Accessibility

Comply with WCAG 2.1 AA.

Support

* role="alertdialog"
* aria-labelledby
* aria-describedby
* aria-label
* keyboard navigation
* Escape key (unless disableClose=true)
* Focus Trap
* Auto focus
* Restore focus
* Screen readers
* High contrast

Projected buttons must preserve keyboard order.

---

# Responsive Requirements

Support

Desktop

Laptop

Tablet

Mobile Portrait

Mobile Landscape

Dialog width should adapt naturally.

No overflow.

---

# Theme Requirements

Support

* Angular Material Design Tokens
* Material 3
* Light Theme
* Dark Theme
* High Contrast

Avoid hardcoded

* colors
* typography
* spacing

---

# Styling Requirements

Support

* severity variants
* icon
* projected content
* responsive layout
* Material spacing
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
* effects unless required
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
* title rendering
* message rendering
* default labels
* custom labels
* severity variants
* default icons
* custom icon
* confirm result
* cancel result
* Escape key
* disableClose behavior
* projected content
* accessibility attributes
* dialog close behavior

---

# Integration Tests

Verify compatibility with

* AppCard
* EmptyState
* ErrorState
* Product Delete Flow
* Logout Flow

Ensure dialog integration behaves correctly.

---

# Manual Testing Checklist

Verify

* Desktop
* Laptop
* Tablet
* Mobile Portrait
* Mobile Landscape
* Default severity
* Info severity
* Warning severity
* Danger severity
* Default icon
* Custom icon
* Confirm
* Cancel
* Escape
* disableClose
* Focus trap
* Screen reader
* High contrast
* Dark theme
* Light theme

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
14. ADR-014 Update
15. Sprint Report Update

---

# Constraints

Do **NOT**

* modify existing Design System components
* inject business services
* perform API calls
* implement delete logic
* implement logout logic
* implement retry logic
* add feature-specific behavior
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
* Material Dialog integration verified.
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

git commit -m "feat(ui): add reusable enterprise ConfirmationDialog component"
```

---

# ADR Recommendation

Create:

**ADR-014 – Enterprise Confirmation Dialog Strategy**

Document:

* Context
* Problem Statement
* Decision
* Dialog Standardization
* Severity Model
* Accessibility Strategy
* Material Dialog Integration
* Theme Integration
* Future Extensibility

---

# Sprint Report Update

**Sprint 3.1B – Milestone 2**

Task: Enterprise ConfirmationDialogComponent

Include:

* Enterprise ConfirmationDialog completed
* Standardized confirmation workflow established
* Material Dialog integration verified
* Accessibility compliance achieved
* Theme compatibility verified
* Ready for integration across Products, Orders, Customers, Inventory, Dashboard, Reports, Administration, and future modules

---

# Stop Condition

After completing **ConfirmationDialogComponent**:

* Stop immediately.
* Do **not** begin Sprint 3.2 or implement any additional components or features.
* Perform a final self-review of Sprint 3.1B deliverables.
* Wait for **Technical Lead architecture review and formal sprint sign-off** before proceeding to the next sprint.
