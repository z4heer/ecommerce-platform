import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EmptyStateComponent } from './empty-state.component';
import { EmptyActionsDirective } from './empty-actions.directive';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  standalone: true,
  imports: [EmptyStateComponent, EmptyActionsDirective],
  template: `
    <app-empty-state title="Test Title" description="Test Description">
      <div empty-actions><button id="action-btn">Action</button></div>
    </app-empty-state>
  `,
})
class TestHostComponent { }

describe('EmptyStateComponent', () => {
  let component: EmptyStateComponent;
  let fixture: ComponentFixture<EmptyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyStateComponent, TestHostComponent, MatDialogModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyStateComponent);
    component = fixture.componentInstance;
  });

  it('should initialize successfully', () => {
    expect(component).toBeTruthy();
  });

  it('should enforce fallback accessibility tokens when ariaLabel is absent', async () => {
    fixture.componentRef.setInput('title', 'No Data Available');
    fixture.detectChanges();

    const hostEl = fixture.nativeElement;
    expect(hostEl.getAttribute('role')).toBe('status');
    expect(hostEl.getAttribute('aria-label')).toBe('No Data Available');
  });

  it('should use explicit ariaLabel overrides over standard titles', async () => {
    fixture.componentRef.setInput('title', 'No Data Available');
    fixture.componentRef.setInput('ariaLabel', 'Custom Accessibility Statement');
    fixture.detectChanges();

    expect(fixture.nativeElement.getAttribute('aria-label')).toBe('Custom Accessibility Statement');
  });

  it('should isolate visual hierarchy priority by letting illustrations override icons', async () => {
    fixture.componentRef.setInput('title', 'Rendering Rule Test');
    fixture.componentRef.setInput('icon', 'cached_icon');
    fixture.componentRef.setInput('illustration', 'assets/vectors/empty.svg');
    fixture.detectChanges();

    expect(component.showIllustration()).toBeTrue();
    expect(component.showIcon()).toBeFalse();

    const imgNode = fixture.debugElement.query(By.css('.app-empty-state__illustration'));
    const iconNode = fixture.debugElement.query(By.css('.app-empty-state__icon'));

    expect(imgNode).toBeTruthy();
    expect(iconNode).toBeNull();
  });

  it('should cleanly render size classes without generating broken wrapper markup', () => {
    fixture.componentRef.setInput('title', 'Size Test');
    fixture.componentRef.setInput('size', 'large');
    fixture.detectChanges();

    const hostEl = fixture.nativeElement;
    expect(hostEl.classList.contains('app-empty-state--large')).toBeTrue();
  });

  it('should verify content projection tracking using a mock host wrapper context', () => {
    const hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();

    const actionContainer = hostFixture.debugElement.query(By.css('.app-empty-state__actions'));
    const projectedButton = hostFixture.debugElement.query(By.css('#action-btn'));

    expect(actionContainer).toBeTruthy();
    expect(projectedButton).toBeTruthy();
  });
});
