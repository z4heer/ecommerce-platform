import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

/**
 * ============================================================
 * Enterprise E-Commerce Platform
 * Authentication Interceptor
 * ============================================================
 *
 * Automatically attaches JWT access token to outgoing requests
 * except for public authentication endpoints (login/register).
 */
export const AuthInterceptor: HttpInterceptorFn = (request, next) => {
  const storageService = inject(StorageService);
  const accessToken = storageService.getAccessToken();

  // Skip attaching Authorization header if no token or for public auth endpoints
  if (
    !accessToken ||
    request.url.includes('/auth/login') ||
    request.url.includes('/auth/register')
  ) {
    return next(request);
  }

  const authenticatedRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return next(authenticatedRequest);
};
