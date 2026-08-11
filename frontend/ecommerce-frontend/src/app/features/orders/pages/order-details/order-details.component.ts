import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs/operators';

import { OrderResponse } from '../../../../core/models/order.model';
import { OrderService } from '../../services/order.service';
import { LoggerService } from '../../../../core/services/logger.service';

import { PageContainerComponent } from '../../../../layout/page-container/page-container.component';
import { PageHeaderComponent } from '../../../../layout/page-header/page-header.component';

import { AppCardComponent } from '../../../../shared/components/app-card/app-card.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    CommonModule,

    PageContainerComponent,
    PageHeaderComponent,

    AppCardComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,

    MatButtonModule,
    MatDividerModule,
    MatChipsModule
  ],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailsComponent {

  private readonly orderService = inject(OrderService);
  private readonly logger = inject(LoggerService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly isLoading = signal(true);

  readonly order = signal<OrderResponse | null>(null);
  readonly isProcessingPayment = signal(false);

  constructor() {

    const orderId =
      this.route.snapshot.paramMap.get('id');

    if (!orderId) {

      this.router.navigate(['/orders']);

      return;

    }

    this.loadOrder(orderId);

  }

  private loadOrder(orderId: string): void {

    this.isLoading.set(true);

    this.orderService
      .getOrderById(orderId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({

        next: order => {

          this.order.set(order);

          this.logger.info(
            '[Order Details] Loaded.',
            order
          );

        },

        error: error => {

          this.logger.error(
            '[Order Details] Failed.',
            error
          );

        }

      });

  }

  backToOrders(): void {

    this.router.navigate([
      '/orders'
    ]);

  }

  proceedToPayment(): void {
    const currentOrder = this.order();
    if (!currentOrder || currentOrder.status !== 'PENDING') return;

    this.isProcessingPayment.set(true);

    this.orderService.createCheckoutSession(currentOrder.id).subscribe({
      next: (res) => {
        this.logger.info('[Order Details] Sandbox Checkout Session token generated', res);
        // Simulate redirect to payment gateway and return
        setTimeout(() => {
          this.orderService.confirmPayment(currentOrder.id).subscribe({
            next: (updatedOrder: any) => {
               this.logger.info('[Order Details] Payment confirmed, updating order details.');
               this.loadOrder(currentOrder.id);
               this.isProcessingPayment.set(false);
            },
            error: err => {
              this.logger.error('[Order Details] Confirm payment failed.', err);
              this.isProcessingPayment.set(false);
            }
          });
        }, 1500);
      },
      error: err => {
        this.logger.error('[Order Details] Create checkout session failed.', err);
        this.isProcessingPayment.set(false);
      }
    });
  }

}