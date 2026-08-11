Excellent. We'll follow the framework exactly. This response is **Phase 1 → Step 1 (Architecture & Task Preparation)** only. No production code yet.

---

# Sprint 3.2 – Milestone 1

## Task 1

# Dashboard Refactoring – Phase 1

**Status:** 🟡 Ready for Development

Reference: Sprint 3.2 Detailed Requirement. 

---

# 1. Architecture Review

## Current Situation

Sprint 3.1B successfully established the Enterprise Design System.

Current dashboard still contains legacy UI elements:

* raw Material Cards
* duplicated headings
* custom status badges
* inconsistent loading UI
* inconsistent empty states
* inconsistent error UI

The dashboard therefore violates one of the primary architectural principles established in Sprint 3.1B:

> **Feature modules must consume shared UI components rather than implementing local variants.**

No backend changes are required.

No routing changes are required.

No API changes are required.

This task is purely a presentation-layer refactoring.

---

## Architectural Objective

Move Dashboard from:

```
Dashboard
    │
    ├── mat-card
    ├── custom titles
    ├── custom chips
    ├── spinner
    └── duplicated UI
```

to

```
Dashboard

        │

        ▼

Enterprise Design System

AppCard
SectionHeader
StatusChip
LoadingSkeleton
EmptyState
ErrorState
ConfirmationDialog (if required)
```

The dashboard becomes merely a consumer of the Design System.

---

# 2. Design Decisions

## Decision 1

Dashboard must not implement its own cards.

Use

```
<AppCard>
```

everywhere.

---

## Decision 2

No hardcoded typography.

Replace

```
<h2>
<h3>
```

with

```
<SectionHeader>
```

---

## Decision 3

Status display must become standardized.

Replace

```
mat-chip
span.badge
div.status
```

with

```
<StatusChip>
```

---

## Decision 4

Loading indicators

Replace

```
mat-spinner
progress-bar
```

with

```
<LoadingSkeleton>
```

---

## Decision 5

Empty UI

Replace every custom

```
No data found
```

with

```
<EmptyState>
```

---

## Decision 6

Errors

Replace

```
mat-error
alert
custom div
```

with

```
<ErrorState>
```

---

## Decision 7

ConfirmationDialog

Only integrate if dashboard currently contains destructive actions such as:

* delete
* remove
* reset
* archive

Otherwise **do not add it**.

Avoid unnecessary dependencies.

---

# 3. Folder Review

Expected dashboard structure:

```
dashboard/

dashboard.component.ts

dashboard.component.html

dashboard.component.scss

dashboard.routes.ts

dashboard.service.ts
```

No structural changes.

No new dashboard components.

---

# 4. Files Expected to be Modified

Expected list (actual set depends on implementation):

```
dashboard.component.html

dashboard.component.ts

dashboard.component.scss
```

Potential shared import updates:

```
shared/index.ts

or

shared/components/index.ts
```

Only if required.

---

# 5. Files to Create

None.

Dashboard must consume existing shared components.

No additional components.

No wrappers.

No helpers.

---

# 6. Implementation Constraints

The implementation **must not**:

* create new shared components
* change dashboard business logic
* modify services
* change APIs
* alter routing
* change signal architecture
* introduce new dependencies
* duplicate Design System components

---

# 7. Acceptance Criteria

The task is complete only if all of the following are true:

### Functional

* Dashboard behaves exactly as before.
* Existing API calls unchanged.
* Existing Signals unchanged.
* Existing services unchanged.

### UI

* All cards replaced with `AppCard`.
* All section headings use `SectionHeader`.
* All status indicators use `StatusChip`.
* Loading uses `LoadingSkeleton`.
* Empty states use `EmptyState`.
* Errors use `ErrorState`.

### Code Quality

* No duplicated HTML.
* No duplicated SCSS.
* No `any`.
* Strict typing maintained.
* OnPush preserved.
* Angular Signals preserved.

---

# 8. Risks

Low risk.

Potential issues:

* missing imports
* broken Material layout spacing
* incorrect AppCard projection
* StatusChip input mismatch
* responsive CSS regressions

No backend risks.

---

# 9. Unit Testing Checklist

Verify:

* Dashboard renders successfully.
* AppCard receives projected content.
* SectionHeader inputs render correctly.
* StatusChip renders expected status values.
* LoadingSkeleton appears during loading.
* EmptyState appears when no dashboard data exists.
* ErrorState appears on service failure.
* Existing dashboard interactions remain functional.

---

# 10. Integration Testing Checklist

Verify:

* Dashboard loads after login.
* Navigation remains intact.
* API responses display correctly.
* Status values map correctly to `StatusChip`.
* Responsive behavior remains correct across breakpoints.

---

# 11. Manual Testing Checklist

* Desktop layout
* Tablet layout
* Mobile layout
* Loading state
* Empty state
* Error state
* Keyboard navigation
* Screen-reader labels (where applicable)
* Browser refresh
* Browser back navigation
* Dark theme (if supported)

---

# 12. Accessibility Review

The implementation should verify:

* Proper heading hierarchy using `SectionHeader`.
* Decorative icons marked `aria-hidden` where appropriate.
* Interactive controls have accessible labels.
* Logical keyboard focus order.
* Sufficient color contrast via Material 3 tokens.
* Empty and error states announce meaningful information.

Target: **WCAG 2.1 AA**.

---

# 13. Performance Review

Ensure:

* `ChangeDetectionStrategy.OnPush` remains.
* Angular Signals are not converted to RxJS unnecessarily.
* No duplicate HTTP requests.
* No unnecessary computed signals.
* No excessive template nesting.
* No inline object/array creation in templates.
* Bundle size remains unchanged (shared components already exist).

---

# 14. Technical Lead Review Checklist

The implementation will be approved only if:

* Enterprise Design System is used consistently.
* Business logic is untouched.
* Shared components are reused correctly.
* No new technical debt is introduced.
* Code follows SOLID, DRY, and KISS principles.
* Styling is consistent with Material 3.
* Existing functionality is preserved.

---

# 15. Git Commit (Post-Approval)

```text
refactor(dashboard): integrate enterprise design system components
```

---

# 16. ADR Impact

**No new ADR required.**

This task implements the previously approved Design System adoption strategy (ADR-007) without changing architectural direction.

---

# 17. Sprint Report Update

Record the following after successful completion:

* Dashboard migrated to Enterprise Design System.
* Legacy Material cards removed.
* Shared components adopted (`AppCard`, `SectionHeader`, `StatusChip`, `LoadingSkeleton`, `EmptyState`, `ErrorState`).
* No functional regressions observed.
* Accessibility and responsive behavior validated.
* Ready to proceed to Product Module Integration.

---

# Deliverable for AI Coding Assistant (Next Step)

In **Phase 1 → Step 2**, I will generate a **single-task, production-ready implementation prompt** specifically for **Dashboard Refactoring – Phase 1**. It will instruct the coding assistant to modify only the necessary dashboard files, preserve existing behavior, and return implementation code plus tests, without making architectural decisions. That prompt will be self-contained so it can be pasted directly into a new coding-assistant session.
