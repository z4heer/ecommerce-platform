import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { OrdersListComponent } from './orders-list.component';

import { OrderService } from '../../services/order.service';
import { LoggerService } from '../../../../core/services/logger.service';

import {
  OrderListResponse,
  OrderSummary
} from '../../../../core/models/order.model';

describe('OrdersListComponent', () => {

  let component: OrdersListComponent;
  let fixture: ComponentFixture<OrdersListComponent>;

  let orderService: jasmine.SpyObj<OrderService>;
  let logger: jasmine.SpyObj<LoggerService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {

    orderService = jasmine.createSpyObj<OrderService>(
      'OrderService',
      ['getMyOrders']
    );

    logger = jasmine.createSpyObj<LoggerService>(
      'LoggerService',
      ['info', 'error']
    );

    router = jasmine.createSpyObj<Router>(
      'Router',
      ['navigate']
    );

    orderService.getMyOrders.and.returnValue(
      of([])
    );

    await TestBed.configureTestingModule({

      imports: [
        OrdersListComponent
      ],

      providers: [

        {
          provide: OrderService,
          useValue: orderService
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
      OrdersListComponent
    );

    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('should load orders on initialization', () => {

    expect(orderService.getMyOrders)
      .toHaveBeenCalled();

  });

  it('should populate orders signal', () => {

    const orders: OrderSummary[] = [

      {
        id: 'ORDER-1',
        totalAmount: 1200,
        status: 'PENDING',
        createdAt: '2026-07-08'
      }

    ];

    orderService.getMyOrders.and.returnValue(
      of(orders)
    );
    component.loadOrders();
    expect(component.orders()).toEqual(orders);
  });

  it('should set loading false after successful load', () => {
    const orders: OrderSummary[] = [];

    orderService.getMyOrders.and.returnValue(
      of(orders)
    );

    component.loadOrders();

    expect(component.isLoading()).toBeFalse();

  });

  it('should log successful load', () => {

    const orders: OrderSummary[] = [];

    orderService.getMyOrders.and.returnValue(
      of(orders)
    );

    component.loadOrders();

    expect(logger.info).toHaveBeenCalledWith(
      '[Orders] Loaded successfully.',
      orders
    );

  });

  it('should log error when loading fails', () => {

    const error = new Error('Backend Error');

    orderService.getMyOrders.and.returnValue(
      throwError(() => error)
    );

    component.loadOrders();

    expect(logger.error).toHaveBeenCalledWith(
      '[Orders] Loading failed.',
      error
    );

  });

  it('should set loading false after failed load', () => {

    orderService.getMyOrders.and.returnValue(
      throwError(() => new Error('Failure'))
    );

    component.loadOrders();

    expect(component.isLoading()).toBeFalse();

  });

  it('should navigate to order details', () => {

    const order: OrderSummary = {

      id: 'ORDER-100',

      totalAmount: 500,

      status: 'CONFIRMED',

      createdAt: '2026-07-08'

    };

    component.openOrder(order);

    expect(router.navigate)
      .toHaveBeenCalledWith([
        '/orders',
        'ORDER-100'
      ]);

  });

  it('should return order id from trackByOrderId', () => {

    const order: OrderSummary = {

      id: 'ORDER-999',

      totalAmount: 100,

      status: 'DELIVERED',

      createdAt: '2026-07-08'

    };

    expect(
      component.trackByOrderId(0, order)
    ).toBe('ORDER-999');

  });

});