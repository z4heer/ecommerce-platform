import { ChangeDetectionStrategy, Component, computed, contentChild, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EmptyActionsDirective } from './empty-actions.directive';

export type EmptyStateSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': '"status"',
    '[attr.aria-label]': 'ariaLabel() || title()',
    '[class]': 'hostClasses()'
  }
})
export class EmptyStateComponent {
  // Inputs using Angular 19 Signal API
  readonly title = input.required<string>();
  readonly description = input<string>();
  readonly icon = input<string>();
  readonly illustration = input<string>();
  readonly size = input<EmptyStateSize>('medium');
  readonly centered = input<boolean>(true);
  readonly ariaLabel = input<string>();

  // Content query for projected actions
  readonly hasActions = contentChild(EmptyActionsDirective);

  // Computed state rules
  readonly showIllustration = computed(() => !!this.illustration());
  readonly showIcon = computed(() => !this.illustration() && !!this.icon());

  // Host CSS classes resolution
  readonly hostClasses = computed(() => {
    return [
      'app-empty-state',
      `app-empty-state--${this.size()}`,
      this.centered() ? 'app-empty-state--centered' : 'app-empty-state--left-aligned'
    ].join(' ');
  });
}