// src/app/shared/components/loading-skeleton/loading-skeleton.component.ts
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type SkeletonVariant = 'text' | 'card' | 'list' | 'table' | 'avatar' | 'custom';

@Component({
  selector: 'app-loading-skeleton',
  standalone: true,
  templateUrl: './loading-skeleton.component.html',
  styleUrls: ['./loading-skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'status',
    'aria-live': 'polite',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-busy]': '"true"',
    '[class.app-skeleton-dense]': 'dense()',
    '[class.app-skeleton-full-width]': 'fullWidth()'
  }
})
export class LoadingSkeletonComponent {
  // Public Signal Inputs
  readonly variant = input<SkeletonVariant>('text');
  readonly count = input<number, unknown>(1, {
    transform: (value: unknown) => {
      const parsed = Number(value);
      return isNaN(parsed) || parsed < 1 ? 1 : parsed;
    }
  });
  readonly animated = input<boolean, unknown>(true, {
    transform: (value: unknown) => String(value) === 'true' || value === true
  });
  readonly dense = input<boolean, unknown>(false, {
    transform: (value: unknown) => String(value) === 'true' || value === true
  });
  readonly fullWidth = input<boolean, unknown>(true, {
    transform: (value: unknown) => String(value) === 'true' || value === true
  });
  readonly width = input<string>();
  readonly height = input<string>();
  readonly ariaLabel = input<string>('Loading content');

  // Computed Structures for DOM Generation
  readonly skeletonItems = computed<number[]>(() => {
    const total = this.count();
    return Array.from({ length: total }, (_, i) => i);
  });

  readonly tableRows = computed<number[]>(() => {
    // Dense layouts use a standard set of rows per instance block
    return Array.from({ length: this.dense() ? 3 : 5 }, (_, i) => i);
  });

  readonly tableColumns = computed<number[]>(() => {
    return Array.from({ length: 4 }, (_, i) => i);
  });

  // Structural Class Computations
  readonly cssClasses = computed(() => {
    return {
      [`app-skeleton-${this.variant()}`]: true,
      'app-skeleton-animated': this.animated()
    };
  });

  // Custom Sizing Allocations
  readonly computedStyles = computed(() => {
    const styles: Record<string, string> = {};
    const w = this.width();
    const h = this.height();

    if (this.variant() === 'custom') {
      if (w) styles['width'] = w;
      if (h) styles['height'] = h;
    }
    return styles;
  });
}