import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './service/dashboard.service';
import { signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('DashboardComponent (Design System Refactor)', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let mockDashboardService: Partial<DashboardService>;
    let mockDialog: Partial<MatDialog>;

    beforeEach(async () => {
        mockDashboardService = {
            metrics: signal([
                { id: '1', label: 'Revenue', value: '$50K', trend: 'up' }
            ]),
            recentOrders: signal([
                { id: 'ORD001', customerName: 'John Doe', amount: 150, status: 'pending', canCancel: true }
            ]),
            isLoading: signal(false),
            error: signal<string | null>(null),
            searchQuery: signal(''),
            updateSearchQuery: jasmine.createSpy('updateSearchQuery'),
            cancelOrder: jasmine.createSpy('cancelOrder')
        };

        mockDialog = {
            open: jasmine.createSpy('open').and.returnValue({
                afterClosed: () => of(true)
            })
        };

        await TestBed.configureTestingModule({
            imports: [DashboardComponent],
            providers: [
                { provide: DashboardService, useValue: mockDashboardService },
                { provide: MatDialog, useValue: mockDialog }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should render Enterprise layout shell components', () => {
        const container = fixture.debugElement.query(By.css('app-page-container'));
        const header = fixture.debugElement.query(By.css('app-page-header'));
        expect(container).toBeTruthy();
        expect(header).toBeTruthy();
    });

    it('should render design system cards and status chips for metrics', () => {
        const cards = fixture.debugElement.queryAll(By.css('app-app-card'));
        const chips = fixture.debugElement.queryAll(By.css('app-status-chip'));
        expect(cards.length).toBe(1);
        expect(chips.length).toBe(2); // One in metric card, one in table row
    });

    it('should show loading skeleton when isLoading signal is true', () => {
        (mockDashboardService.isLoading as any).set(true);
        fixture.detectChanges();
        const skeleton = fixture.debugElement.query(By.css('app-loading-skeleton'));
        expect(skeleton).toBeTruthy();
    });

    it('should show error state component when error signal is populated', () => {
        (mockDashboardService.error as any).set('Network Timeout Fault');
        fixture.detectChanges();
        const errorState = fixture.debugElement.query(By.css('app-error-state'));
        expect(errorState).toBeTruthy();
    });

    it('should launch design system ConfirmationDialog when cancel action is executed', () => {
        const cancelButton = fixture.debugElement.query(By.css('button[color="warn"]'));
        cancelButton.nativeElement.click();

        expect(mockDialog.open).toHaveBeenCalled();
        expect(mockDashboardService.cancelOrder).toHaveBeenCalledWith('ORD001');
    });
});