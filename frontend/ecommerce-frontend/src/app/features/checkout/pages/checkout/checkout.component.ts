import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';

import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { finalize } from 'rxjs/operators';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

import { CartService } from '../../../cart/services/cart.service';
import { LoggerService } from '../../../../core/services/logger.service';

import { PageContainerComponent } from '../../../../layout/page-container/page-container.component';
import { PageHeaderComponent } from '../../../../layout/page-header/page-header.component';

import { AppCardComponent } from '../../../../shared/components/app-card/app-card.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { OrderService } from '../../../orders/services/order.service';
import { NotificationService } from '../../../../core/services/notification.service';
import {
  CreateOrderRequest
} from '../../../../core/models/order.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    PageContainerComponent,
    PageHeaderComponent,
    AppCardComponent,
    EmptyStateComponent,
    LoadingSpinnerComponent,

    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,

    CurrencyPipe
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent {

  private readonly fb = inject(FormBuilder);

  private readonly cartService = inject(CartService);

  private readonly router = inject(Router);

  private readonly logger = inject(LoggerService);

  readonly isSubmitting = signal(false);

  // -------------------------------------------------------------------------
  // Cart Signals (reuse existing CartService calculations)
  // -------------------------------------------------------------------------

  readonly cartItems = this.cartService.cartItems;

  readonly itemCount = this.cartService.itemCount;

  readonly subtotal = this.cartService.subtotal;

  readonly estimatedTax = this.cartService.estimatedTax;

  readonly grandTotal = this.cartService.grandTotal;

  readonly isEmpty = this.cartService.isEmpty;
  private readonly orderService =
    inject(OrderService);

  private readonly notification =
    inject(NotificationService);
  // -------------------------------------------------------------------------
  // Checkout Form
  // -------------------------------------------------------------------------

  readonly checkoutForm = this.fb.nonNullable.group({

    customer: this.fb.nonNullable.group({

      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[6-9]\d{9}$/)
        ]
      ]

    }),

    shipping: this.fb.nonNullable.group({

      addressLine1: [
        '',
        Validators.required
      ],

      addressLine2: [''],

      city: [
        '',
        Validators.required
      ],

      state: [
        '',
        Validators.required
      ],

      pinCode: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[1-9][0-9]{5}$/)
        ]
      ]

    }),

    deliveryMethod: this.fb.nonNullable.control('STANDARD')

  });

  // -------------------------------------------------------------------------
  // Place Order
  // -------------------------------------------------------------------------

  placeOrder(): void {
    if (this.checkoutForm.controls.shipping.invalid) {
      this.checkoutForm.controls.shipping.markAllAsTouched();
      this.notification.warning('Please fill in all required shipping address fields.');
      return;
    }

    if (this.isEmpty()) {
      this.notification.warning('Your cart is empty.');
      return;
    }

    if (this.isSubmitting()) {

      return;

    }

    this.isSubmitting.set(true);

    const request =
      this.buildOrderRequest();

    this.orderService
      .createOrder(request)
      .pipe(
        finalize(() =>
          this.isSubmitting.set(false)
        )
      )
      .subscribe({

        next: order => {

          this.logger.info(
            '[Checkout] Order created.',
            order
          );

          this.notification.success(
            'Order placed successfully.'
          );

          this.cartService.clearCart();

          this.router.navigate([
            '/orders',
            order.id
          ]);

        },

        error: error => {

          this.logger.error(
            '[Checkout] Order creation failed.',
            error
          );

          this.notification.error(
            'Unable to place your order. Please try again.'
          );

        }

      });

  }

  trackByProductId(
    _: number,
    item: { productId: string }
  ): string {

    return item.productId;

  }

  private buildOrderRequest(): CreateOrderRequest {
    const shipping = this.checkoutForm.controls.shipping.getRawValue();

    const addressParts = [
      shipping.addressLine1,
      shipping.addressLine2,
      shipping.city,
      shipping.state
    ].filter(part => Boolean(part && part.trim())).join(', ');

    const shipping_address = shipping.pinCode && shipping.pinCode.trim()
      ? `${addressParts} - ${shipping.pinCode.trim()}`
      : addressParts;

    return {

      items: this.cartItems().map(item => ({

        product_id: item.productId,

        quantity: item.quantity

      })),

      shipping_address

    };

  }
}