import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs/operators';

import { OrderSummary } from '../../../../core/models/order.model';
import { OrderService } from '../../services/order.service';
import { LoggerService } from '../../../../core/services/logger.service';

import { PageContainerComponent } from '../../../../layout/page-container/page-container.component';
import { PageHeaderComponent } from '../../../../layout/page-header/page-header.component';

import { AppCardComponent } from '../../../../shared/components/app-card/app-card.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [
    CommonModule,

    PageContainerComponent,
    PageHeaderComponent,

    AppCardComponent,
    EmptyStateComponent,
    LoadingSpinnerComponent,

    MatButtonModule,
    MatDividerModule,
    MatChipsModule
  ],
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersListComponent {

  private readonly orderService = inject(OrderService);
  private readonly logger = inject(LoggerService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly isLoading = signal(true);

  readonly orders = signal<readonly OrderSummary[]>([]);

  loadOrders(): void {

    this.isLoading.set(true);

    this.orderService
      .getMyOrders()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({

        next: response => {

          this.orders.set(response.orders);

          this.logger.info(
            '[Orders] Loaded successfully.',
            response.orders
          );

        },

        error: error => {

          this.logger.error(
            '[Orders] Loading failed.',
            error
          );

        }

      });

  }

  constructor() {
    this.loadOrders();
  }

  openOrder(order: OrderSummary): void {

    this.router.navigate([
      '/orders',
      order.id
    ]);

  }

  trackByOrderId(
    _: number,
    order: OrderSummary
  ): string {

    return order.id;

  }

}