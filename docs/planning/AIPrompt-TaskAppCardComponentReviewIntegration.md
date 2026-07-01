Below is a production-ready AI prompt specifically for **reviewing and enhancing the existing AppCard implementation**. Unlike the previous prompt (which asked the AI to build the component from scratch), this prompt assumes the component already exists and instructs the AI to perform an enterprise-grade code review, implement only the approved improvements, and avoid unnecessary refactoring.

---

# AI Prompt – Enterprise Code Review & Enhancement

## Sprint 3.1B – Milestone 2

### Task: AppCardComponent Enterprise Review & Integration Improvements

You are acting as a **Principal Angular Architect**, **Enterprise Technical Lead**, **Angular 19 Expert**, **Accessibility Specialist**, and **Code Reviewer**.

This project is a **production-grade Enterprise E-Commerce Platform**.

This is **NOT** a tutorial project.

The AppCard component has already been implemented by a junior developer and has passed an initial architecture review.

Your responsibility is **not to rewrite the component**, but to perform a **production readiness review**, implement only approved improvements, and preserve backward compatibility.

---

# Objective

Review the existing implementation and improve it to enterprise production standards.

The implementation should remain:

* Generic
* Reusable
* Presentation-only
* Strongly typed
* Angular 19 compliant
* Enterprise scalable

Do **NOT** redesign the component.

Do **NOT** introduce breaking API changes.

---

# Current Implementation

The following already exists:

* Standalone Component
* Angular Signals
* input()
* output()
* computed()
* contentChild()
* OnPush
* Angular Material Card
* Header projection
* Content projection
* Actions projection
* Keyboard interaction
* Click event
* Appearance variants
* Padding variants
* Loading state
* Disabled state

Preserve all existing functionality.

---

# Approved Improvements

Implement **only** the following enhancements.

---

## 1. Accessibility Improvement

Current implementation exposes

```text
role="button"
```

without an accessible name.

Add

```typescript
readonly ariaLabel = input<string>();
```

Behavior

Priority

1. ariaLabel input

2. title input

3. null

Apply

```text
attr.aria-label
```

Do not remove existing accessibility attributes.

---

## 2. Theme Compatibility

Replace any hardcoded colors used for loading overlays or interactive states.

Use Angular Material design tokens.

Avoid

```scss
rgb(...)
white
#ffffff
```

Support both

* Light Theme
* Dark Theme

---

## 3. Ripple Support

When

```text
clickable=true
```

enable

Angular Material Ripple.

Requirements

* Ripple only when interactive
* Disabled cards must not ripple
* Respect Material theme

---

## 4. Hover Improvements

Improve outlined cards.

Animate

* border-color
* elevation
* transform

Keep animation subtle.

Avoid excessive motion.

---

## 5. Padding Review

Review spacing.

Avoid duplicated padding caused by both

* mat-card
* custom SCSS

Ensure consistent spacing for

* header
* body
* actions

---

## 6. Host Bindings Review

Evaluate whether

```html
[attr.role]

[attr.tabindex]
```

should be moved to HostBinding.

Only perform the change if

* it simplifies the implementation
* does not introduce breaking behavior
* improves accessibility

Otherwise explain why the current implementation should remain.

---

## 7. CSS Review

Review SCSS.

Improve

* maintainability
* theme compatibility
* selector organization
* reusable utility classes

Do not redesign styling.

---

## 8. Performance Review

Verify

* Signals are used correctly
* No unnecessary computed signals
* No unnecessary change detection
* No unnecessary DOM nodes

Only optimize where beneficial.

---

## 9. Unit Tests

The existing tests are insufficient.

Expand the test suite to cover:

* component creation
* title
* subtitle
* projected header
* projected body
* projected actions
* appearance variants
* padding variants
* loading state
* disabled state
* clickable state
* click event emission
* keyboard Enter
* keyboard Space
* tabindex
* role
* aria-label
* ripple behavior (if practical)

Target

95%+ coverage

---

## 10. Integration Review

Review whether AppCard is ready for integration into

* Dashboard
* Products
* Login
* Register

Provide recommendations if API improvements are needed before wider adoption.

Do not modify those feature modules.

---

# Coding Standards

Follow

* Angular 19 Best Practices
* SOLID
* DRY
* KISS
* Clean Architecture
* Enterprise Design System principles
* WCAG 2.1 AA
* Strong typing
* No any
* OnPush
* Signals

---

# Constraints

Do NOT

* redesign component API
* rename public inputs
* rename outputs
* remove existing functionality
* introduce business logic
* introduce feature-specific code
* modify unrelated files
* perform speculative refactoring

---

# Deliverables

Provide

1. Architecture review
2. Code review summary
3. List of improvements implemented
4. Files modified
5. Complete updated code for every modified file
6. Unit tests
7. Accessibility review
8. Performance review
9. Integration readiness assessment
10. Manual testing checklist
11. Git commit message
12. ADR update recommendation
13. Sprint report update

---

# Acceptance Criteria

The task is complete only if:

* Existing functionality remains intact.
* No breaking API changes are introduced.
* Component builds without errors.
* No lint warnings.
* No TypeScript errors.
* Unit tests pass.
* Accessibility is improved.
* Theme compatibility is verified.
* Production readiness is achieved.
* Component is suitable for reuse across Dashboard, Products, Orders, Customers, Reports, and Administration.

---

# Stop Condition

After completing the review and enhancements:

* Stop.
* Do **not** begin `StatusChipComponent`.
* Wait for **Technical Lead approval** before proceeding to the next Design System component.