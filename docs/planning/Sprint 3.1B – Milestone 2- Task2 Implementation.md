# AI Prompt — Sprint 3.1B Milestone 2

## Task: Implement Enterprise AppCardComponent

You are a **Senior Angular 19 Developer** working on a **production-grade Enterprise E-Commerce Platform**.

This is **not** a tutorial or demo application.

Follow enterprise coding standards used by large engineering teams.

Do **not** modify unrelated files.

Implement **only** the AppCardComponent.

---

# Project Context

Technology Stack

* Angular 19
* Standalone Components
* Angular Material
* Angular Signals
* Functional Guards
* Functional Interceptors
* Reactive Forms
* OnPush Change Detection
* Enterprise Folder Structure

Already completed

* Main Layout
* Toolbar
* Footer
* Responsive Navigation
* PageContainer
* PageHeader
* Layout Service
* Logger
* Notification Service
* Loading Service

The next Design System component is:

**AppCardComponent**

This component will become the standard reusable card across the entire application.

---

# Objective

Create a reusable enterprise card component that supports:

* Dashboard
* Products
* Orders
* Customers
* Reports
* Administration
* Analytics

No business logic should exist inside this component.

It must remain a pure presentation component.

---

# Folder Structure

Create:

```text
src/app/shared/components/app-card/

    app-card.component.ts
    app-card.component.html
    app-card.component.scss
    app-card.component.spec.ts
    index.ts
```

If a shared barrel export exists, update it accordingly.

---

# Angular Requirements

Use

* Standalone Component
* ChangeDetectionStrategy.OnPush
* Angular Signals
* input()
* output()
* computed() where appropriate

Do NOT use

* NgModule
* any
* ViewEncapsulation.None
* inline styles
* inline templates
* unnecessary subscriptions

---

# Component Selector

```html
<app-card></app-card>
```

---

# Inputs

Implement strongly typed inputs.

```typescript
title?: string

subtitle?: string

appearance:
'elevated' | 'outlined'

Default:
'elevated'

padding:
'comfortable'
'compact'
'none'

Default:
'comfortable'

loading:
boolean

Default false

clickable:
boolean

Default false

disabled:
boolean

Default false
```

Use Angular 19 `input()` APIs.

---

# Output

Create

```typescript
cardClick
```

Only emit when

* clickable=true
* disabled=false

---

# Content Projection

Support three slots.

Header

```html
<div card-header>
```

Body

Default ng-content

Actions

```html
<div card-actions>
```

Example usage

```html
<app-card
    title="Products"
    subtitle="Available Inventory">

    <div card-header>

        Header Content

    </div>

    Main Content

    <div card-actions>

        Buttons

    </div>

</app-card>
```

---

# HTML Layout

Recommended structure

```text
Mat Card

    Header

        Optional projected header

        Optional title

        Optional subtitle

    Body

        projected content

    Footer

        projected actions
```

Do not duplicate DOM elements when sections are absent.

---

# Accessibility

Support

Keyboard

Enter

Space

Focus

Proper tabindex

Proper role

Only interactive when clickable=true.

Disabled cards must not receive focus.

---

# Styling Requirements

Use Angular Material Card.

Provide enterprise SCSS.

Support

Elevated

Outlined

Hover effect

Clickable state

Disabled state

Loading state

Compact padding

Comfortable padding

No padding

Responsive

Rounded corners

Consistent spacing

Use Material theme tokens.

Do not hardcode theme colors.

---

# Performance Requirements

Must use

OnPush

Signals

No unnecessary change detection

Minimal DOM

No unnecessary directives

No duplicated CSS

---

# Type Safety

No any.

Use strict typing everywhere.

---

# Unit Tests

Create tests covering

* component creation
* title rendering
* subtitle rendering
* header projection
* body projection
* actions projection
* appearance class
* padding class
* loading state
* clickable state
* disabled state
* click event
* keyboard interaction
* output emission

Target

95%+ coverage

---

# Manual Testing Checklist

Verify

Desktop

Tablet

Mobile

Long content

No title

No subtitle

No header

No actions

Clickable

Disabled

Loading

Keyboard navigation

Responsive layout

---

# Acceptance Criteria

The implementation is complete only if

* Component builds successfully
* No lint errors
* No TypeScript errors
* Strict typing passes
* Unit tests pass
* Uses Angular 19 best practices
* Uses Signals appropriately
* Uses OnPush
* Is reusable
* Is accessible
* Contains no business logic
* Ready for enterprise production use

---

# Deliverables

Provide

1. Folder structure
2. Files created
3. Files modified
4. Complete source code for every file
5. Unit tests
6. Explanation of important design decisions
7. Any assumptions made

Do not implement any other Design System component.

Stop after completing **AppCardComponent** and wait for Technical Lead review before proceeding to the next task.
