import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product, ProductStatus } from '../../../core/models/product.model';

// Layout Components
import { PageContainerComponent } from '../../../layout/page-container/page-container.component';
import { PageHeaderComponent } from '../../../layout/page-header/page-header.component';

// Shared Components
import { AppCardComponent } from '../../../shared/components/app-card/app-card.component';
import { SearchToolbarComponent } from '../../../shared/components/search-toolbar/search-toolbar.component';
import { StatusChipComponent } from '../../../shared/components/status-chip/status-chip.component';
import { LoadingSkeletonComponent } from '../../../shared/components/loading-skeleton/loading-skeleton.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../../shared/components/error-state/error-state.component';
import { ProductCategoryFilterComponent } from '../product-category-filter/product-category-filter.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../cart/services/cart.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    PageContainerComponent,
    PageHeaderComponent,
    AppCardComponent,
    SearchToolbarComponent,
    ProductCategoryFilterComponent,
    StatusChipComponent,
    LoadingSkeletonComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);

  // Core State Signals
  public readonly productsQuery = this.productService.productsQuery;
  public readonly searchTerm = signal<string>('');
  public readonly selectedCategory = signal<string>('All');

  // Look how simple your component's computed signals become:
  public readonly isLoading = computed(() => this.productsQuery().loading);
  public readonly error = computed(() => this.productsQuery().error);
  private readonly cartService = inject(CartService);
  private readonly notificationService = inject(NotificationService);

  public readonly filteredProducts = computed(() => {
    const data = this.productsQuery().data;
    return data.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm().toLowerCase());
      const matchesCategory =
        this.selectedCategory() === 'All' || product.category === this.selectedCategory();
      return matchesSearch && matchesCategory;
    });
  }); // Category compilation loop with fallback array check
  public readonly categories = computed(() => {
    const queryResult = this.productsQuery();
    const rawData =
      queryResult && typeof queryResult === 'object' && 'data' in queryResult
        ? (queryResult as any).data
        : queryResult;

    if (!Array.isArray(rawData)) return ['All'];
    const uniqueCategories = Array.from(
      new Set(rawData.map((p: Product) => p.category).filter(Boolean)),
    );
    return ['All', ...uniqueCategories];
  });
  public ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: data => {
        // Signals are automatically handled inside the service's tap operator!
        console.log('Catalog successfully loaded:', data);
      },
      error: err => {
        console.error('Catalog fetch stream failed:', err);
      },
    });
  }
  public onSearch(term: string): void {
    this.searchTerm.set(term || '');
  }

  public onCategorySelect(category: string): void {
    this.selectedCategory.set(category);
  }

  public onAddToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  public navigateToDetail(productId: string): void {
    if (productId) {
      this.router.navigate(['/products', productId]);
    }
  }

  public mapStatusType(status: string | undefined): 'success' | 'warning' | 'error' | 'neutral' {
    switch (status as ProductStatus) {
      case 'In Stock':
        return 'success';
      case 'Low Stock':
        return 'warning';
      case 'Out of Stock':
        return 'error';
      default:
        return 'neutral';
    }
  }

  public resolveStatusLabel(status: string | undefined): string {
    if (!status || status.trim().toLowerCase() === 'unknown') {
      return 'Not Available';
    }
    return status;
  }

  public resolveText(value: string | undefined, fallback = 'Not Available'): string {
    return value && value.trim() ? value : fallback;
  }

  public resolveNumeric(value: number | undefined, fallback = 'N/A'): string {
    return value !== undefined && value !== null ? `${value}` : fallback;
  }
}
