import { TestBed } from '@angular/core/testing';
import { DashboardService } from './dashboard.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DashboardService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(DashboardService);
  });

  it('should initialize with default operational states', () => {
    expect(service.isLoading()).toBeTrue(); // Starts loading instantly in constructor
    expect(service.searchQuery()).toBe('');
    expect(service.error()).toBeNull();
  });

  it('should correctly filter recent orders by query pattern matching', () => {
    // Force complete loading baseline initialization bypassing latency delay
    (service as any)._orders.set([
      { id: 'ORD-101', customerName: 'Alpha', amount: 10, status: 'pending', canCancel: true },
      { id: 'ORD-202', customerName: 'Beta', amount: 20, status: 'completed', canCancel: false }
    ]);

    service.updateSearchQuery('Beta');
    expect(service.recentOrders().length).toBe(1);
    expect(service.recentOrders()[0].id).toBe('ORD-202');
  });
});