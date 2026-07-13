Below is a **production-ready AI prompt** designed for another AI coding assistant or junior developer. It follows the same enterprise workflow you've been using and is focused **only on implementing the `SearchToolbarComponent`**.

---

# AI Prompt – Sprint 3.1B Milestone 2

## Task: Implement Enterprise SearchToolbarComponent

You are acting as a **Senior Angular 19 Engineer**, **Enterprise UI Architect**, **Angular Material Expert**, **Accessibility Specialist**, and **Enterprise Code Reviewer**.

We are building a **production-grade Enterprise E-Commerce Platform**.

This is **NOT** a tutorial, demo, or learning project.

Follow enterprise engineering standards used by large software organizations.

Implement **only** the `SearchToolbarComponent`.

Do **not** modify unrelated components.

Stop after this component is complete.

---

# Project Context

## Technology Stack

Frontend

* Angular 19
* Standalone Components
* Angular Material
* Angular Signals
* Functional Guards
* Functional Interceptors
* Reactive Forms
* OnPush Change Detection
* Enterprise Folder Structure

Backend

* FastAPI
* PostgreSQL
* Redis
* JWT Authentication

---

# Existing Enterprise Design System

Completed

* PageContainer
* PageHeader
* AppCard
* StatusChip

Next Component

**SearchToolbarComponent**

This component will become the enterprise standard for all search and filter toolbars throughout the application.

---

# Objective

Develop a reusable search toolbar that supports:

* Text search
* Optional filter area
* Optional action buttons
* Responsive layout
* Keyboard accessibility
* Theme compatibility
* Enterprise scalability

The component must remain:

* Presentation-only
* Generic
* Strongly typed
* Reusable
* Theme-aware

No business logic.

No feature-specific behavior.

---

# Expected Usage

The component will be reused in:

* Products
* Orders
* Customers
* Inventory
* Users
* Reports
* Administration
* Audit Logs

Feature modules should never implement their own search toolbar.

---

# Folder Structure

Create

```text
src/app/shared/components/search-toolbar/

    search-toolbar.component.ts
    search-toolbar.component.html
    search-toolbar.component.scss
    search-toolbar.component.spec.ts
    search-toolbar-filters.directive.ts
    search-toolbar-actions.directive.ts
    index.ts
```

Update the shared barrel export if applicable.

---

# Angular Requirements

Use

* Standalone Component
* ChangeDetectionStrategy.OnPush
* Angular Signals
* input()
* output()
* computed()
* contentChild()

Do NOT use

* NgModule
* any
* inline templates
* inline styles
* feature-specific services
* subscriptions for UI state

---

# Component Selector

```html
<app-search-toolbar></app-search-toolbar>
```

---

# Public API

## Inputs

Implement strongly typed Angular 19 inputs.

```typescript
readonly placeholder = input('Search...');

readonly searchValue = input('');

readonly loading = input(false);

readonly disabled = input(false);

readonly dense = input(false);

readonly showSearch = input(true);

readonly debounceTime = input(300);

readonly ariaLabel = input('Search');
```

---

## Outputs

```typescript
readonly searchChange = output<string>();

readonly searchSubmit = output<string>();

readonly clearSearch = output<void>();
```

---

# Content Projection

Support two named slots.

Filters

```html
<div toolbar-filters></div>
```

Actions

```html
<div toolbar-actions></div>
```

Example

```html
<app-search-toolbar>

    <div toolbar-filters>

        <mat-select></mat-select>

    </div>

    <div toolbar-actions>

        <button mat-flat-button>

            Export

        </button>

    </div>

</app-search-toolbar>
```

The component must not know what filters are being projected.

---

# Search Behavior

Requirements

* Search input emits debounced `searchChange`
* Pressing **Enter** emits `searchSubmit`
* Clicking clear emits `clearSearch`
* Clearing also emits `searchChange('')`
* Ignore duplicate search values
* Respect `disabled`
* Respect `loading`

Use Angular Signals where appropriate.

