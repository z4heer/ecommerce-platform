import { Routes } from '@angular/router';

import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  //-------------------------------------------------------
  // Default Root Redirect (Fix for http://localhost:4200)
  //-------------------------------------------------------
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },

  //-------------------------------------------------------
  // Authentication Area
  //-------------------------------------------------------
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
      },
    ],
  },

  //-------------------------------------------------------
  // Protected Area
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
        canActivate: [authGuard],
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./features/products/product.routes').then(m => m.PRODUCT_ROUTES),
        canActivate: [authGuard],
      },
      {
        path: 'cart',
        loadChildren: () => import('./features/cart/cart.routes').then(m => m.CART_ROUTES),
        canActivate: [authGuard]
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./features/orders/orders.routes')
            .then(m => m.ORDERS_ROUTES),
        canActivate: [authGuard]
      },
      {
        path: 'checkout',
        loadChildren: () =>
          import('./features/checkout/checkout.routes')
            .then(m => m.CHECKOUT_ROUTES),
        canActivate: [authGuard]
      }
    ],
  },

  //-------------------------------------------------------
  // Wildcard Fallback
  //-------------------------------------------------------
  {
    path: '**',
    redirectTo: 'login',
  },
];
