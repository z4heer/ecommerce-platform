import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  HostListener
} from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

export type StatusChipType = 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type StatusChipAppearance = 'filled' | 'outlined';
export type StatusChipSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-status-chip',
  standalone: true,
  imports: [MatIconModule, MatRippleModule],
  templateUrl: './status-chip.component.html',
  styleUrls: ['./status-chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'role()',
    '[attr.tabindex]': 'tabindex()',
    '[attr.aria-label]': 'computedAriaLabel()',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '[class]': 'cssClasses()',
    '[class.app-status-chip-disabled]': 'disabled()',
    '[class.app-status-chip-clickable]': 'isInteractive()',
    '[matRippleDisabled]': '!isInteractive()',
    '(click)': 'onChipClick($event)'
  }
})
export class StatusChipComponent {
  // Public Inputs
  readonly label = input.required<string>();
  readonly status = input<StatusChipType>('neutral');
  readonly appearance = input<StatusChipAppearance>('filled');
  readonly size = input<StatusChipSize>('medium');
  readonly icon = input<string | undefined>(undefined);
  readonly clickable = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly ariaLabel = input<string | undefined>(undefined);

  // Public Output
  readonly chipClick = output<void>();

  // Computed Signals
  readonly isInteractive = computed(() => this.clickable() && !this.disabled());
  readonly role = computed(() => this.clickable() ? 'button' : 'status');
  readonly tabindex = computed(() => this.isInteractive() ? '0' : null);

  readonly computedAriaLabel = computed(() => {
    const customizedLabel = this.ariaLabel();
    if (customizedLabel) return customizedLabel;
    return `${this.label()} (${this.status()} status)`;
  });

  readonly cssClasses = computed(() => {
    return `app-status-chip app-status-chip-${this.appearance()} app-status-chip-${this.status()} app-status-chip-${this.size()}`;
  });

  // Keyboard Event Management
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (!this.isInteractive()) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.chipClick.emit();
    }
  }

  // Click Trigger handling
  onChipClick(event: MouseEvent): void {
    if (!this.isInteractive()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.chipClick.emit();
  }
}