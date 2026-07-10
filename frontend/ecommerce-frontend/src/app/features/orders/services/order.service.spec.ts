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

    const apiUrl = API_CONSTANTS.ORDERS.BASE;

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

            const response = [
                {
                    id: 'ORDER-1',
                    total_amount: 1200,
                    status: 'PENDING',
                    created_at: '2026-07-09'
                }
            ];

            service.getMyOrders().subscribe(res => {

                expect(res.length).toBe(1);

                expect(res[0]).toEqual({
                    id: 'ORDER-1',
                    totalAmount: 1200,
                    status: 'PENDING',
                    createdAt: '2026-07-09'
                });

            });

            const req = httpMock.expectOne(apiUrl);

            expect(req.request.method).toBe('GET');

            req.flush(response);

        });

        it('should handle empty response', () => {

            service.getMyOrders().subscribe(res => {

                expect(res.length).toBe(0);

            });

            const req = httpMock.expectOne(apiUrl);

            req.flush([]);

        });

    });

    describe('getOrderById()', () => {

        it('should GET order by id', () => {

            const orderId = 'ORDER-123';

            const response = {
                id: 'ORDER-123',
                status: 'PENDING',
                total_amount: 1200,
                created_at: '2026-07-10',
                items: [
                    {
                        product_id: 'PROD-1',
                        quantity: 2,
                        unit_price: 600
                    }
                ]
            };

            service.getOrderById(orderId).subscribe(res => {

                expect(res.id).toBe('ORDER-123');
                expect(res.totalAmount).toBe(1200);

                expect(res.items.length).toBe(1);

                expect(res.items[0].productId).toBe('PROD-1');
                expect(res.items[0].quantity).toBe(2);
                expect(res.items[0].unitPrice).toBe(600);
                expect(res.items[0].subtotal).toBe(1200);

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