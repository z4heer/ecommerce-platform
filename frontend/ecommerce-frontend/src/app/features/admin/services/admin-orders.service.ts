import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_CONSTANTS } from '../../../core/constants/api.constants';
import { OrderResponse } from '../../../core/models/order.model';

@Injectable({ providedIn: 'root' })
export class AdminOrdersService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${API_CONSTANTS.BASE_URL}/admin/orders`;

  getAllOrders(): Observable<OrderResponse[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(res => res.map(this.mapOrderResponse))
    );
  }

  updateOrderStatus(orderId: string, status: string): Observable<OrderResponse> {
    return this.http.patch<any>(`${this.apiUrl}/${orderId}/status`, { status }).pipe(
      map(this.mapOrderResponse)
    );
  }

  private mapOrderResponse(apiOrder: any): OrderResponse {
    return {
      ...apiOrder,
      userId: apiOrder.user_id,
      totalAmount: apiOrder.total_amount,
      createdAt: apiOrder.created_at,
    };
  }
}
