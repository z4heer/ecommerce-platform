import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  StatusChipComponent,
  StatusChipType,
  StatusChipAppearance,
  StatusChipSize,
} from './status-chip.component';

@Component({
  standalone: true,
  imports: [StatusChipComponent],
  template: `
    <app-status-chip
      [label]="label()"
      [status]="status()"
      [appearance]="appearance()"
      [size]="size()"
      [icon]="icon()"
      [clickable]="clickable()"
      [disabled]="disabled()"
      [ariaLabel]="ariaLabel()"
      (chipClick)="onClicked()"
    >
    </app-status-chip>
  `,
})
class TestHostComponent {
  readonly label = signal<string>('Test Label');
  readonly status = signal<StatusChipType>('neutral');
  readonly appearance = signal<StatusChipAppearance>('filled');
  readonly size = signal<StatusChipSize>('medium');
  readonly icon = signal<string | undefined>(undefined);
  readonly clickable = signal<boolean>(false);
  readonly disabled = signal<boolean>(false);
  readonly ariaLabel = signal<string | undefined>(undefined);

  clickEmittedCount = 0;
  onClicked() {
    this.clickEmittedCount++;
  }
}

describe('StatusChipComponent (Enterprise Test Suite)', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let chipDebugElement: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusChipComponent, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
    chipDebugElement = fixture.debugElement.query(By.directive(StatusChipComponent));
  });

  it('should initialize and display the specified label successfully', () => {
    expect(chipDebugElement).toBeTruthy();
    const labelSpan = chipDebugElement.query(By.css('.app-status-chip-label'));
    expect(labelSpan.nativeElement.textContent.trim()).toBe('Test Label');
  });

  it('should generate correct layout class configurations according to inputs', () => {
    hostComponent.status.set('success');
    hostComponent.appearance.set('outlined');
    hostComponent.size.set('large');
    fixture.detectChanges();

    const nativeElement = chipDebugElement.nativeElement;
    expect(nativeElement.classList).toContain('app-status-chip-success');
    expect(nativeElement.classList).toContain('app-status-chip-outlined');
    expect(nativeElement.classList).toContain('app-status-chip-large');
  });

  it('should conditionally hide or build structure for icons depending on values', () => {
    let iconElement = chipDebugElement.query(By.css('mat-icon'));
    expect(iconElement).toBeNull();

    hostComponent.icon.set('check_circle');
    fixture.detectChanges();

    iconElement = chipDebugElement.query(By.css('mat-icon'));
    expect(iconElement).toBeTruthy();
    expect(iconElement.nativeElement.textContent.trim()).toBe('check_circle');
  });

  it('should assign a valid role according to its interaction mode setup', () => {
    expect(chipDebugElement.nativeElement.getAttribute('role')).toBe('status');

    hostComponent.clickable.set(true);
    fixture.detectChanges();
    expect(chipDebugElement.nativeElement.getAttribute('role')).toBe('button');
  });

  it('should manage tab index configuration to comply with interactive guidelines', () => {
    expect(chipDebugElement.nativeElement.getAttribute('tabindex')).toBeNull();

    hostComponent.clickable.set(true);
    fixture.detectChanges();
    expect(chipDebugElement.nativeElement.getAttribute('tabindex')).toBe('0');

    hostComponent.disabled.set(true);
    fixture.detectChanges();
    expect(chipDebugElement.nativeElement.getAttribute('tabindex')).toBeNull();
  });

  it('should format or fall back context variables for aria labels gracefully', () => {
    expect(chipDebugElement.nativeElement.getAttribute('aria-label')).toBe(
      'Test Label (neutral status)',
    );

    hostComponent.ariaLabel.set('Custom Diagnostic Tooltip Content');
    fixture.detectChanges();
    expect(chipDebugElement.nativeElement.getAttribute('aria-label')).toBe(
      'Custom Diagnostic Tooltip Content',
    );
  });

  it('should fire event emissions upon structural mouse click activations', () => {
    hostComponent.clickable.set(true);
    fixture.detectChanges();

    chipDebugElement.nativeElement.click();
    expect(hostComponent.clickEmittedCount).toBe(1);
  });

  it('should catch space or enter keystrokes and execute event streams cleanly', () => {
    hostComponent.clickable.set(true);
    fixture.detectChanges();

    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    chipDebugElement.nativeElement.dispatchEvent(enterEvent);

    const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
    chipDebugElement.nativeElement.dispatchEvent(spaceEvent);

    expect(hostComponent.clickEmittedCount).toBe(2);
  });

  it('should guard and block event propagation loops when state changes to disabled', () => {
    hostComponent.clickable.set(true);
    hostComponent.disabled.set(true);
    fixture.detectChanges();

    chipDebugElement.nativeElement.click();

    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    chipDebugElement.nativeElement.dispatchEvent(enterEvent);

    expect(hostComponent.clickEmittedCount).toBe(0);
    expect(chipDebugElement.nativeElement.getAttribute('aria-disabled')).toBe('true');
  });
});
