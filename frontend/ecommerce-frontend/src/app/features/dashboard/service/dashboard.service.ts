import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, catchError, of, finalize, tap } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
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

    return allOrders.filter(order =>
      order.id.toLowerCase().includes(query) ||
      order.customerName.toLowerCase().includes(query)
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

    // Simulated API payload pipeline maintaining strict architectural types
    of({
      metrics: [
        { id: 'm1', label: 'Quarterly Revenue', value: '$1,248,900', trend: 'up' },
        { id: 'm2', label: 'Active Sessions', value: '3,842', trend: 'stable' },
        { id: 'm3', label: 'System Error Rate', value: '0.04%', trend: 'down' },
        { id: 'm4', label: 'Pending Fulfillments', value: '142', trend: 'up' }
      ] as MetricItem[],
      orders: [
        { id: 'ORD-8492', customerName: 'Acme Corp Logistics', amount: 12450.00, status: 'pending', canCancel: true },
        { id: 'ORD-7721', customerName: 'Global Retail Systems', amount: 3400.50, status: 'completed', canCancel: false },
        { id: 'ORD-6109', customerName: 'Nexa Industries Ltd', amount: 450.00, status: 'cancelled', canCancel: false },
        { id: 'ORD-5541', customerName: 'Apex Development Corp', amount: 8910.00, status: 'pending', canCancel: true }
      ] as SystemOrder[]
    })
      .pipe(
        delay(800), // Simulate network threshold latency
        catchError((err) => {
          this._error.set(err?.message || 'Failed to sync with upstream dashboard services.');
          return of({ metrics: [], orders: [] });
        }),
        finalize(() => this._isLoading.set(false))
      )
      .subscribe((data) => {
        this._metrics.set(data.metrics);
        this._orders.set(data.orders);
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
          this._orders.update((currentOrders) =>
            currentOrders.map((order) =>
              order.id === orderId
                ? { ...order, status: 'cancelled', canCancel: false }
                : order
            )
          );
        }),
        catchError((err) => {
          this._error.set(`Failed to cancel order ${orderId}: ${err?.message}`);
          return of(null);
        }),
        finalize(() => this._isLoading.set(false))
      )
      .subscribe();
  }
}