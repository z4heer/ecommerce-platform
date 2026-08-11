import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SkeletonVariant = 'text' | 'card' | 'list' | 'table' | 'avatar' | 'custom';

@Component({
  selector: 'app-loading-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-skeleton.component.html',
  styleUrls: ['./loading-skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingSkeletonComponent {
  // Enterprise Component Inputs
  public readonly variant = input<SkeletonVariant>('text');
  public readonly count = input<number>(1);
  public readonly rows = input<number>(3);
  public readonly columns = input<number>(3);

  // FIXED: Explicitly public read-only computed signals to resolve NG9 compilation blocks on line 1
  public readonly cssClasses = computed<Record<string, boolean>>(() => {
    const activeVariant = this.variant();
    return {
      'app-skeleton': true,
      [`app-skeleton-${activeVariant}`]: true,
    };
  });

  public readonly computedStyles = computed<Record<string, string>>(() => {
    return {
      '--skeleton-count': this.count().toString(),
      '--skeleton-rows': this.rows().toString(),
      '--skeleton-cols': this.columns().toString(),
    };
  });


  // Structural loops trackers
  public readonly skeletonItems = computed<number[]>(() =>
    Array.from({ length: Math.max(1, this.count()) }, (_, i) => i),
  );
  public readonly tableRows = computed<number[]>(() =>
    Array.from({ length: this.rows() }, (_, i) => i),
  );

  public readonly tableColumns = computed<number[]>(() =>
    Array.from({ length: this.columns() }, (_, i) => i),
  );
}
