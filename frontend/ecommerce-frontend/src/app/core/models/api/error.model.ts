/**
 * ============================================================
 * Enterprise E-Commerce Platform
 * Error Models
 * ============================================================
 */

/**
 * Represents a validation error for a specific field.
 */
export interface ValidationError {
  /**
   * Field name that failed validation.
   */
  field: string;

  /**
   * Validation error message.
   */
  message: string;
}

/**
 * Standard application error.
 */
export interface AppError {
  /**
   * HTTP status code.
   */
  status: number;

  /**
   * Error title.
   */
  title: string;

  /**
   * User-friendly message.
   */
  message: string;

  /**
   * Optional backend error code.
   */
  errorCode?: string;

  /**
   * Optional validation errors.
   */
  validationErrors?: ValidationError[];

  /**
   * Request timestamp.
   */
  timestamp?: string;

  /**
   * Request path.
   */
  path?: string;
}
