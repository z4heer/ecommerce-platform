# Enterprise E-Commerce Platform – Sprint 3.2

## Milestone 1 – Dashboard Refactoring (Phase 1)

You are acting as a **Senior Angular 19 Enterprise Developer**.

This is an enterprise production application.

You are **NOT** the architect.

Architecture decisions have already been finalized.

Your responsibility is to implement this task only.

Do not redesign the application.

Do not create additional shared components.

Do not modify business logic.

Do not change services.

Do not change routing.

Do not change APIs.

Do not change application architecture.

---

# Objective

Refactor the existing Dashboard module to consume the Enterprise Design System components that already exist.

Preserve all existing functionality.

This is a presentation-layer refactoring only.

---

# Existing Shared Components

The following reusable components already exist and are production ready.

## Layout

* PageContainer
* PageHeader
* SectionHeader

## Shared

* AppCard
* StatusChip
* SearchToolbar

## Feedback

* LoadingSkeleton
* EmptyState
* ErrorState

## Dialog

* ConfirmationDialog

Do not recreate any of them.

Consume them.

---

# Dashboard Refactoring Requirements

Replace all remaining raw Angular Material UI implementations.

## Cards

Replace every remaining

* mat-card

with

* AppCard

Preserve projected content.

Do not change displayed information.

---

## Section Titles

Replace custom headings

Examples

* h2
* h3
* custom section headers

with

* SectionHeader

Use existing inputs provided by the component.

---

## Status Display

Replace custom status badges

Examples

* mat-chip
* span.badge
* div.status

with

* StatusChip

Map existing status values correctly.

Do not alter business logic.

---

## Loading State

Replace

* mat-spinner
* progress spinner
* loading placeholders

with

* LoadingSkeleton

LoadingSkeleton must appear only while data is loading.

---

## Empty State

Replace every custom empty placeholder with

* EmptyState

Reuse existing messaging where appropriate.

---

## Error State

Replace custom error containers with

* ErrorState

Use existing error messages.

Do not modify error handling logic.

---

## Confirmation Dialog

If the Dashboard currently contains destructive actions such as:

* Delete
* Remove
* Reset
* Archive

use ConfirmationDialog.

Otherwise do nothing.

Do not introduce unused dialog logic.

---

# Constraints

Do NOT

* create new components
* create wrappers
* duplicate templates
* duplicate styles
* add new dependencies
* modify services
* modify backend calls
* modify Signals
* modify RxJS flows
* modify routing
* introduce technical debt

---

# Angular Standards

Follow

* Angular 19
* Standalone Components
* OnPush Change Detection
* Angular Signals
* Functional architecture
* Strict typing
* Material 3
* SOLID
* DRY
* KISS

No "any".

No inline styles.

No duplicated HTML.

No duplicated SCSS.

---

# Files Expected to Change

Modify only if necessary.

* dashboard.component.html
* dashboard.component.ts
* dashboard.component.scss

If shared imports require updates, modify only those required.

Do not touch unrelated modules.

---

# Accessibility Requirements

Maintain WCAG 2.1 AA compliance.

Verify

* keyboard navigation
* heading hierarchy
* focus visibility
* aria labels where required
* screen-reader friendly empty and error states

---

# Performance Requirements

Preserve

* OnPush
* Angular Signals
* lazy loading
* existing API calls

Avoid

* unnecessary computed signals
* unnecessary template evaluations
* duplicate HTTP requests

---

# Deliverables

Provide only the following.

## 1

Architecture validation summary.

Confirm no architectural changes were introduced.

---

## 2

List every modified file.

---

## 3

Provide complete production-ready code for each modified file.

Do not omit imports.

Do not provide partial snippets.

---

## 4

Unit test updates.

Include only tests impacted by this refactoring.

---

## 5

Manual testing checklist.

---

## 6

Accessibility verification.

---

## 7

Performance verification.

---

## 8

Regression checklist confirming

* Dashboard behavior unchanged
* Existing API calls unchanged
* Existing routing unchanged
* Existing functionality preserved

---

# Stop

After completing Dashboard Refactoring only.

Do not continue to Product Module.

Do not suggest additional enhancements.

Wait for Technical Lead review before proceeding.