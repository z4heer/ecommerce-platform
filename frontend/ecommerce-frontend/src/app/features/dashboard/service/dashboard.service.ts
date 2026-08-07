import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, catchError, of, finalize, tap } from 'rxjs';
import { API_CONSTANTS } from '../../../core/constants/api.constants';

// Strict Enterprise Type Definitions
export interface MetricItem {
  id: string;
  label: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
}

export interface SystemOrder {
  id: string;
  customerName: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  canCancel: boolean;
}

export interface DashboardApiResponse {
  metrics: MetricItem[];
  orders: SystemOrder[];
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly http = inject(HttpClient);

  // Private Writeable Signals tracking core state
  private readonly _metrics = signal<MetricItem[]>([]);
  private readonly _orders = signal<SystemOrder[]>([]);
  private readonly _isLoading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);
  private readonly _searchQuery = signal<string>('');

  // Public Read-Only Signals matching component expectations
  public readonly metrics = computed(() => this._metrics());
  public readonly isLoading = computed(() => this._isLoading());
  public readonly error = computed(() => this._error());
  public readonly searchQuery = computed(() => this._searchQuery());

  // Computed Signal applying pure state filtering based on Search Query
  public readonly recentOrders = computed(() => {
    const query = this._searchQuery().toLowerCase().trim();
    const allOrders = this._orders();

    if (!query) {
      return allOrders;
    }

    return allOrders.filter(
      order =>
        order.id.toLowerCase().includes(query) || order.customerName.toLowerCase().includes(query),
    );
  });

  constructor() {
    this.loadDashboardData();
  }

  /**
   * Fetches layout operational dependencies from enterprise endpoints
   */
  public loadDashboardData(): void {
    this._isLoading.set(true);
    this._error.set(null);

    this.http
      .get<DashboardApiResponse>(API_CONSTANTS.ADMIN.DASHBOARD)
      .pipe(
        catchError(err => {
          this._error.set(
            err?.error?.detail || err?.message || 'Failed to sync with upstream dashboard services.',
          );
          return of({ metrics: [], orders: [] });
        }),
        finalize(() => this._isLoading.set(false)),
      )
      .subscribe(data => {
        this._metrics.set(data.metrics || []);
        this._orders.set(data.orders || []);
      });
  }

  /**
   * Updates the internal query string state
   */
  public updateSearchQuery(query: string): void {
    this._searchQuery.set(query);
  }

  /**
   * Mutation workflow for cancelling localized data records
   */
  public cancelOrder(orderId: string): void {
    this._isLoading.set(true);

    // Mock API command sequence execution
    of({ success: true })
      .pipe(
        delay(400),
        tap(() => {
          this._orders.update(currentOrders =>
            currentOrders.map(order =>
              order.id === orderId ? { ...order, status: 'cancelled', canCancel: false } : order,
            ),
          );
        }),
        catchError(err => {
          this._error.set(`Failed to cancel order ${orderId}: ${err?.message}`);
          return of(null);
        }),
        finalize(() => this._isLoading.set(false)),
      )
      .subscribe();
  }
}
