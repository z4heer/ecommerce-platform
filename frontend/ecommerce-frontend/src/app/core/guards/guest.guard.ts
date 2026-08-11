import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

/**
 * ============================================================
 * Enterprise Guest Guard
 * ============================================================
 * Prevents authenticated users from accessing guest routes
 * like /login and /register, redirecting them to /products.
 */
export const guestGuard: CanActivateFn = (): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return router.createUrlTree(['/products']);
  }

  return true;
};
