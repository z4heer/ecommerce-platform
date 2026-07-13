🚀 Angular 19 Portfolio Project – Complete Test Suite Regeneration Plan
Objective
Regenerate a modern, clean, enterprise-quality Angular 19 test suite for the entire application using AI.
Estimated Time
Project Inventory: 30 mins
Spec Generation: 3–5 hours
Fix Test Failures: 2–3 hours
Coverage Improvement: 1–2 hours
Total: Approximately 1 working day

Phase 1 — Create Test Regeneration Branch
git checkout develop
git pull
git checkout -b test-regeneration


Phase 2 — Backup
Create a restore point.
git tag before-test-regeneration


Phase 3 — Remove Existing Specs
Delete
*.spec.ts

Leave production code untouched.
Commit
git add .
git commit -m "chore: remove legacy unit tests"


Phase 4 — Verify Application
Ensure the application itself is healthy.
ng build

Fix build errors first if any.

Phase 5 — Generate Specs by Module
Recommended order
Shared Components

↓

Layout

↓

Dashboard

↓

Product Catalog

↓

Product Details

↓

Cart

↓

Checkout

↓

Remaining Feature Modules

Work in batches of 3–10 components.

Phase 6 — AI Prompt: Generate New Specs
Act as a Senior Angular 19 Test Architect working on an Enterprise E-Commerce Platform.

Objective:
Generate production-ready unit tests for the attached Angular 19 standalone components.

Requirements

- Angular 19 Standalone
- Latest Angular Testing APIs
- Jasmine + Karma
- Standalone TestBed configuration
- provideHttpClientTesting() where applicable
- provideRouter([]) where applicable
- Mock all dependencies
- Do NOT modify production code
- Follow Angular 19 best practices

Cover

1. Component creation
2. ngOnInit
3. Inputs
4. Outputs
5. Signals
6. Computed signals
7. Effects
8. Public methods
9. Service calls
10. User interactions
11. Loading state
12. Empty state
13. Error state
14. Material components
15. Router navigation
16. DestroyRef cleanup

Generate complete .spec.ts files only.

Target 85–90% meaningful coverage.

If a scenario cannot be tested, explain why in comments.


Phase 7 — Execute Tests
Run
ng test --watch=false


Phase 8 — AI Prompt: Fix Failing Tests
Whenever tests fail
Act as a Principal Angular 19 Test Engineer.

The generated unit tests are failing.

Attached:

- component.ts
- component.html
- current component.spec.ts
- complete ng test error output

Tasks

1. Identify the root cause.
2. Explain why the test fails.
3. Fix ONLY the spec.ts unless production code has a genuine defect.
4. Preserve existing functionality.
5. Keep Angular 19 standalone compatibility.
6. Ensure the updated tests compile and pass.

Return:

- Root cause summary
- Updated complete spec.ts
- Any production code changes only if absolutely necessary.

Repeat
Generate

↓

Run Tests

↓

Fix

↓

Run Again

↓

Green

Commit after each successful module.
Example
git add .
git commit -m "test: regenerate dashboard specs"


Phase 9 — Improve Coverage
Run
ng test --watch=false --code-coverage


Phase 10 — AI Prompt: Improve Test Quality
Act as a Technical Test Architect.

Review the attached:

- component.ts
- component.html
- component.spec.ts

Tasks

1. Review test quality.
2. Identify missing scenarios.
3. Remove duplicate or low-value tests.
4. Add meaningful edge-case tests.
5. Improve branch coverage.
6. Verify Angular 19 best practices.
7. Ensure the tests remain maintainable.

Do NOT rewrite the entire spec unless necessary.

Return:

- Review findings
- Updated spec.ts (only if improvements are needed)
- Estimated coverage before and after.


Phase 11 — Final Validation
Run
ng build

ng test --watch=false

ng test --watch=false --code-coverage

Verify
✅ Build successful
✅ All tests passing
✅ No compilation errors
✅ Stable test suite
✅ Good coverage

Phase 12 — Final Git History
chore: remove legacy unit tests

test: regenerate shared component specs

test: regenerate layout component specs

test: regenerate dashboard specs

test: regenerate catalog specs

test: regenerate checkout specs

test: improve coverage

test: stabilize regenerated unit tests


Complete Workflow
Create Branch
      │
      ▼
Backup
      │
      ▼
Delete Legacy Specs
      │
      ▼
Build Project
      │
      ▼
Generate Specs (Batch)
      │
      ▼
Run ng test
      │
      ▼
Pass?
 ┌────┴────┐
 │         │
Yes        No
 │         │
 ▼         ▼
Commit   Fix with AI
 │         │
 └─────────┘
      │
      ▼
Next Batch
      │
      ▼
All Modules Complete
      │
      ▼
Run Coverage
      │
      ▼
Improve Tests
      │
      ▼
Final Build
      │
      ▼
Portfolio Ready

Success Criteria
Your project is complete when:
✅ Every standalone component has a corresponding .spec.ts.
✅ ng build succeeds.
✅ ng test --watch=false passes with zero failures.
✅ Coverage is meaningful and focused on behavior, not just numbers.
✅ Production code remains unchanged unless a genuine defect is discovered.
✅ The entire test suite follows one consistent Angular 19 testing style.
This plan is well-suited to a portfolio project because it replaces inconsistent legacy tests with a unified, maintainable test suite while leveraging AI to accelerate the work