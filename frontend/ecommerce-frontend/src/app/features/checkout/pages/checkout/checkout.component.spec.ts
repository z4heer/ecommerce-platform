import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
import { of, throwError } from 'rxjs';

import { CheckoutComponent } from './checkout.component';

import { CartService } from '../../../cart/services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { LoggerService } from '../../../../core/services/logger.service';

import { OrderResponse } from '../../../../core/models/order.model';
import { CartItem } from '../../../../core/models/cart.model';

describe('CheckoutComponent', () => {

  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  let cartService: jasmine.SpyObj<CartService>;
  let checkoutService: jasmine.SpyObj<CheckoutService>;
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
      addedAt: new Date('2026-07-08T10:00:00Z')
    },
    {
      productId: 'P2',
      productName: 'Mouse',
      quantity: 1,
      unitPrice: 250,
      stockQuantity: 100,
      status: 'In Stock',
      addedAt: new Date('2026-07-08T10:05:00Z')
    }
  ]);

  beforeEach(async () => {

    cartService = jasmine.createSpyObj<CartService>(
      'CartService',
      [],
      {
        cartItems: cartItemsSignal
      }
    );

    checkoutService = jasmine.createSpyObj<CheckoutService>(
      'CheckoutService',
      ['checkout']
    );

    logger = jasmine.createSpyObj<LoggerService>(
      'LoggerService',
      ['info', 'error']
    );

    router = jasmine.createSpyObj<Router>(
      'Router',
      ['navigate']
    );

    checkoutService.checkout.and.returnValue(
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
          provide: CheckoutService,
          useValue: checkoutService
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

    fixture = TestBed.createComponent(
      CheckoutComponent
    );

    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('should calculate total items using computed signal', () => {

    expect(component.totalItems()).toBe(3);

  });

  it('should calculate total amount using computed signal', () => {

    expect(component.totalAmount()).toBe(450);

  });

  it('should place order successfully', () => {

    const response = {
      id: 'ORDER-999'
    } as OrderResponse;

    checkoutService.checkout.and.returnValue(
      of(response)
    );

    component.placeOrder();

    expect(checkoutService.checkout)
      .toHaveBeenCalled();

    expect(logger.info)
      .toHaveBeenCalledWith(
        '[CheckoutComponent] Order placed successfully.',
        response
      );

    expect(router.navigate)
      .toHaveBeenCalledWith([
        '/orders',
        'ORDER-999'
      ]);

    expect(component.isSubmitting()).toBeFalse();

  });

  it('should log error when checkout fails', () => {

    const error = new Error('Checkout Failed');

    checkoutService.checkout.and.returnValue(
      throwError(() => error)
    );

    component.placeOrder();

    expect(logger.error)
      .toHaveBeenCalledWith(
        '[CheckoutComponent] Checkout failed.',
        error
      );

    expect(component.isSubmitting()).toBeFalse();

  });

  it('should prevent duplicate submissions', () => {

    component.isSubmitting.set(true);

    component.placeOrder();

    expect(checkoutService.checkout)
      .not.toHaveBeenCalled();

  });

  it('should set submitting flag during checkout', () => {

    component.placeOrder();

    expect(component.isSubmitting()).toBeFalse();

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

  it('should recompute totals when cart signal changes', () => {

    cartItemsSignal.set([
      {
        productId: 'P3',
        productName: 'A Mouse',
        quantity: 2,
        unitPrice: 250,
        stockQuantity: 100,
        status: 'In Stock',
        addedAt: new Date('2026-07-08T10:05:00Z')
      }
    ]);

    expect(component.totalItems()).toBe(2);

    expect(component.totalAmount()).toBe(500);

  });

});