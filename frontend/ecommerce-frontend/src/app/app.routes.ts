import { Routes } from '@angular/router';

import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { rootGuard } from './core/guards/root.guard';

export const routes: Routes = [
  //-------------------------------------------------------
  // Root URL Dynamic Redirect (http://localhost:4200/)
  //-------------------------------------------------------
  {
    path: '',
    pathMatch: 'full',
    canActivate: [rootGuard],
    children: [],
  },

  //-------------------------------------------------------
  // Authentication Area (Guest Only: /login, /register)
  //-------------------------------------------------------
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [guestGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
      },
    ],
  },

  //-------------------------------------------------------
  // Protected Area (Auth Only: /products, /dashboard, etc.)
  //-------------------------------------------------------
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./features/products/product.routes').then(m => m.PRODUCT_ROUTES),
      },
      {
        path: 'cart',
        loadChildren: () => import('./features/cart/cart.routes').then(m => m.CART_ROUTES),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./features/orders/orders.routes').then(m => m.ORDERS_ROUTES),
      },
      {
        path: 'checkout',
        loadChildren: () =>
          import('./features/checkout/checkout.routes').then(m => m.CHECKOUT_ROUTES),
      },
    ],
  },

  //-------------------------------------------------------
  // Wildcard Fallback
  //-------------------------------------------------------
  {
    path: '**',
    canActivate: [rootGuard],
    children: [],
  },
];
