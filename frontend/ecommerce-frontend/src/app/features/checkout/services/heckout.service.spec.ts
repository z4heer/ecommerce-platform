import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { CheckoutService } from './checkout.service';
import { CartService } from '../../cart/services/cart.service';
import { OrderService } from '../../orders/services/order.service';
import { NotificationService } from '../../../core/services/notification.service';
import { LoggerService } from '../../../core/services/logger.service';

import {
    CreateOrderRequest,
    OrderResponse
} from '../../../core/models/order.model';

describe('CheckoutService', () => {

    let service: CheckoutService;

    let cartService: jasmine.SpyObj<CartService>;
    let orderService: jasmine.SpyObj<OrderService>;
    let notificationService: jasmine.SpyObj<NotificationService>;
    let logger: jasmine.SpyObj<LoggerService>;

    beforeEach(() => {

        cartService = jasmine.createSpyObj<CartService>(
            'CartService',
            [
                'cartItems',
                'clearCart'
            ]
        );

        orderService = jasmine.createSpyObj<OrderService>(
            'OrderService',
            [
                'createOrder'
            ]
        );

        notificationService = jasmine.createSpyObj<NotificationService>(
            'NotificationService',
            [
                'success',
                'warning',
                'error'
            ]
        );

        logger = jasmine.createSpyObj<LoggerService>(
            'LoggerService',
            [
                'info',
                'error'
            ]
        );

        TestBed.configureTestingModule({

            providers: [

                CheckoutService,

                {
                    provide: CartService,
                    useValue: cartService
                },

                {
                    provide: OrderService,
                    useValue: orderService
                },

                {
                    provide: NotificationService,
                    useValue: notificationService
                },

                {
                    provide: LoggerService,
                    useValue: logger
                }

            ]

        });

        service = TestBed.inject(CheckoutService);

    });

    it('should be created', () => {

        expect(service).toBeTruthy();

    });

    describe('checkout()', () => {

        it('should return error when cart is empty', () => {

            cartService.cartItems.and.returnValue([]);

            let error: Error | undefined;

            service.checkout().subscribe({

                next: () => fail('Expected error'),

                error: err => error = err

            });

            expect(notificationService.warning)
                .toHaveBeenCalledWith('Your cart is empty.');

            expect(orderService.createOrder)
                .not.toHaveBeenCalled();

            expect(error?.message)
                .toBe('Cart is empty.');

        });

        it('should create order successfully', () => {

            cartService.cartItems.and.returnValue([
                {
                    productId: 'P1',
                    quantity: 2
                } as any,
                {
                    productId: 'P2',
                    quantity: 1
                } as any
            ]);

            const response = {} as OrderResponse;

            orderService.createOrder.and.returnValue(
                of(response)
            );

            service.checkout().subscribe(res => {

                expect(res).toEqual(response);

            });

            const expectedRequest: CreateOrderRequest = {

                items: [

                    {
                        product_id: 'P1',
                        quantity: 2
                    },

                    {
                        product_id: 'P2',
                        quantity: 1
                    }

                ]

            };

            expect(orderService.createOrder)
                .toHaveBeenCalledWith(expectedRequest);

            expect(cartService.clearCart)
                .toHaveBeenCalled();

            expect(notificationService.success)
                .toHaveBeenCalledWith(
                    'Order placed successfully.'
                );

            expect(logger.info).toHaveBeenCalled();

        });

        it('should log and notify when checkout fails', () => {

            cartService.cartItems.and.returnValue([
                {
                    productId: 'P1',
                    quantity: 1
                } as any
            ]);

            const error = new Error('Backend unavailable');

            orderService.createOrder.and.returnValue(
                throwError(() => error)
            );

            service.checkout().subscribe({

                next: () => fail('Expected error'),

                error: err => {

                    expect(err).toBe(error);

                }

            });

            expect(logger.error)
                .toHaveBeenCalled();

            expect(notificationService.error)
                .toHaveBeenCalledWith(
                    'Unable to place your order. Please try again.'
                );

            expect(cartService.clearCart)
                .not.toHaveBeenCalled();

        });

        it('should map cart items into CreateOrderRequest correctly', () => {

            cartService.cartItems.and.returnValue([
                {
                    productId: 'ABC',
                    quantity: 5
                } as any
            ]);

            orderService.createOrder.and.returnValue(
                of({} as OrderResponse)
            );

            service.checkout().subscribe();

            expect(orderService.createOrder)
                .toHaveBeenCalledWith({

                    items: [

                        {
                            product_id: 'ABC',
                            quantity: 5
                        }

                    ]

                });

        });

    });

});