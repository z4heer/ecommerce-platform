import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardService, SystemOrder } from './service/dashboard.service';

// Corrected Feature Domain Service Imports based on Workspace Tree
import { ProductService } from '../products/services/product.service';
import { CartService } from '../cart/services/cart.service';
import { OrderService } from '../orders/services/order.service';

// Enterprise Design System Layout & Shared Component Imports
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

export type StatusChipType = 'success' | 'warning' | 'error' | 'info' | 'neutral';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly dialog = inject(MatDialog);
  protected readonly dashboardService = inject(DashboardService);

  // Inject Feature Module Domain Services
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);

  // Read-Only Template State Signals from Local Infrastructure
  public readonly recentOrders = this.dashboardService.recentOrders;
  public readonly isLoading = this.dashboardService.isLoading;
  public readonly error = this.dashboardService.error;
  public readonly searchQuery = this.dashboardService.searchQuery;

  // Real-time Integrated Cross-Module Metrics via Angular Signals
  public readonly totalProductsCount = computed<number>(() => this.productService.products().length);
  public readonly cartItemsCount = computed<number>(() => this.cartService.cartItems().length);
  public readonly myOrdersCount = toSignal(
    this.orderService.getMyOrders().pipe(
      map(orders => orders.length)
    ),
    { initialValue: 0 }
  );
  // Computed Signal calculating price * quantity aggregates
  public readonly currentCartTotal = computed<number>(() => {
    return this.cartService.cartItems().reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
  });

  public onSearch(query: string): void {
    this.dashboardService.updateSearchQuery(query || '');
  }

  protected mapStatusToChipType(status: SystemOrder['status']): StatusChipType {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'neutral';
    }
  }

  public onCancelOrder(orderId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Cancel Order',
        message: `Are you sure you want to cancel order ${orderId}? This action cannot be undone.`,
        confirmLabel: 'Cancel Order',
        cancelLabel: 'Keep Order',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.dashboardService.cancelOrder(orderId);
      }
    });
  }
}
