import { inject } from '@angular/core';

import {
    CanActivateFn,
    Router
} from '@angular/router';

export const adminGuard:
    CanActivateFn = () => {

        const role =
            localStorage.getItem('role');

        const router =
            inject(Router);

        if (role === 'ADMIN') {
            return true;
        }

        return router.createUrlTree(
            ['/']
        );
    };