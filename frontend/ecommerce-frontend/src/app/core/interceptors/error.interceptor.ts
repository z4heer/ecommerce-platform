import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';

import { inject } from '@angular/core';

import { catchError, throwError } from 'rxjs';

import { AppError } from '../models/api/error.model';
import { LoggerService } from '../services/logger.service';

/**
 * ============================================================
 * Enterprise Error Interceptor
 * ============================================================
 *
 * Converts HTTP errors into a standard AppError model.
 */
export const ErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const logger = inject(LoggerService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      const appError: AppError = {
        status: error.status,

        title: getTitle(error.status),

        message: getMessage(error),

        timestamp: new Date().toISOString(),

        path: request.url,
      };

      logger.error(appError.title, appError);

      return throwError(() => appError);
    }),
  );
};

/**
 * Maps HTTP status codes to titles.
 */
function getTitle(status: number): string {
  switch (status) {
    case 400:
      return 'Bad Request';

    case 401:
      return 'Unauthorized';

    case 403:
      return 'Forbidden';

    case 404:
      return 'Not Found';

    case 409:
      return 'Conflict';

    case 422:
      return 'Validation Error';

    case 500:
      return 'Internal Server Error';

    default:
      return 'Unexpected Error';
  }
}

/**
 * Extracts a user-friendly message.
 */
function getMessage(error: HttpErrorResponse): string {
  if (typeof error.error === 'string') {
    return error.error;
  }

  if (error.error?.message) {
    return error.error.message;
  }

  if (error.error?.detail) {
    if (typeof error.error.detail === 'string') {
      return error.error.detail;
    }

    return 'Validation failed.';
  }

  return error.message || 'An unexpected error occurred.';
}
