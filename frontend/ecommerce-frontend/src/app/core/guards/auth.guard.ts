import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { LoggerService } from '../services/logger.service';

/**
 * ============================================================
 * Enterprise Authentication Guard
 * ============================================================
 *
 * Prevents unauthenticated users from accessing
 * protected routes.
 */
export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const logger = inject(LoggerService);

  if (authService.isAuthenticated()) {
    logger.debug('Authentication successful.');
    return true;
  }

  logger.warn('Unauthorized access. Redirecting to login.');

  return router.createUrlTree(['/login']);
};
