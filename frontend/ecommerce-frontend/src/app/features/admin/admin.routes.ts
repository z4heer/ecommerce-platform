import { Routes } from '@angular/router';
import { AdminOrdersComponent } from './pages/admin-orders/admin-orders.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'orders',
    component: AdminOrdersComponent,
    title: 'Admin - Order Management',
  }
];
