import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import {
    CreateOrderRequest,
    OrderResponse
} from '../../../core/models/order.model';

import { CartService } from '../../cart/services/cart.service';
import { OrderService } from '../../orders/services/order.service';
import { NotificationService } from '../../../core/services/notification.service';
import { LoggerService } from '../../../core/services/logger.service';

@Injectable({
    providedIn: 'root'
})
export class CheckoutService {

    private readonly cartService = inject(CartService);
    private readonly orderService = inject(OrderService);
    private readonly notificationService = inject(NotificationService);
    private readonly logger = inject(LoggerService);

    checkout(): Observable<OrderResponse> {

        const cartItems = this.cartService.cartItems();

        if (cartItems.length === 0) {

            this.notificationService.warning(
                'Your cart is empty.'
            );

            return throwError(() => new Error('Cart is empty.'));
        }

        const request: CreateOrderRequest = {
            items: cartItems.map(item => ({
                product_id: item.productId,
                quantity: item.quantity
            }))
        };

        this.logger.info(
            '[CheckoutService] Creating order.',
            request
        );

        return this.orderService.createOrder(request).pipe(

            tap(order => {

                this.logger.info(
                    '[CheckoutService] Order created.',
                    order
                );

                this.cartService.clearCart();

                this.notificationService.success(
                    'Order placed successfully.'
                );

            }),

            catchError(error => {

                this.logger.error(
                    '[CheckoutService] Checkout failed.',
                    error
                );

                this.notificationService.error(
                    'Unable to place your order. Please try again.'
                );

                return throwError(() => error);

            })
        );
    }
}