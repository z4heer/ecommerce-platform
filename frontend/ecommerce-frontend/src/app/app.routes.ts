import { Routes } from '@angular/router';

import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

    //-------------------------------------------------------
    // Authentication Area
    //-------------------------------------------------------
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./features/auth/auth.routes')
                        .then(m => m.AUTH_ROUTES)
            }
        ]
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
                    import('./features/dashboard/dashboard.routes')
                        .then(m => m.DASHBOARD_ROUTES)
            },
            {
                path: 'products',
                loadChildren: () =>
                    import('./features/products/product.routes')
                        .then(m => m.PRODUCT_ROUTES)
            },
            /*            {
            
                            path: 'orders',
            
                            loadChildren: () =>
                                import('./features/orders/order.routes')
                                    .then(m => m.ORDER_ROUTES)
            
                        },
            
                        {
            
                            path: 'cart',
            
                            loadChildren: () =>
                                import('./features/cart/cart.routes')
                                    .then(m => m.CART_ROUTES)
            
                        }
            */
        ]

    },

    //-------------------------------------------------------
    // Default
    //-------------------------------------------------------

    {

        path: '',

        pathMatch: 'full',

        redirectTo: 'dashboard'

    },

    //-------------------------------------------------------
    // Wildcard
    //-------------------------------------------------------

    {

        path: '**',

        redirectTo: 'dashboard'

    }

];