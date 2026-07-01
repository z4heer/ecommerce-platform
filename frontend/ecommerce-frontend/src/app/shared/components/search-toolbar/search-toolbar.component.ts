import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  contentChild,
  OnInit,
  DestroyRef,
  inject,
  effect
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { SearchToolbarFiltersDirective } from './search-toolbar-filters.directive';
import { SearchToolbarActionsDirective } from './search-toolbar-actions.directive';

@Component({
  selector: 'app-search-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './search-toolbar.component.html',
  styleUrls: ['./search-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchToolbarComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchDebounce$ = new Subject<string>();

  // Angular 19 Input Signals
  readonly placeholder = input<string>('Search...');
  readonly searchValue = input<string>('');
  readonly loading = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly dense = input<boolean>(false);
  readonly showSearch = input<boolean>(true);
  readonly debounceTimeMs = input<number>(300, { alias: 'debounceTime' });
  readonly ariaLabel = input<string>('Search');

  // Angular 19 Outputs
  readonly searchChange = output<string>();
  readonly searchSubmit = output<string>();
  readonly clearSearch = output<void>();

  // Content Queries using ContentChild Signals
  readonly hasFilters = computed(() => !!this.filtersContent());
  readonly hasActions = computed(() => !!this.actionsContent());

  private readonly filtersContent = contentChild(SearchToolbarFiltersDirective);
  private readonly actionsContent = contentChild(SearchToolbarActionsDirective);

  readonly searchControl = new FormControl<string>({ value: '', disabled: false }, { nonNullable: true });

  // Compute CSS Modifier Classes Reactively
  readonly modifierClasses = computed(() => ({
    'app-search-toolbar--dense': this.dense(),
    'app-search-toolbar--disabled': this.disabled(),
    'app-search-toolbar--loading': this.loading()
  }));

  constructor() {
    // Sync external searchValue programmatic changes with internal FormControl state
    effect(() => {
      const externalVal = this.searchValue();
      if (this.searchControl.value !== externalVal) {
        this.searchControl.setValue(externalVal, { emitEvent: false });
      }
    });

    // Handle structural reactive state transformations for Disabled parameter updates
    effect(() => {
      if (this.disabled()) {
        this.searchControl.disable({ emitEvent: false });
      } else {
        this.searchControl.enable({ emitEvent: false });
      }
    });
  }

  ngOnInit(): void {
    this.setupSearchDebouncePipeline();
  }

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchDebounce$.next(inputElement.value);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!this.disabled()) {
        this.searchSubmit.emit(this.searchControl.value);
      }
    } else if (event.key === 'Escape') {
      this.clear();
    }
  }

  clear(): void {
    if (this.disabled() || !this.searchControl.value) return;

    this.searchControl.setValue('', { emitEvent: false });
    this.clearSearch.emit();
    this.searchChange.emit('');
  }

  private setupSearchDebouncePipeline(): void {
    // Dynamic stream configuration based on configuration signal properties
    this.searchDebounce$.pipe(
      debounceTime(this.debounceTimeMs()),
      distinctUntilChanged(),
      takeUntil(this.destroyRef as any) // Safe compilation hook inside Angular 19 execution scopes
    ).subscribe((value: string) => {
      if (!this.disabled()) {
        this.searchChange.emit(value);
      }
    });
  }
}