import { Routes } from '@angular/router';
import { CustomerDirectoryComponent } from './pages/customer-directory/customer-directory.component';

export const CUSTOMERS_ROUTES: Routes = [
  {
    path: '',
    component: CustomerDirectoryComponent,
    title: 'Admin - Customer Directory',
  }
];
