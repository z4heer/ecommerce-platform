import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { finalize } from 'rxjs/operators';

import { CartService } from '../../../cart/services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { LoggerService } from '../../../../core/services/logger.service';
import { PageContainerComponent } from '../../../../layout/page-container/page-container.component';
import { PageHeaderComponent } from '../../../../layout/page-header/page-header.component';
import { AppCardComponent } from '../../../../shared/components/app-card/app-card.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PageContainerComponent,
    PageHeaderComponent,

    AppCardComponent,
    EmptyStateComponent,
    LoadingSpinnerComponent,
    MatButtonModule,
    MatDividerModule,
    CurrencyPipe
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent {

  private readonly cartService = inject(CartService);
  private readonly checkoutService = inject(CheckoutService);
  private readonly router = inject(Router);
  private readonly logger = inject(LoggerService);

  readonly isSubmitting = signal(false);

  readonly cartItems = this.cartService.cartItems;

  readonly totalItems = computed(() =>
    this.cartItems().reduce(
      (total, item) => total + item.quantity,
      0
    )
  );

  readonly totalAmount = computed(() =>
    this.cartItems().reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0
    )
  );

  placeOrder(): void {

    if (this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);

    this.checkoutService
      .checkout()
      .pipe(
        finalize(() => this.isSubmitting.set(false))
      )
      .subscribe({
        next: order => {

          this.logger.info(
            '[CheckoutComponent] Order placed successfully.',
            order
          );

          this.router.navigate([
            '/orders',
            order.id
          ]);

        },
        error: error => {

          this.logger.error(
            '[CheckoutComponent] Checkout failed.',
            error
          );

        }
      });
  }

  trackByProductId(_: number, item: { productId: string }): string {
    return item.productId;
  }
}