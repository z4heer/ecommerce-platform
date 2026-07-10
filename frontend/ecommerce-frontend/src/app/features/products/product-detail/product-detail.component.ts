import { Component, ChangeDetectionStrategy, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Product } from '../../../core/models/product.model';
import { ProductService } from '../services/product.service';
import { AppCardComponent } from '../../../shared/components/app-card/app-card.component';
import { PageContainerComponent } from '../../../layout/page-container/page-container.component';
import { PageHeaderComponent } from '../../../layout/page-header/page-header.component';
import { StatusChipComponent } from '../../../shared/components/status-chip/status-chip.component';
import { LoadingSkeletonComponent } from '../../../shared/components/loading-skeleton/loading-skeleton.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../../shared/components/error-state/error-state.component';
import { CartService } from '../../../features/cart/services/cart.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    PageContainerComponent,
    PageHeaderComponent,
    AppCardComponent,
    StatusChipComponent,
    LoadingSkeletonComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly notification = inject(NotificationService);
  public readonly product = signal<Product | null>(null);
  public readonly isLoading = signal<boolean>(false);
  public readonly error = signal<any | null>(null);

  readonly isInCart = computed(() => {
    const product = this.product();

    if (!product) {
      return false;
    }

    return this.cartService.isInCart(product.id);
  });

  readonly isOutOfStock = computed(() => {
    const product = this.product();
    return !product || product.stock_quantity === 0;
  });

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error.set({ message: 'Invalid product identifier.' });
      return;
    }


    this.isLoading.set(true);
    this.error.set(null);

    this.productService.getProductById(id).subscribe({
      next: product => {
        this.product.set(product);
        this.isLoading.set(false);
      },
      error: err => {
        console.error('Error fetching product metadata detail:', err);
        this.error.set(err);
        this.isLoading.set(false);
      },
    });
  }

  addToCart(): void {

    const product = this.product();

    if (!product) {
      return;
    }

    this.cartService.addToCart(product);

  }

  goToCart(): void {

    this.router.navigate(['/cart']);

  }
  public goBack(): void {
    this.router.navigate(['/products']);
  }

  public mapStatusType(status: string | undefined): 'success' | 'warning' | 'error' | 'neutral' {
    switch (status) {
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
