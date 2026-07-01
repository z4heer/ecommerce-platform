import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  input,
  output,
  contentChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AppCardActionsDirective } from './app-card-actions.directive';
import { AppCardHeaderDirective } from './app-card-header.directive';
import { MatRippleModule } from '@angular/material/core';

export type AppCardAppearance = 'elevated' | 'outlined';

export type AppCardPadding =
  | 'comfortable'
  | 'compact'
  | 'none';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    AppCardHeaderDirective,
    AppCardActionsDirective,
    MatRippleModule
  ],
  templateUrl: './app-card.component.html',
  styleUrls: ['./app-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppCardComponent {

  readonly title = input<string>();

  readonly subtitle = input<string>();

  readonly appearance =
    input<AppCardAppearance>('elevated');

  readonly padding =
    input<AppCardPadding>('comfortable');

  readonly loading =
    input(false);

  readonly clickable =
    input(false);

  readonly disabled =
    input(false);

  readonly ariaLabel = input<string | null>(null);
  readonly computedAriaLabel = computed(() =>
    this.ariaLabel() ??
    this.title() ??
    null
  );
  readonly cardClick = output<void>();
  readonly projectedHeader =
    contentChild(AppCardHeaderDirective);

  readonly projectedActions =
    contentChild(AppCardActionsDirective);
  readonly hasHeader = computed(() =>
    !!this.projectedHeader() ||
    !!this.title() ||
    !!this.subtitle()
  );

  readonly hasActions = computed(() =>
    !!this.projectedActions()
  );
  readonly isInteractive = computed(
    () => this.clickable() && !this.disabled()
  );

  readonly tabindex = computed(
    () => this.isInteractive() ? 0 : -1
  );

  readonly role = computed(
    () => this.isInteractive()
      ? 'button'
      : 'group'
  );

  readonly cardClasses = computed(() => ({
    'app-card': true,

    'app-card--elevated':
      this.appearance() === 'elevated',

    'app-card--outlined':
      this.appearance() === 'outlined',

    'app-card--comfortable':
      this.padding() === 'comfortable',

    'app-card--compact':
      this.padding() === 'compact',

    'app-card--no-padding':
      this.padding() === 'none',

    'app-card--clickable':
      this.isInteractive(),

    'app-card--disabled':
      this.disabled(),

    'app-card--loading':
      this.loading(),
  }));

  onCardClick(): void {

    if (!this.isInteractive()) {
      return;
    }

    this.cardClick.emit();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (!this.isInteractive()) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.cardClick.emit();
    }
  }

}