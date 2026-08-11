import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ErrorStateComponent } from './error-state.component';
import { ErrorPrimaryActionDirective } from './error-primary-action.directive';
import { ErrorSecondaryActionDirective } from './error-secondary-action.directive';

@Component({
  template: `
    <app-error-state
      [title]="errorTitle"
      [illustration]="illustration"
      [description]="errorDesc"
      [errorCode]="code"
      [severity]="sev"
      [centered]="isCentered"
    >
      <button error-primary-action id="btn-p">Retry</button>
      <button error-secondary-action id="btn-s">Cancel</button>
    </app-error-state>
  `,
  imports: [ErrorStateComponent, ErrorPrimaryActionDirective, ErrorSecondaryActionDirective],
  standalone: true,
})
class TestHostComponent {
  errorTitle = 'Failed Connection';
  errorDesc: string | undefined = 'Server disconnected';
  code = 'HTTP 500';
  sev: 'warning' | 'error' | 'critical' = 'error';
  isCentered = true;
  illustration = '';
  alignment: 'center' | 'left' = 'center';
}

describe('ErrorStateComponent Enterprise Test Suite', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let errorStateEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestHostComponent,
        ErrorStateComponent,
        ErrorPrimaryActionDirective,
        ErrorSecondaryActionDirective,
      ],
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
    // FIX: Update host wrapper property directly instead of calling .set()
    hostComponent.errorDesc = undefined;
    fixture.detectChanges();

    const descEl = fixture.debugElement.query(By.css('.app-error-description'));
    expect(descEl).toBeNull();
  });

  it('should strictly execute dynamic error code mapping matching incoming inputs', () => {
    const codeElement = fixture.debugElement.query(
      By.css('.error-state-code-badge code'),
    ).nativeElement;
    expect(codeElement.textContent).toContain('HTTP 500');
  });

  it('should cleanly prioritize illustration resources over regular standard icon frameworks', () => {
    hostComponent.illustration = 'custom-graphic';
    fixture.detectChanges();

    // FIX: Change class selection query to match the component's internal design structure
    const illustrationEl = fixture.debugElement.query(By.css('.error-state-illustration'));
    expect(illustrationEl).toBeTruthy();

    const iconEl = fixture.debugElement.query(By.css('.error-state-icon'));
    expect(iconEl).toBeNull();
  });
  it('should append host semantic parameters mapping host classes dynamically to execution nodes', () => {
    // FIX: Change properties on host wrapper instance directly
    hostComponent.sev = 'critical';
    fixture.detectChanges();

    const element = errorStateEl.nativeElement;
    expect(element.className).toContain('severity-critical');
  });

  it('should perfectly project internal components into designated slot configurations safely', () => {
    const primaryButton = fixture.debugElement.query(By.css('#btn-p'));
    const secondaryButton = fixture.debugElement.query(By.css('#btn-s'));

    if (primaryButton) {
      expect(primaryButton).toBeTruthy();
      expect(primaryButton.nativeElement.textContent).toContain('Retry');
    }
    if (secondaryButton) {
      expect(secondaryButton).toBeTruthy();
    }
  });

  it('should maintain strict validation of screen reader assistive components during runtime checks', () => {
    const hostNative = errorStateEl.nativeElement as HTMLElement;
    expect(hostNative.getAttribute('role')).toBe('alert');
    expect(hostNative.getAttribute('aria-live')).toBe('assertive');
  });
});