Understood. Based on the constraints from the Technical Lead, this task is well scoped.

Since you asked for **implementation only**, below is exactly what should be implemented.

---

# 1. Architecture Summary

**Component**

```
PageHeaderComponent
```

Purpose:

* Reusable enterprise page header
* No business logic
* Pure presentation component
* Signal inputs
* Content projection for action buttons
* Future-ready for breadcrumb integration
* Standalone
* OnPush

---

# 2. Files Created

```
src/app/shared/ui/layout/page-header/

│── page-header.component.ts
│── page-header.component.html
│── page-header.component.scss
└── page-header.component.spec.ts
```

---

# 3. Files Modified

Temporary integration only

```
src/app/features/dashboard/dashboard.component.ts

src/app/features/dashboard/dashboard.component.html
```

No other files.

---

# 4. Production Ready Code

---

## page-header.component.ts

```ts
import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
  ],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent {
  readonly title = input.required<string>();

  readonly subtitle = input<string>();

  readonly showDivider = input(true);
}
```

---

## page-header.component.html

```html
<header class="page-header">

  <div class="page-header__content">

    <div class="page-header__titles">

      <h1 class="page-header__title">
        {{ title() }}
      </h1>

      @if (subtitle()) {
        <p class="page-header__subtitle">
          {{ subtitle() }}
        </p>
      }

    </div>

    <div class="page-header__actions">

      <ng-content
        select="[pageHeaderAction]">
      </ng-content>

    </div>

  </div>

  @if (showDivider()) {
    <mat-divider></mat-divider>
  }

</header>
```

---

## page-header.component.scss

```scss
.page-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    flex-wrap: wrap;
  }

  &__titles {
    display: flex;
    flex-direction: column;
    gap: .25rem;
    min-width: 0;
    flex: 1;
  }

  &__title {
    margin: 0;
    font: inherit;
    font-size: 2rem;
    font-weight: 600;
    line-height: 1.2;
  }

  &__subtitle {
    margin: 0;
    opacity: .75;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: .75rem;
    flex-wrap: wrap;
  }
}

@media (max-width: 960px) {

  .page-header {

    &__content {
      flex-direction: column;
      align-items: stretch;
    }

    &__actions {
      width: 100%;
      justify-content: flex-start;
    }
  }

}

@media (max-width: 600px) {

  .page-header {

    &__title {
      font-size: 1.5rem;
    }

    &__actions {
      width: 100%;
    }
  }

}
```

---

## page-header.component.spec.ts

```ts
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatDividerModule } from '@angular/material/divider';
import { PageHeaderComponent } from './page-header.component';

@Component({
  standalone: true,
  imports: [PageHeaderComponent],
  template: `
    <app-page-header
      [title]="title"
      [subtitle]="subtitle"
      [showDivider]="showDivider">

      <button pageHeaderAction>
        Action
      </button>

    </app-page-header>
  `,
})
class TestHostComponent {
  title = 'Dashboard';
  subtitle?: string = 'Enterprise Overview';
  showDivider = true;
}

describe('PageHeaderComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestHostComponent,
        MatDividerModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  it('should render title', () => {
    expect(
      fixture.nativeElement.querySelector('h1').textContent
    ).toContain('Dashboard');
  });

  it('should render subtitle', () => {
    expect(
      fixture.nativeElement.querySelector('p').textContent
    ).toContain('Enterprise Overview');
  });

  it('should hide subtitle', () => {
    fixture.componentInstance.subtitle = undefined;
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('p')
    ).toBeNull();
  });

  it('should show divider', () => {
    expect(
      fixture.debugElement.query(By.css('mat-divider'))
    ).toBeTruthy();
  });

  it('should hide divider', () => {
    fixture.componentInstance.showDivider = false;
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('mat-divider'))
    ).toBeNull();
  });

  it('should project actions', () => {
    expect(
      fixture.nativeElement.querySelector('button').textContent
    ).toContain('Action');
  });
});
```

---

# Temporary Dashboard Integration

## dashboard.component.ts

```ts
import { PageHeaderComponent } from
'@shared/ui/layout/page-header/page-header.component';
```

Add to imports:

```ts
imports: [
  ...
  PageHeaderComponent
]
```

---

## dashboard.component.html

Immediately inside the page container:

```html
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

  <!-- existing dashboard content -->

</app-page-container>
```

---

# 5. Unit Test Results

Expected:

```
✓ should create

✓ renders title

✓ renders subtitle

✓ hides subtitle

✓ divider visible

✓ divider hidden

✓ projects actions

7/7 PASS
```

---

# 6. Build Result

Expected

```
ng build

✔ Build successful
```

---

# 7. Lint Result

Expected

```
ng lint

✔ No lint errors
```

---

# 8. Manual Testing Steps

* Navigate to Dashboard.
* Verify the page title displays as "Dashboard".
* Verify the subtitle displays as "Enterprise Overview".
* Verify the divider is visible by default.
* Verify the "Refresh" button appears in the actions area.
* Resize the browser to tablet width and confirm the actions wrap beneath the title.
* Resize to mobile width and ensure the layout stacks vertically.
* Check the browser console for any errors.
* Confirm the component integrates cleanly within the existing `PageContainer`.

---

# 9. Accessibility Review

* Uses semantic `<header>`.
* Uses a single `<h1>` for the page title.
* Subtitle is rendered in a `<p>` element.
* Projected action buttons remain fully keyboard accessible.
* No custom keyboard handling is introduced.

---

# 10. Performance Review

* Standalone component.
* `ChangeDetectionStrategy.OnPush`.
* Uses Angular 19 signal `input()` API.
* No services injected.
* No HTTP requests.
* No RxJS subscriptions.
* No business logic.
* Minimal Angular Material dependency (`MatDividerModule` only).

---

# 11. Git Commit

```bash
git add .

git commit -m "feat(ui): add reusable enterprise page header"
```

---

# 12. Pull Request Checklist

* [ ] Component is standalone.
* [ ] Uses Angular 19 signal inputs.
* [ ] Uses `OnPush` change detection.
* [ ] No business logic added.
* [ ] No routing changes.
* [ ] No layout component modifications.
* [ ] No service dependencies.
* [ ] Unit tests added and passing.
* [ ] Responsive layout verified.
* [ ] Accessibility reviewed.
* [ ] Dashboard smoke test completed.
* [ ] Build and lint successful.

**Implementation complete. Stopping here as requested, awaiting Technical Lead review before proceeding to the next design system component.**
