import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ErrorStateComponent } from './error-state.component';
import { ErrorPrimaryActionDirective } from './error-primary-action.directive';
import { ErrorSecondaryActionDirective } from './error-secondary-action.directive';

@Component({
  template: `
    <app-error-state [title]="errorTitle" [description]="errorDesc" [errorCode]="code" [severity]="sev" [centered]="isCentered">
      <button error-primary-action id="btn-p">Retry</button>
      <button error-secondary-action id="btn-s">Cancel</button>
    </app-error-state>
  `,
  imports: [ErrorStateComponent, ErrorPrimaryActionDirective, ErrorSecondaryActionDirective],
  standalone: true
})
class TestHostComponent {
  errorTitle = 'Failed Connection';
  errorDesc = 'Server disconnected';
  code = 'HTTP 500';
  sev: 'warning' | 'error' | 'critical' = 'error';
  isCentered = true;
}

describe('ErrorStateComponent Enterprise Test Suite', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let errorStateEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, ErrorStateComponent, ErrorPrimaryActionDirective, ErrorSecondaryActionDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
    errorStateEl = fixture.debugElement.query(By.directive(ErrorStateComponent));
  });

  it('should compile and create components inside host execution runtime', () => {
    expect(errorStateEl).toBeTruthy();
  });

  it('should explicitly render mandatory dynamic titles within H2 element boundaries', () => {
    const h2 = fixture.debugElement.query(By.css('.error-state-title')).nativeElement;
    expect(h2.textContent).toContain('Failed Connection');
  });

  it('should suppress description rendering structures when string parameter is undefined', () => {
    fixture.componentRef.setInput('errorDesc', undefined);
    fixture.detectChanges();
    const desc = fixture.debugElement.query(By.css('.error-state-description'));
    expect(desc).toBeNull();
  });

  it('should strictly execute dynamic error code mapping matching incoming inputs', () => {
    const codeElement = fixture.debugElement.query(By.css('.error-state-code-badge code')).nativeElement;
    expect(codeElement.textContent).toContain('HTTP 500');
  });

  it('should cleanly prioritize illustration resources over regular standard icon frameworks', () => {
    const componentInstance = errorStateEl.componentInstance as ErrorStateComponent;
    fixture.componentRef.setInput('illustration', 'assets/vectors/fail.svg');
    fixture.detectChanges();

    expect(componentInstance.showIllustration()).toBeTrue();
    expect(componentInstance.showIcon()).toBeFalse();

    const img = fixture.debugElement.query(By.css('.error-state-illustration'));
    const icon = fixture.debugElement.query(By.css('.error-state-icon'));
    expect(img).toBeTruthy();
    expect(icon).toBeNull();
  });

  it('should append host semantic parameters mapping host classes dynamically to execution nodes', () => {
    const hostNative = errorStateEl.nativeElement as HTMLElement;
    expect(hostNative.classList).toContain('severity-error');
    expect(hostNative.classList).toContain('app-error-state-centered');

    fixture.componentRef.setInput('sev', 'critical');
    fixture.componentRef.setInput('isCentered', false);
    fixture.detectChanges();

    expect(hostNative.classList).toContain('severity-critical');
    expect(hostNative.classList).toContain('app-error-state-left');
  });

  it('should perfectly project internal components into designated slot configurations safely', () => {
    const primaryButton = fixture.debugElement.query(By.css('#btn-p')).nativeElement as HTMLButtonElement;
    const secondaryButton = fixture.debugElement.query(By.css('#btn-s')).nativeElement as HTMLButtonElement;

    expect(primaryButton).toBeTruthy();
    expect(secondaryButton).toBeTruthy();
    expect(primaryButton.textContent).toContain('Retry');
  });

  it('should maintain strict validation of screen reader assistive components during runtime checks', () => {
    const hostNative = errorStateEl.nativeElement as HTMLElement;
    expect(hostNative.getAttribute('role')).toBe('alert');
    expect(hostNative.getAttribute('aria-live')).toBe('assertive');
  });
});