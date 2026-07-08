import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { API_CONSTANTS } from '../../../core/constants/api.constants';

import {
    CreateOrderRequest,
    OrderListResponse,
    OrderResponse
} from '../../../core/models/order.model';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private readonly http = inject(HttpClient);

    private readonly apiUrl =
        `${environment.api.baseUrl}${API_CONSTANTS.ORDERS}`;

    createOrder(
        request: CreateOrderRequest
    ): Observable<OrderResponse> {
        return this.http.post<OrderResponse>(
            this.apiUrl,
            request
        );
    }

    getMyOrders(): Observable<OrderListResponse> {
        return this.http.get<OrderListResponse>(
            this.apiUrl
        );
    }

    getOrderById(
        orderId: string
    ): Observable<OrderResponse> {
        return this.http.get<OrderResponse>(
            `${this.apiUrl}/${orderId}`
        );
    }
}