import { HttpInterceptorFn } from '@angular/common/http';

import { inject } from '@angular/core';

import { StorageService } from '../services/storage.service';

/**
 * ============================================================
 * Enterprise E-Commerce Platform
 * Authentication Interceptor
 * ============================================================
 *
 * Automatically attaches JWT access token to outgoing requests.
 */
export const AuthInterceptor: HttpInterceptorFn = (request, next) => {
  const storageService = inject(StorageService);

  const accessToken = storageService.getAccessToken();

  /**
   * Skip Authorization header if no token exists.
   */
  if (!accessToken) {
    return next(request);
  }

  /**
   * Clone immutable request.
   */
  const authenticatedRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log('AuthInterceptor: Attaching Authorization header to request.',
    authenticatedRequest.headers.get('Authorization')
  );
  return next(authenticatedRequest);
};
