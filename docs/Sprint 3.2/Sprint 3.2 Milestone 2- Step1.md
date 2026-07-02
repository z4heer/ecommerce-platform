Excellent. With **Milestone 1 approved**, we'll move to the next item in the roadmap using our agreed framework.

---

# Sprint 3.2 – Milestone 2

# Product Module Design System Integration

## Phase 2 → Step 1 (Architecture & Task Preparation)

**Status:** 🟡 Ready for Development

Reference: Sprint 3.2 roadmap and Milestone 1 completion.  

---

# 1. Architecture Review

## Current State

The Product module is one of the application's primary business features. While functionally complete, it still contains feature-specific UI implementations that should now be replaced by the shared Design System.

Typical areas include:

* Product List
* Product Details
* Product Search
* Product Filters
* Product Cards
* Empty results
* Error handling
* Loading states

Unlike the Dashboard, this module has user interactions (search, filtering, navigation), so the integration must preserve all existing behavior.

---

## Architectural Objective

Transform the Product module into a full consumer of the shared Design System.

### Before

```text
Product Module
├── mat-card
├── custom search toolbar
├── custom chips
├── custom empty states
├── custom loading
└── feature-specific UI
```

### After

```text
Product Module
        │
        ▼
Enterprise Design System

SearchToolbar
AppCard
StatusChip
LoadingSkeleton
EmptyState
ErrorState
ConfirmationDialog
```

No business logic changes.

No API changes.

No service changes.

---

# 2. Design Decisions

## Decision 1 — Product Cards

Replace every remaining:

* mat-card
* custom product container

with

* AppCard

Preserve:

* image
* title
* category
* price
* stock
* action buttons

---

## Decision 2 — Search

Replace local search implementation with

* SearchToolbar

Reuse existing filtering logic.

Do not modify ProductService.

---

## Decision 3 — Product Status

Replace:

* badges
* chips
* labels

with

StatusChip.

Recommended mappings:

| Product State         | Chip Type |
| --------------------- | --------- |
| In Stock              | Success   |
| Low Stock             | Warning   |
| Out of Stock          | Error     |
| Draft (if applicable) | Neutral   |

---

## Decision 4 — Loading

Replace all loading indicators with:

LoadingSkeleton

No spinners should remain inside the Product feature.

---

## Decision 5 — Empty Results

Use

EmptyState

Examples:

* No products
* No search results
* No filtered results

---

## Decision 6 — Error Handling

Use

ErrorState

Do not change existing error handling logic.

---

## Decision 7 — ConfirmationDialog

Use only where destructive actions already exist.

Examples:

* Delete Product
* Remove Product
* Archive Product

If none exist, do not add dialog logic.

---

# 3. Folder Review

Expected structure:

```text
features/product/

product-list/
product-detail/
product-search/
product-filter/

services/
models/
```

No restructuring.

---

# 4. Expected Files to Modify

Likely candidates:

```text
product-list.component.html
product-list.component.ts
product-list.component.scss

product-detail.component.html
product-detail.component.ts
product-detail.component.scss

product-search.component.*

product-filter.component.*
```

Only modify files required for the Design System integration.

---

# 5. Files to Create

None.

Consume existing shared components.

No wrappers.

No helper components.

No duplicate UI.

---

# 6. Implementation Constraints

Do **not**:

* modify ProductService
* modify API endpoints
* modify models
* modify routing
* change signals
* change Observables
* introduce new dependencies
* alter business rules

Presentation layer only.

---

# 7. Acceptance Criteria

## Functional

* Product search works.
* Filters work.
* Product list renders correctly.
* Product details remain unchanged.
* Navigation remains intact.
* Existing API calls unchanged.

## UI

* AppCard used consistently.
* SearchToolbar integrated.
* StatusChip replaces custom badges.
* LoadingSkeleton replaces spinners.
* EmptyState replaces custom placeholders.
* ErrorState replaces custom errors.
* ConfirmationDialog used only where applicable.

## Code Quality

* No duplicated HTML.
* No duplicated SCSS.
* Strict typing maintained.
* OnPush preserved.
* Signals preserved.

---

# 8. Risks

Medium complexity.

Potential risks:

* SearchToolbar event binding mismatch.
* Product card content projection issues.
* StatusChip mapping inconsistencies.
* Responsive grid regressions.
* Filter state preservation after refactoring.

---

# 9. Unit Testing Checklist

Verify:

* Product list renders.
* SearchToolbar emits search events correctly.
* Filters update the displayed products.
* AppCard displays projected content.
* StatusChip maps stock states correctly.
* LoadingSkeleton appears during fetch.
* EmptyState appears when no products match.
* ErrorState displays on service failures.

---

# 10. Integration Testing Checklist

Validate:

* Login → Product List.
* Search.
* Category filter.
* Price filter.
* Product details navigation.
* Browser refresh.
* Direct URL access.
* Responsive layouts.

---

# 11. Manual Testing Checklist

* Desktop.
* Tablet.
* Mobile.
* Keyboard navigation.
* Search interaction.
* Filter interaction.
* Empty search results.
* Loading state.
* Error state.
* Back navigation.

---

# 12. Accessibility Review

Verify:

* SearchToolbar is keyboard accessible.
* Product cards expose meaningful semantics.
* StatusChip conveys status accessibly.
* Images include appropriate alternative text.
* Focus order remains logical.
* Error and empty states are announced appropriately.

Target: **WCAG 2.1 AA**.

---

# 13. Performance Review

Ensure:

* OnPush preserved.
* Signals preserved.
* No duplicate HTTP requests.
* No unnecessary recomputations.
* Efficient rendering for larger product lists.
* Avoid inline object or array creation in templates.

---

# 14. Technical Lead Review Checklist

Approval requires:

* Consistent Design System usage.
* Business logic unchanged.
* Product functionality preserved.
* Responsive layout validated.
* No new technical debt.
* Clean Angular 19 implementation.
* Enterprise coding standards followed.

---

# 15. Git Commit (Post-Approval)

```text
refactor(product): integrate enterprise design system components
```

---

# 16. ADR Impact

No new ADR required.

Continue implementing **ADR-007 — Design System Adoption Strategy**.

---

# 17. Sprint Report Update

After successful completion, record:

* Product Module migrated to Enterprise Design System.
* Shared components adopted across product list, details, search, and filters.
* Legacy UI removed.
* Search and filtering behavior preserved.
* Accessibility and responsive behavior validated.
* Ready for Authentication modernization.

---

## Next Step

The next deliverable will be **Phase 2 → Step 2**, where I'll generate a **single-task, production-ready AI Coding Assistant prompt** for **Product Module Design System Integration**. As with Milestone 1, it will be tightly scoped, preserve architecture, and focus exclusively on implementation.