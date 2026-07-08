import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';

import { OrderDetailsComponent } from './order-details.component';

import { OrderService } from '../../services/order.service';
import { LoggerService } from '../../../../core/services/logger.service';

import { OrderResponse } from '../../../../core/models/order.model';

describe('OrderDetailsComponent', () => {

  let component: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;

  let orderService: jasmine.SpyObj<OrderService>;
  let logger: jasmine.SpyObj<LoggerService>;
  let router: jasmine.SpyObj<Router>;

  const activatedRoute = {
    snapshot: {
      paramMap: convertToParamMap({
        id: 'ORDER-123'
      })
    }
  };

  beforeEach(async () => {

    orderService = jasmine.createSpyObj(
      'OrderService',
      ['getOrderById']
    );

    logger = jasmine.createSpyObj(
      'LoggerService',
      ['info', 'error']
    );

    router = jasmine.createSpyObj(
      'Router',
      ['navigate']
    );

    orderService.getOrderById.and.returnValue(
      of({} as OrderResponse)
    );

    await TestBed.configureTestingModule({

      imports: [
        OrderDetailsComponent
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
        },

        {
          provide: ActivatedRoute,
          useValue: activatedRoute
        }

      ]

    }).compileComponents();

    fixture = TestBed.createComponent(
      OrderDetailsComponent
    );

    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('should load order during initialization', () => {

    expect(orderService.getOrderById)
      .toHaveBeenCalledWith('ORDER-123');

  });

  it('should populate order signal', () => {

    const response = {

      id: 'ORDER-123'

    } as OrderResponse;

    orderService.getOrderById.and.returnValue(
      of(response)
    );

    component['loadOrder']('ORDER-123');

    expect(component.order()).toEqual(response);

  });

  it('should set loading false after successful load', () => {

    orderService.getOrderById.and.returnValue(
      of({} as OrderResponse)
    );

    component['loadOrder']('ORDER-123');

    expect(component.isLoading()).toBeFalse();

  });

  it('should log successful load', () => {

    const response = {} as OrderResponse;

    orderService.getOrderById.and.returnValue(
      of(response)
    );

    component['loadOrder']('ORDER-123');

    expect(logger.info).toHaveBeenCalledWith(
      '[Order Details] Loaded.',
      response
    );

  });

  it('should log error when loading fails', () => {

    const error = new Error('Backend Failure');

    orderService.getOrderById.and.returnValue(
      throwError(() => error)
    );

    component['loadOrder']('ORDER-123');

    expect(logger.error).toHaveBeenCalledWith(
      '[Order Details] Failed.',
      error
    );

  });

  it('should set loading false after failed load', () => {

    orderService.getOrderById.and.returnValue(
      throwError(() => new Error('Failure'))
    );

    component['loadOrder']('ORDER-123');

    expect(component.isLoading()).toBeFalse();

  });

  it('should navigate back to orders', () => {

    component.backToOrders();

    expect(router.navigate)
      .toHaveBeenCalledWith([
        '/orders'
      ]);

  });

});

describe('OrderDetailsComponent - Missing Route Parameter', () => {

  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {

    router = jasmine.createSpyObj(
      'Router',
      ['navigate']
    );

    await TestBed.configureTestingModule({

      imports: [
        OrderDetailsComponent
      ],

      providers: [

        {
          provide: Router,
          useValue: router
        },

        {
          provide: LoggerService,
          useValue: jasmine.createSpyObj(
            'LoggerService',
            ['info', 'error']
          )
        },

        {
          provide: OrderService,
          useValue: jasmine.createSpyObj(
            'OrderService',
            ['getOrderById']
          )
        },

        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({})
            }
          }
        }

      ]

    }).compileComponents();

    TestBed.createComponent(OrderDetailsComponent);

  });

  it('should redirect to orders when route id is missing', () => {

    expect(router.navigate)
      .toHaveBeenCalledWith([
        '/orders'
      ]);

  });

});