Use RxJS only where required for debounce behavior.

---

# HTML Layout

Recommended

```text
Search Toolbar

    Search Field

    Projected Filters

    Spacer

    Projected Actions
```

Keep DOM minimal.

---

# Accessibility

Must comply with WCAG 2.1 AA.

Support

* aria-label
* keyboard navigation
* Enter key
* Escape clears search (optional)
* focus management
* disabled state
* loading state
* proper form semantics

---

# Responsive Behavior

Desktop

```text
Search | Filters | Spacer | Actions
```

Tablet

```text
Search

Filters

Actions
```

Mobile

```text
Search

Filters

Actions
```

Support wrapping without layout breakage.

---

# Angular Material

Use

* mat-form-field
* matInput
* mat-icon
* mat-icon-button
* mat-progress-spinner (optional loading indicator)

Use Material Design tokens.

Do not hardcode colors.

---

# Styling Requirements

Support

* dense mode
* loading state
* disabled state
* responsive layout
* dark theme
* light theme
* focus state
* hover state

Use Material theme tokens.

Avoid duplicated CSS.

---

# Performance Requirements

Must use

* OnPush
* Signals
* Minimal DOM
* No unnecessary change detection
* No unnecessary computed signals
* No memory leaks

---

# Type Safety

No `any`.

Use strict typing.

No unsafe casting.

---

# Unit Tests

Target

95%+ coverage

Include tests for

* component creation
* placeholder
* search input
* debounced search emission
* duplicate value suppression
* Enter key submission
* clear button
* disabled state
* loading state
* projected filters
* projected actions
* accessibility attributes
* responsive class generation
* keyboard navigation

---

# Manual Testing Checklist

Verify

* Desktop
* Laptop
* Tablet
* Mobile Portrait
* Mobile Landscape
* Empty search
* Long search text
* Clear button
* Loading state
* Disabled state
* Debounced search
* Enter key
* Projected filters
* Projected actions
* Dark theme
* Light theme
* Screen reader compatibility

---

# Architecture Constraints

Do **NOT**

* implement Product filters
* implement Order filters
* implement Customer filters
* hardcode filter controls
* hardcode action buttons
* implement API calls
* inject business services
* couple to feature modules

This component must remain a reusable UI primitive.

---

# Deliverables

Provide

1. Architecture overview
2. Design decisions
3. Folder structure
4. Files created
5. Files modified
6. Complete production-ready source code for every file
7. Unit tests
8. Accessibility review
9. Performance review
10. Manual testing checklist
11. Technical assumptions
12. Git commit message
13. ADR update recommendation
14. Sprint report update

---

# Acceptance Criteria

Implementation is complete only if:

* Angular application builds successfully
* No TypeScript errors
* No lint errors
* Unit tests pass
* 95%+ test coverage achieved
* Accessibility requirements satisfied
* Responsive layout verified
* Theme compatibility verified
* Angular 19 Signals used appropriately
* OnPush enabled
* No business logic introduced
* Component is reusable across all feature modules
* Production-ready quality achieved

---

# Git Commit

```bash
git add .

git commit -m "feat(ui): add reusable enterprise SearchToolbar component"
```

---

# ADR Recommendation

Create:

**ADR-009 – Enterprise Search Toolbar Design Strategy**

Document:

* Context
* Decision
* Component responsibilities
* Content projection strategy
* Accessibility standards
* Responsive layout approach
* Theme integration
* Future extensibility

---

# Sprint Report Update

**Sprint 3.1B – Milestone 2**

Task: Enterprise SearchToolbarComponent

Include:

* Enterprise reusable search toolbar completed
* Standardized search UX established
* Filter and action projection implemented
* Accessibility and responsive design verified
* Ready for integration into Products, Orders, Customers, Inventory, Reports, and Administration

---

# Stop Condition

After completing **SearchToolbarComponent**:

* Stop immediately.
* Do **not** implement `SectionHeaderComponent`.
* Wait for **Technical Lead architecture review and approval** before proceeding to the next Design System component.
