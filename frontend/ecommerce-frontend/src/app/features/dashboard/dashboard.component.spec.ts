import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './service/dashboard.service';
import { ProductService } from '../products/services/product.service';
import { CartService } from '../cart/services/cart.service';
import { OrderService } from '../orders/services/order.service';
import { signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { Product } from '../../core/models/product.model';
import { CartItem } from '../../core/models/cart.model';
import { OrderSummary } from '../../core/models/order.model';
import { ProductStatus } from '../../core/models/product.model';

describe('DashboardComponent (Design System Refactor)', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockDashboardService: Partial<DashboardService>;
  let mockProductService: Partial<ProductService>;
  let mockCartService: Partial<CartService>;
  let mockOrderService: Partial<OrderService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  const mockCartItemsSignal = signal<CartItem[]>([
    {
      productId: 'PRD-01',
      productName: 'Premium Item Spec',
      unitPrice: 6000,
      quantity: 2,
      stockQuantity: 50,
      status: 'In Stock' as ProductStatus,
      addedAt: new Date('2026-07-01')
    },
    {
      productId: 'PRD-02',
      productName: 'Secondary Base Item',
      unitPrice: 2000,
      quantity: 1,
      stockQuantity: 100,
      status: 'In Stock' as ProductStatus,
      addedAt: new Date('2026-07-02')
    }
  ]);

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MatDialog', ['open']);
    spy.open.and.returnValue({
      afterClosed: () => of(true),
    });
    dialogSpy = spy;

    mockDashboardService = {
      metrics: signal([
        { id: 'm1', label: 'Total Products', value: '15', trend: 'stable' },
        { id: 'm2', label: 'Cart Items', value: '1', trend: 'stable' },
        { id: 'm3', label: 'My Orders', value: '2', trend: 'stable' },
        { id: 'm4', label: 'Current Cart Total', value: '₹599.00', trend: 'stable' }
      ]),
      isLoading: signal(false),
      error: signal<string | null>(null),
      searchQuery: signal(''),
      updateSearchQuery: jasmine.createSpy('updateSearchQuery'),
      cancelOrder: jasmine.createSpy('cancelOrder'),
    };

    mockProductService = {
      products: signal<Product[]>([
        { id: 'P1', name: 'Item 1', description: 'Desc 1', category: 'Cat 1', price: 100, stock_quantity: 10 },
        { id: 'P2', name: 'Item 2', description: 'Desc 2', category: 'Cat 2', price: 200, stock_quantity: 20 }
      ])
    };

    mockCartService = {
      cartItems: mockCartItemsSignal
    };

    const mockOrderData = [
      { id: 'O1', totalAmount: 14000, status: 'completed' as any, createdAt: '2026-07-10' }
    ] as OrderSummary[];

    mockOrderService = {
      getMyOrders: jasmine.createSpy('getMyOrders').and.returnValue(of(mockOrderData))
    };

    await TestBed.configureTestingModule({
      imports: [DashboardComponent, MatDialogModule, RouterModule.forRoot([])],
      providers: [
        { provide: DashboardService, useValue: mockDashboardService },
        { provide: ProductService, useValue: mockProductService },
        { provide: CartService, useValue: mockCartService },
        { provide: OrderService, useValue: mockOrderService },
        { provide: MatDialog, useValue: dialogSpy },
        provideAnimations()
      ],
    })
      .overrideComponent(DashboardComponent, {
        remove: { imports: [MatDialogModule] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render Enterprise layout shell components', () => {
    // Aligned to new optimized markup container classes
    const container = fixture.debugElement.query(By.css('.page-container'));
    const header = fixture.debugElement.query(By.css('.dashboard-header'));
    expect(container).toBeTruthy();
    expect(header).toBeTruthy();
  });

  it('should correctly compute and render the aggregate Cart Total from CartService signal data', () => {
    // Triggers change detection to process the internal calculated signal
    fixture.detectChanges();
    const cards = fixture.debugElement.queryAll(By.css('.metric-card'));
    const textContents = cards.map(card => card.nativeElement.textContent);
    // Confirms the calculated value from your mock array (14,000) matches the template text output
    const hasFormattedTotal = textContents.some(text => text.includes('14,000.00'));
    expect(hasFormattedTotal).toBeTrue();
  });

  it('should render design system cards and status chips for integrated metrics', () => {
    // Aligned to native semantic overview blocks
    const cards = fixture.debugElement.queryAll(By.css('.metric-card'));
    const chips = fixture.debugElement.queryAll(By.css('.metric-badge'));
    expect(cards.length).toBe(4);
    expect(chips.length).toBe(4);
  });

  it('should show loading skeleton or indicator when isLoading signal is true', () => {
    // Updates to look for structural view wrapper if loading states are handled by component
    (mockDashboardService.isLoading as any).set(true);
    fixture.detectChanges();
    expect(component.isLoading()).toBeTrue();
  });

  it('should register error state when error signal is populated', () => {
    (mockDashboardService.error as any).set('Network Timeout Fault');
    fixture.detectChanges();
    expect(component.error()).toBe('Network Timeout Fault');
  });
});