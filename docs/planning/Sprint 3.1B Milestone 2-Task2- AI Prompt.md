Act as a Mid-Level Angular 19 Developer working under a Senior Angular Technical Lead.

You are responsible for IMPLEMENTATION ONLY.

Do NOT redesign architecture.
Do NOT refactor completed modules.
Do NOT modify routing.
Do NOT modify layout components.
Do NOT change folder structure.
Do NOT introduce technical debt.

=========================================================
PROJECT
=========================================================

Enterprise E-Commerce Platform

Technology Stack

- Angular 19
- Standalone Components
- Angular Material
- Signals
- Functional Guards
- Functional Interceptors
- Reactive Forms
- OnPush Change Detection
- Enterprise Folder Structure

=========================================================
CURRENT PROJECT STATUS
=========================================================

Completed

✓ Enterprise Folder Structure

✓ Authentication

✓ Login

✓ Register

✓ Logout

✓ Guards

✓ Interceptors

✓ Product Service

✓ Loading Service

✓ Logger Service

✓ Notification Service

✓ Main Layout

✓ Auth Layout

✓ Toolbar

✓ Footer

✓ Responsive Sidenav

✓ Layout Service

✓ Route Integration

✓ Enterprise PageContainer Component

DO NOT MODIFY ANY OF THESE.

=========================================================
SPRINT
=========================================================

Sprint 3.1B

Milestone 2

Enterprise Design System

=========================================================
TASK
=========================================================

Implement

PageHeaderComponent

ONLY

STOP AFTER COMPLETION.

=========================================================
LOCATION
=========================================================

Create

src/app/shared/ui/layout/page-header/

Files

page-header.component.ts

page-header.component.html

page-header.component.scss

page-header.component.spec.ts

=========================================================
OBJECTIVE
=========================================================

Create a reusable Enterprise Page Header component.

It will be reused by

- Dashboard

- Products

- Orders

- Cart

- Customers

- Reports

- Administration

The component must contain NO business logic.

=========================================================
RESPONSIBILITIES
=========================================================

Display

✓ Page Title

✓ Optional Subtitle

✓ Optional Divider

✓ Projected Action Buttons

Support future breadcrumb integration but DO NOT implement breadcrumbs.

=========================================================
COMPONENT API
=========================================================

Use Angular 19 signal inputs.

Use

input()

instead of

@Input()

Required Inputs

title

Optional Inputs

subtitle

showDivider (default true)

=========================================================
CONTENT PROJECTION
=========================================================

Support projected actions.

Example

<app-page-header
    [title]="'Products'"
    [subtitle]="'Manage products'">

    <button
        mat-flat-button
        color="primary"
        pageHeaderAction>

        Add Product

    </button>

</app-page-header>

Use

<ng-content select="[pageHeaderAction]">

=========================================================
HTML STRUCTURE
=========================================================

Use semantic HTML.

<header class="page-header">

    <div class="page-header__content">

        <div class="page-header__titles">

            <h1></h1>

            <p></p>

        </div>

        <div class="page-header__actions">

            <ng-content
                select="[pageHeaderAction]">

            </ng-content>

        </div>

    </div>

    Material Divider (optional)

</header>

=========================================================
ANGULAR MATERIAL
=========================================================

Import ONLY required modules.

Required

MatDividerModule

CommonModule

=========================================================
SCSS
=========================================================

Requirements

Responsive

Flexbox

Desktop

Tablet

Mobile

Theme ready

No inline styles

No fixed positioning

No hardcoded colors

Use BEM naming.

Examples

page-header

page-header__content

page-header__titles

page-header__actions

=========================================================
ACCESSIBILITY
=========================================================

Use semantic

<header>

Use

<h1>

Subtitle should be a paragraph.

Projected buttons must remain keyboard accessible.

=========================================================
PERFORMANCE
=========================================================

Standalone Component

OnPush Change Detection

Strong Typing

No any

No services

No HTTP

No RxJS subscriptions

=========================================================
UNIT TESTS
=========================================================

Create tests for

✓ Component creation

✓ Title rendering

✓ Subtitle rendering

✓ Subtitle hidden when not supplied

✓ Divider visible

✓ Divider hidden

✓ Content projection

=========================================================
TEMPORARY INTEGRATION
=========================================================

Temporarily integrate into Dashboard page ONLY.

Example

<app-page-container>

    <app-page-header
        [title]="'Dashboard'"
        [subtitle]="'Enterprise Overview'">

        <button
            mat-flat-button
            color="primary"
            pageHeaderAction>

            Refresh

        </button>

    </app-page-header>

</app-page-container>

Perform smoke testing.

=========================================================
TESTING
=========================================================

Verify

✓ Build passes

✓ Lint passes

✓ Unit tests pass

✓ Responsive layout

✓ No console errors

✓ Dashboard renders correctly

=========================================================
DO NOT
=========================================================

Do NOT modify

Toolbar

Footer

MainLayout

AuthLayout

LayoutService

Routing

Guards

Interceptors

Authentication

Product Service

Notification Service

=========================================================
DELIVERABLES
=========================================================

Submit

1. Architecture Summary

2. Files Created

3. Files Modified

4. Complete Production Ready Code

5. Unit Test Results

6. Build Result

7. Lint Result

8. Manual Testing Steps

9. Accessibility Review

10. Performance Review

11. Git Commit

12. Pull Request Checklist

=========================================================
GIT
=========================================================

Suggested Commit

git add .

git commit -m "feat(ui): add reusable enterprise page header"

=========================================================
STOP
=========================================================

After completing ONLY PageHeaderComponent

STOP.

Do NOT implement

PageActions

StatusChip

AppCard

SearchToolbar

LoadingSkeleton

EmptyState

ErrorState

ConfirmationDialog

Wait for Technical Lead review before proceeding.