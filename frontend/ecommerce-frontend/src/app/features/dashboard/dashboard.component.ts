import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, MetricItem, SystemOrder } from './service/dashboard.service';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton/loading-skeleton.component';
// Enterprise Design System Component Imports
import { PageContainerComponent } from '../../layout/page-container/page-container.component';
import { PageHeaderComponent } from '../../layout/page-header/page-header.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { AppCardComponent } from '../../shared/components/app-card/app-card.component';
import { StatusChipComponent } from '../../shared/components/status-chip/status-chip.component';
import { SearchToolbarComponent } from '../../shared/components/search-toolbar/search-toolbar.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
export type StatusChipType = 'success' | 'warning' | 'error' | 'info' | 'neutral';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule, // Resolves matRippleDisabled errors on custom sub-elements
    PageContainerComponent,
    PageHeaderComponent,
    SectionHeaderComponent,
    AppCardComponent,
    StatusChipComponent,
    SearchToolbarComponent,
    EmptyStateComponent,
    LoadingSkeletonComponent,
    ErrorStateComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly dialog = inject(MatDialog);
  protected readonly dashboardService = inject(DashboardService);

  // Existing signals driving the template state
  public readonly metrics = this.dashboardService.metrics;
  public readonly recentOrders = this.dashboardService.recentOrders;
  public readonly isLoading = this.dashboardService.isLoading;
  public readonly error = this.dashboardService.error;
  public readonly searchQuery = this.dashboardService.searchQuery;

  public onSearch(query: string): void {
    this.dashboardService.updateSearchQuery(query || '');
  }

  /**
   * Safe mapping adapter transforming metric trends into design-system compatible enum types
   */
  protected mapTrendToChipType(trend: MetricItem['trend']): StatusChipType {
    switch (trend) {
      case 'up':
        return 'success';
      case 'down':
        return 'error';
      case 'stable':
        return 'neutral';
      default:
        return 'neutral';
    }
  }

  /**
   * Safe mapping adapter transforming order status values into design-system compatible enum types
   */
  protected mapStatusToChipType(status: SystemOrder['status']): StatusChipType {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'neutral';
    }
  }

  public onCancelOrder(orderId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Cancel Order',
        message: `Are you sure you want to cancel order ${orderId}? This action cannot be undone.`,
        confirmLabel: 'Cancel Order',
        cancelLabel: 'Keep Order',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.dashboardService.cancelOrder(orderId);
      }
    });
  }
}
