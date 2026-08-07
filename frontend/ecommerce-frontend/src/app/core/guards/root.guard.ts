import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

/**
 * ============================================================
 * Enterprise Root Navigation Guard
 * ============================================================
 * Handles root URL (http://localhost:4200/) routing:
 * - Authenticated users -> Redirects to /products
 * - Unauthenticated users -> Redirects to /login
 */
export const rootGuard: CanActivateFn = (): UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return router.createUrlTree(['/products']);
  }

  return router.createUrlTree(['/login']);
};
