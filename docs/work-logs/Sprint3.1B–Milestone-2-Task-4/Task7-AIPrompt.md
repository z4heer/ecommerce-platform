Below is a **production-ready AI prompt** designed for another AI coding assistant or junior developer. It follows the same enterprise workflow you've established throughout Sprint 3.1B and is focused **only on implementing the `LoadingSkeletonComponent`**.

---

# AI Prompt – Sprint 3.1B Milestone 2

## Task: Implement Enterprise LoadingSkeletonComponent

You are acting as a **Senior Angular 19 Engineer**, **Enterprise UI Architect**, **Angular Material Expert**, **Accessibility Specialist**, **Performance Engineer**, and **Enterprise Code Reviewer**.

We are building a **production-grade Enterprise E-Commerce Platform**.

This is **NOT** a tutorial, sample, or learning project.

Follow enterprise engineering standards used by large software organizations.

Implement **only** the `LoadingSkeletonComponent`.

Do **not** modify unrelated components.

Stop after this component is complete.

---

# Project Context

## Technology Stack

### Frontend

* Angular 19
* Standalone Components
* Angular Material
* Angular Signals
* Functional Guards
* Functional Interceptors
* Reactive Forms
* OnPush Change Detection
* Enterprise Folder Structure

### Backend

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
* SectionHeader

Next Component

**LoadingSkeletonComponent**

---

# Objective

Create a reusable **Loading Skeleton** component that provides a consistent loading experience throughout the application.

The component must remain

* Presentation-only
* Generic
* Theme-aware
* Responsive
* Accessible
* Strongly typed
* High performance

No business logic.

No feature-specific layouts.

---

# Intended Usage

This component will be reused in

* Product Catalog
* Dashboard Widgets
* Orders
* Customers
* Inventory
* Reports
* Analytics
* Settings
* Administration
* Search Results

Every feature module should use this component instead of implementing its own loading placeholders.

---

# Folder Structure

Create

```text
src/app/shared/components/loading-skeleton/

    loading-skeleton.component.ts
    loading-skeleton.component.html
    loading-skeleton.component.scss
    loading-skeleton.component.spec.ts
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
* computed()

Do NOT use

* NgModule
* any
* inline templates
* inline styles
* subscriptions
* timers
* JavaScript animation loops
* feature services

---

# Component Selector

```html
<app-loading-skeleton></app-loading-skeleton>
```

---

# Public API

Implement strongly typed Angular 19 inputs.

```typescript
readonly variant = input<
'text'
| 'card'
| 'list'
| 'table'
| 'avatar'
| 'custom'
>('text');

readonly count = input(1);

readonly animated = input(true);

readonly dense = input(false);

readonly fullWidth = input(true);

readonly width = input<string>();

readonly height = input<string>();

readonly ariaLabel = input('Loading content');
```

---

# Computed Signals

Use computed() where appropriate.

Recommended

```typescript
readonly cssClasses

readonly skeletonItems

readonly computedStyles
```

Avoid unnecessary computed signals.

---

# Supported Variants

## Text

```text
██████████████████
██████████
████████████████
```

---

## Card

```text
+---------------------+

████████████████

██████████████

██████████████████

+---------------------+
```

---

## List

```text
○ █████████████

○ ███████████

○ ███████████████
```

---

## Table

```text
████ ████ ██████ ████

████ ████ ██████ ████

████ ████ ██████ ████
```

---

## Avatar

```text
◯

██████████████
```

---

## Custom

Allow configurable

* width
* height

---

# HTML Layout

Use structural rendering.

Example

```text
@if(text)

@if(card)

@if(list)

@if(table)

@if(avatar)
```

Avoid unnecessary wrapper elements.

Keep DOM minimal.

---

# Animation

Implement shimmer animation using CSS only.

Do NOT

* use JavaScript animation
* use timers
* use requestAnimationFrame

Support

```text
animated = false
```

Animation must stop completely.

---

# Accessibility

Must comply with WCAG 2.1 AA.

Requirements

* aria-label
* role="status"
* aria-live="polite"
* aria-busy="true"

Support

```css
prefers-reduced-motion
```

When reduced motion is enabled

Disable shimmer animation automatically.

---

# Theme Support

Use Angular Material Design Tokens.

Support

* Light Theme
* Dark Theme

Avoid

```scss
#ffffff

#eeeeee

rgb(...)
```

Use Material CSS variables.

---

# Responsive Behavior

Desktop

Tablet

Mobile

Skeletons should resize naturally.

No horizontal scrolling.

---

# Styling Requirements

Support

* dense mode
* full width
* custom width
* custom height
* shimmer
* no shimmer
* responsive
* theme compatibility

Organize SCSS into logical sections.

---

# Performance Requirements

Must use

* OnPush
* Signals
* Minimal DOM
* CSS animation only
* No timers
* No subscriptions
* No effects unless absolutely required

Avoid layout thrashing.

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
* every variant
* count rendering
* animated=true
* animated=false
* dense mode
* full width
* custom width
* custom height
* aria-label
* accessibility attributes
* computed CSS classes
* responsive class generation

---

# Manual Testing Checklist

Verify

Desktop

Laptop

Tablet

Mobile Portrait

Mobile Landscape

Text variant

Card variant

List variant

Table variant

Avatar variant

Custom variant

Animated

Non-animated

Reduced motion

Dark theme

Light theme

Screen reader compatibility

---

# Architecture Constraints

Do **NOT**

* implement API loading
* inject services
* create business layouts
* couple to Product module
* couple to Dashboard module
* couple to Orders module
* use JavaScript animations
* use feature-specific skeletons

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

Implementation is complete only if

* Angular application builds successfully
* No TypeScript errors
* No lint errors
* Unit tests pass
* 95%+ coverage achieved
* Accessibility requirements satisfied
* Reduced-motion support verified
* Responsive layout verified
* Theme compatibility verified
* Angular 19 Signals used appropriately
* OnPush enabled
* No business logic introduced
* Component reusable across all feature modules
* Production-ready quality achieved

---

# Git Commit

```bash
git add .

git commit -m "feat(ui): add reusable enterprise LoadingSkeleton component"
```

---

# ADR Recommendation

Create:

**ADR-011 – Enterprise Loading Experience Strategy**

Document:

* Context
* Decision
* Skeleton vs Spinner guidance
* Accessibility strategy
* Reduced-motion support
* Theme integration
* Performance considerations
* Future extensibility

---

# Sprint Report Update

**Sprint 3.1B – Milestone 2**

Task: Enterprise LoadingSkeletonComponent

Include

* Enterprise LoadingSkeleton component completed
* Standardized loading experience established
* CSS-only shimmer animation implemented
* Reduced-motion accessibility supported
* Material theme integration verified
* Ready for integration into Products, Orders, Customers, Inventory, Reports, Analytics, Dashboard, and Administration

---

# Stop Condition

After completing **LoadingSkeletonComponent**:

* Stop immediately.
* Do **not** implement `EmptyStateComponent`.
* Wait for **Technical Lead architecture review and approval** before proceeding to the next Design System component.