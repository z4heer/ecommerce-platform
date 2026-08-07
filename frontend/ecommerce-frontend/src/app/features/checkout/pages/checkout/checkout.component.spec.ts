import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
import { of, throwError } from 'rxjs';

import { CheckoutComponent } from './checkout.component';

import { CartService } from '../../../cart/services/cart.service';
import { OrderService } from '../../../orders/services/order.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { LoggerService } from '../../../../core/services/logger.service';

import {
  CartItem
} from '../../../../core/models/cart.model';

import {
  OrderResponse
} from '../../../../core/models/order.model';

describe('CheckoutComponent', () => {

  let component: CheckoutComponent;

  let fixture: ComponentFixture<CheckoutComponent>;

  let cartService: jasmine.SpyObj<CartService>;

  let orderService: jasmine.SpyObj<OrderService>;

  let notification: jasmine.SpyObj<NotificationService>;

  let logger: jasmine.SpyObj<LoggerService>;

  let router: jasmine.SpyObj<Router>;

  const cartItemsSignal = signal<CartItem[]>([
    {
      productId: 'P1',
      productName: 'Laptop',
      quantity: 2,
      unitPrice: 100,
      stockQuantity: 50,
      status: 'In Stock',
      addedAt: new Date()
    },
    {
      productId: 'P2',
      productName: 'Mouse',
      quantity: 1,
      unitPrice: 250,
      stockQuantity: 100,
      status: 'In Stock',
      addedAt: new Date()
    }
  ]);

  beforeEach(async () => {

    cartService = jasmine.createSpyObj(
      'CartService',
      [
        'clearCart'
      ],
      {
        cartItems: cartItemsSignal,

        itemCount: signal(3),

        subtotal: signal(450),

        estimatedTax: signal(36),

        grandTotal: signal(486),

        isEmpty: signal(false)
      }
    );

    orderService = jasmine.createSpyObj(
      'OrderService',
      [
        'createOrder'
      ]
    );

    notification = jasmine.createSpyObj(
      'NotificationService',
      [
        'success',
        'warning',
        'error'
      ]
    );

    logger = jasmine.createSpyObj(
      'LoggerService',
      [
        'info',
        'error'
      ]
    );

    router = jasmine.createSpyObj(
      'Router',
      [
        'navigate'
      ]
    );

    orderService.createOrder.and.returnValue(

      of({

        id: 'ORDER-100'

      } as OrderResponse)

    );

    await TestBed.configureTestingModule({

      imports: [

        CheckoutComponent

      ],

      providers: [

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
          useValue: notification
        },

        {
          provide: LoggerService,
          useValue: logger
        },

        {
          provide: Router,
          useValue: router
        }

      ]

    }).compileComponents();

    fixture =
      TestBed.createComponent(
        CheckoutComponent
      );

    component =
      fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('should expose cart signals', () => {

    expect(component.itemCount()).toBe(3);

    expect(component.subtotal()).toBe(450);

    expect(component.estimatedTax()).toBe(36);

    expect(component.grandTotal()).toBe(486);

  });

  it('should create checkout form', () => {

    expect(component.checkoutForm).toBeTruthy();

  });

  it('should be invalid initially', () => {

    expect(component.checkoutForm.invalid).toBeTrue();

  });

  it('should become valid when mandatory fields are populated', () => {

    component.checkoutForm.patchValue({

      customer: {

        name: 'John Doe',

        email: 'john@test.com',

        phone: '9876543210'

      },

      shipping: {

        addressLine1: 'MG Road',

        city: 'Pune',

        state: 'Maharashtra',

        pinCode: '411001'

      },

      deliveryMethod: 'STANDARD'

    });

    expect(

      component.checkoutForm.valid

    ).toBeTrue();

  });

  it('should place order successfully', () => {

    component.checkoutForm.patchValue({

      customer: {
        name: 'John Doe',
        email: 'john@test.com',
        phone: '9876543210'
      },

      shipping: {
        addressLine1: 'MG Road',
        city: 'Pune',
        state: 'Maharashtra',
        pinCode: '411001'
      },

      deliveryMethod: 'STANDARD'

    });

    const response = {
      id: 'ORDER-999'
    } as OrderResponse;

    orderService.createOrder.and.returnValue(
      of(response)
    );

    component.placeOrder();

    expect(orderService.createOrder)
      .toHaveBeenCalled();

    expect(logger.info)
      .toHaveBeenCalledWith(
        '[Checkout] Order created.',
        response
      );

    expect(notification.success)
      .toHaveBeenCalledWith(
        'Order placed successfully.'
      );

    expect(cartService.clearCart)
      .toHaveBeenCalled();

    expect(router.navigate)
      .toHaveBeenCalledWith([
        '/orders',
        'ORDER-999'
      ]);

  });

  it('should warn when cart is empty', () => {

    Object.defineProperty(
      cartService,
      'isEmpty',
      {
        value: signal(true)
      }
    );

    fixture = TestBed.createComponent(
      CheckoutComponent
    );

    component = fixture.componentInstance;

    fixture.detectChanges();

    component.checkoutForm.patchValue({

      customer: {
        name: 'John Doe',
        email: 'john@test.com',
        phone: '9876543210'
      },

      shipping: {
        addressLine1: 'Street',
        city: 'Pune',
        state: 'MH',
        pinCode: '411001'
      }

    });

    component.placeOrder();

    expect(notification.warning)
      .toHaveBeenCalledWith(
        'Your cart is empty.'
      );

  });
  it('should prevent duplicate submission', () => {

    component.isSubmitting.set(true);

    component.placeOrder();

    expect(orderService.createOrder)
      .not.toHaveBeenCalled();

  });
  it('should log error when order creation fails', () => {

    component.checkoutForm.patchValue({

      customer: {
        name: 'John Doe',
        email: 'john@test.com',
        phone: '9876543210'
      },

      shipping: {
        addressLine1: 'Street',
        city: 'Pune',
        state: 'MH',
        pinCode: '411001'
      }

    });

    const error = new Error('Server Error');

    orderService.createOrder.and.returnValue(

      throwError(() => error)

    );

    component.placeOrder();

    expect(logger.error)
      .toHaveBeenCalled();

    expect(notification.error)
      .toHaveBeenCalled();

  });
  it('should reset submitting flag', () => {

    component.checkoutForm.patchValue({

      customer: {
        name: 'John Doe',
        email: 'john@test.com',
        phone: '9876543210'
      },

      shipping: {
        addressLine1: 'Street',
        city: 'Pune',
        state: 'MH',
        pinCode: '411001'
      }

    });

    component.placeOrder();

    expect(component.isSubmitting())
      .toBeFalse();

  });
  it('should return product id from trackByProductId', () => {

    expect(

      component.trackByProductId(

        0,

        {
          productId: 'ABC'
        }

      )

    ).toBe('ABC');

  });
  it('should build request from cart items', () => {

    component.checkoutForm.patchValue({

      customer: {
        name: 'John Doe',
        email: 'john@test.com',
        phone: '9876543210'
      },

      shipping: {
        addressLine1: 'Street',
        city: 'Pune',
        state: 'MH',
        pinCode: '411001'
      }

    });

    component.placeOrder();

    expect(orderService.createOrder)
      .toHaveBeenCalledWith({

        items: [

          {

            product_id: 'P1',

            quantity: 2

          },

          {

            product_id: 'P2',

            quantity: 1

          }

        ],
        shipping_address: 'Street, Pune, MH - 411001'

      } as any);

  });
});