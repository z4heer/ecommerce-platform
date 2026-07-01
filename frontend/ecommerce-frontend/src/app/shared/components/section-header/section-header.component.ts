import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
  contentChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { SectionActionsDirective } from './section-actions.directive';
import { SectionMetaDirective } from './section-meta.directive';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule, MatDividerModule],
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'app-section-header',
    '[class.app-section-header--dense]': 'dense()',
    '[attr.aria-label]': 'ariaLabel() || null',
    'role': 'region'
  }
})
export class SectionHeaderComponent {
  // Required core inputs
  readonly title = input.required<string>();
  readonly subtitle = input<string>();

  // Design system variations
  readonly dense = input<boolean>(false);
  readonly showDivider = input<boolean>(false);
  readonly align = input<'start' | 'center' | 'space-between'>('space-between');
  readonly ariaLabel = input<string>();

  // Content queries using modern Angular Signals ContentChild
  readonly hasActions = contentChild(SectionActionsDirective);
  readonly hasMeta = contentChild(SectionMetaDirective);

  // Computed layout variant modifiers
  readonly layoutClass = computed(() => `app-section-header__container--align-${this.align()}`);
}