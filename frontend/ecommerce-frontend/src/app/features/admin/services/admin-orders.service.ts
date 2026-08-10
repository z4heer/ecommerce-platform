import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONSTANTS } from '../../../core/constants/api.constants';
import { OrderResponse } from '../../../core/models/order.model';

@Injectable({ providedIn: 'root' })
export class AdminOrdersService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${API_CONSTANTS.BASE_URL}/admin/orders`;

  getAllOrders(): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(this.apiUrl);
  }

  updateOrderStatus(orderId: string, status: string): Observable<OrderResponse> {
    return this.http.patch<OrderResponse>(`${this.apiUrl}/${orderId}/status`, { status });
  }
}
