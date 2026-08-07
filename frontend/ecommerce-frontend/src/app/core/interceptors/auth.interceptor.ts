import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';

/**
 * ============================================================
 * Enterprise E-Commerce Platform
 * Authentication Interceptor
 * ============================================================
 *
 * Automatically attaches JWT access token to outgoing requests
 * except for public authentication endpoints (login/register).
 * Catch 401 Unauthorized errors to clear state and redirect to /login.
 */
export const AuthInterceptor: HttpInterceptorFn = (request, next) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  const accessToken = storageService.getAccessToken();

  let authenticatedRequest = request;

  // Attach Authorization header if token exists and not a public auth endpoint
  if (
    accessToken &&
    !request.url.includes('/auth/login') &&
    !request.url.includes('/auth/register')
  ) {
    authenticatedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return next(authenticatedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !request.url.includes('/auth/login')) {
        storageService.clearAuthentication();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
