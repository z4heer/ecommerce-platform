import { Routes } from '@angular/router';
import { LowStockReportComponent } from './pages/low-stock-report/low-stock-report.component';

export const REPORTS_ROUTES: Routes = [
  {
    path: '',
    component: LowStockReportComponent,
    title: 'Admin - Executive Reports',
  }
];
