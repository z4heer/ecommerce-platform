import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
  contentChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ErrorPrimaryActionDirective } from './error-primary-action.directive';
import { ErrorSecondaryActionDirective } from './error-secondary-action.directive';

export type ErrorSeverity = 'warning' | 'error' | 'critical';

@Component({
  selector: 'app-error-state',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './error-state.component.html',
  styleUrls: ['./error-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'alert',
    'aria-live': 'assertive',
    '[attr.aria-label]': 'ariaLabel() || title()',
    '[class.app-error-state-centered]': 'centered()',
    '[class.app-error-state-left]': '!centered()',
    '[class.severity-warning]': 'severity() === "warning"',
    '[class.severity-error]': 'severity() === "error"',
    '[class.severity-critical]': 'severity() === "critical"'
  }
})
export class ErrorStateComponent {
  // Required Inputs
  readonly title = input.required<string>();

  // Optional Inputs
  readonly description = input<string>();
  readonly errorCode = input<string>();
  readonly icon = input<string>();
  readonly illustration = input<string>();
  readonly severity = input<ErrorSeverity>('error');
  readonly centered = input<boolean>(true);
  readonly ariaLabel = input<string>();

  // Content Queries using Angular Signals ContentChild
  readonly hasPrimaryAction = contentChild(ErrorPrimaryActionDirective);
  readonly hasSecondaryAction = contentChild(ErrorSecondaryActionDirective);

  // Computed Layout Logic
  readonly showIllustration = computed(() => !!this.illustration());
  readonly showIcon = computed(() => !this.illustration() && !!this.icon());

  readonly fallbackIcon = computed(() => {
    if (this.icon()) return this.icon();
    switch (this.severity()) {
      case 'warning': return 'warning';
      case 'critical': return 'gpp_maybe';
      case 'error':
      default:
        return 'error_outline';
    }
  });

  readonly hasActions = computed(() => !!this.hasPrimaryAction() || !!this.hasSecondaryAction());
}