import {
    TestBed
} from '@angular/core/testing';

import {
    provideHttpClient
} from '@angular/common/http';

import {
    provideHttpClientTesting,
    HttpTestingController
} from '@angular/common/http/testing';

import { OrderService } from './order.service';

import { environment } from '../../../../environments/environment';
import { API_CONSTANTS } from '../../../core/constants/api.constants';

import {
    CreateOrderRequest,
    OrderListResponse,
    OrderResponse
} from '../../../core/models/order.model';

describe('OrderService', () => {

    let service: OrderService;
    let httpMock: HttpTestingController;

    const apiUrl =
        `${environment.api.baseUrl}${API_CONSTANTS.ORDERS}`;

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });

        service = TestBed.inject(OrderService);
        httpMock = TestBed.inject(HttpTestingController);

    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {

        expect(service).toBeTruthy();

    });

    describe('createOrder()', () => {

        it('should POST create order request', () => {

            const request = {} as CreateOrderRequest;

            const response = {} as OrderResponse;

            service.createOrder(request)
                .subscribe(res => {

                    expect(res).toEqual(response);

                });

            const req = httpMock.expectOne(apiUrl);

            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual(request);

            req.flush(response);

        });

        it('should propagate server error', () => {

            const request = {} as CreateOrderRequest;

            let errorResponse: any;

            service.createOrder(request).subscribe({

                next: () => fail('Expected error'),

                error: err => errorResponse = err

            });

            const req = httpMock.expectOne(apiUrl);

            req.flush(
                { message: 'Internal Server Error' },
                {
                    status: 500,
                    statusText: 'Server Error'
                }
            );

            expect(errorResponse.status).toBe(500);

        });

    });

    describe('getMyOrders()', () => {

        it('should GET all orders', () => {

            const response = {} as OrderListResponse;

            service.getMyOrders()
                .subscribe(res => {

                    expect(res).toEqual(response);

                });

            const req = httpMock.expectOne(apiUrl);

            expect(req.request.method).toBe('GET');

            req.flush(response);

        });

        it('should handle empty response', () => {

            const response = {
                orders: [],
                total: 0
            } as OrderListResponse;

            service.getMyOrders()
                .subscribe(res => {

                    expect(res.orders.length).toBe(0);

                });

            const req = httpMock.expectOne(apiUrl);

            req.flush(response);

        });

    });

    describe('getOrderById()', () => {

        it('should GET order by id', () => {

            const orderId = 'ORDER-123';

            const response = {} as OrderResponse;

            service.getOrderById(orderId)
                .subscribe(res => {

                    expect(res).toEqual(response);

                });

            const req = httpMock.expectOne(
                `${apiUrl}/${orderId}`
            );

            expect(req.request.method).toBe('GET');

            req.flush(response);

        });

        it('should return 404 for invalid order id', () => {

            const orderId = 'INVALID';

            let errorResponse: any;

            service.getOrderById(orderId).subscribe({

                next: () => fail('Expected error'),

                error: err => errorResponse = err

            });

            const req = httpMock.expectOne(
                `${apiUrl}/${orderId}`
            );

            req.flush(
                { message: 'Not Found' },
                {
                    status: 404,
                    statusText: 'Not Found'
                }
            );

            expect(errorResponse.status).toBe(404);

        });

    });

});