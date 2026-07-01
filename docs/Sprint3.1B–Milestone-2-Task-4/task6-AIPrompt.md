Below is a **production-ready AI prompt** designed for another AI coding assistant or junior developer. It follows the same enterprise workflow you've established throughout Sprint 3.1B and is focused **only on implementing the `SectionHeaderComponent`**.

---

# AI Prompt – Sprint 3.1B Milestone 2

## Task: Implement Enterprise SectionHeaderComponent

You are acting as a **Senior Angular 19 Engineer**, **Enterprise UI Architect**, **Angular Material Expert**, **Accessibility Specialist**, and **Enterprise Code Reviewer**.

We are building a **production-grade Enterprise E-Commerce Platform**.

This is **NOT** a tutorial, demo, or learning project.

Follow enterprise engineering standards used by large software organizations.

Implement **only** the `SectionHeaderComponent`.

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
* SearchToolbar

Next Component

**SectionHeaderComponent**

---

# Objective

Create a reusable enterprise **Section Header** component used inside pages, cards, panels, dashboards, and detail views.

This component represents **content sections**, not entire pages.

It must remain:

* Presentation-only
* Generic
* Reusable
* Theme-aware
* Strongly typed
* Fully accessible

No business logic.

No feature-specific behavior.

---

# Intended Usage

The component will be reused in:

* Dashboard cards
* Product Details
* Order Details
* Customer Details
* Reports
* Administration
* Settings
* Analytics
* Inventory
* Audit pages

Feature modules must not create custom section heading layouts.

---

# Relationship to Existing Components

Do **not** duplicate the responsibility of `PageHeader`.

Use the following hierarchy:

```text
PageContainer
    └── PageHeader
            └── AppCard
                    └── SectionHeader
                            └── Content
```

`PageHeader`

* Page title
* Breadcrumb
* Global actions

`SectionHeader`

* Section title
* Section subtitle
* Section actions
* Optional metadata

---

# Folder Structure

Create

```text
src/app/shared/components/section-header/

    section-header.component.ts
    section-header.component.html
    section-header.component.scss
    section-header.component.spec.ts
    section-actions.directive.ts
    section-meta.directive.ts
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
* output() (only if absolutely required)
* computed()
* contentChild()

Do NOT use

* NgModule
* any
* inline templates
* inline styles
* subscriptions
* feature services
* business logic

---

# Component Selector

```html
<app-section-header></app-section-header>
```

---

# Public API

## Inputs

Implement strongly typed Angular 19 inputs.

```typescript
readonly title = input.required<string>();

readonly subtitle = input<string>();

readonly dense = input(false);

readonly showDivider = input(false);

readonly align = input<
'start'
| 'center'
| 'space-between'
>('space-between');

readonly ariaLabel = input<string>();
```

No additional public inputs unless required for accessibility.

---

# Content Projection

Support two named projection areas.

Actions

```html
<div section-actions></div>
```

Metadata

```html
<div section-meta></div>
```

Example

```html
<app-section-header
    title="Products"
    subtitle="Current inventory">

    <div section-meta>

        <app-status-chip
            label="Active"
            status="success">
        </app-status-chip>

    </div>

    <div section-actions>

        <button mat-flat-button>
            Add Product
        </button>

    </div>

</app-section-header>
```

The component must not know what content is projected.

---

# Layout

Recommended layout

```text
-----------------------------------------------------

Title
Subtitle

Metadata

Spacer

Actions

-----------------------------------------------------

Optional Divider

-----------------------------------------------------
```

Responsive behavior should gracefully stack metadata and actions on smaller screens.

---

# Accessibility

Must comply with WCAG 2.1 AA.

Requirements

* semantic heading structure
* aria-label support
* proper heading hierarchy
* keyboard accessibility for projected actions
* focus visibility
* responsive reading order

The component itself is informational and should not be focusable.

---

# Typography

Use Angular Material typography.

Support

* Title
* Subtitle

Do not hardcode typography values.

Use Material Design tokens where applicable.

---

# Divider

Support

```typescript
showDivider = true
```

Render

```html
<mat-divider></mat-divider>
```

only when enabled.

---

# Alignment Variants

Support

```text
start

center

space-between
```

Implement using computed CSS modifier classes.

---

# Responsive Behavior

Desktop

```text
Title + Subtitle | Spacer | Metadata | Actions
```

Tablet

```text
Title + Subtitle

Metadata

Actions
```

Mobile

```text
Title

Subtitle

Metadata

Actions
```

No layout overflow.

---

# Styling Requirements

Support

* dense mode
* divider
* responsive layout
* theme compatibility
* dark theme
* light theme
* Material spacing
* Material typography

Use Material Design theme tokens.

Avoid hardcoded colors.

Organize SCSS into logical sections.

---

# Performance Requirements

Must use

* OnPush
* Signals
* Minimal DOM
* No unnecessary computed signals
* No unnecessary wrappers
* No subscriptions

---

# Type Safety

Use strict typing.

No `any`.

No unsafe casting.

---

# Unit Tests

Target

95%+ coverage

Include tests for

* component creation
* required title
* subtitle rendering
* divider rendering
* dense mode
* alignment variants
* projected metadata
* projected actions
* aria-label
* accessibility attributes
* responsive CSS classes

---

# Manual Testing Checklist

Verify

* Desktop
* Laptop
* Tablet
* Mobile Portrait
* Mobile Landscape
* Long titles
* Long subtitles
* No subtitle
* Divider enabled
* Divider disabled
* Dense mode
* Metadata projection
* Action projection
* Dark theme
* Light theme
* Screen reader compatibility

---

# Architecture Constraints

Do **NOT**

* duplicate PageHeader functionality
* implement breadcrumbs
* implement page actions
* inject services
* perform API calls
* implement feature-specific metadata
* hardcode StatusChip usage
* introduce business logic

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

git commit -m "feat(ui): add reusable enterprise SectionHeader component"
```

---

# ADR Recommendation

Create:

**ADR-010 – Enterprise Section Header Strategy**

Document:

* Context
* Decision
* Separation from PageHeader
* Typography standards
* Content projection strategy
* Responsive layout
* Accessibility requirements
* Theme integration
* Future extensibility

---

# Sprint Report Update

**Sprint 3.1B – Milestone 2**

Task: Enterprise SectionHeaderComponent

Include:

* Enterprise reusable SectionHeader completed
* Standardized content section headings
* Responsive metadata and action projection
* Material typography and theme integration
* Accessibility compliance verified
* Ready for integration into Dashboard, Products, Orders, Customers, Reports, Administration, and Settings

---

# Stop Condition

After completing **SectionHeaderComponent**:

* Stop immediately.
* Do **not** implement `LoadingSkeletonComponent`.
* Wait for **Technical Lead architecture review and approval** before proceeding to the next Design System component.
