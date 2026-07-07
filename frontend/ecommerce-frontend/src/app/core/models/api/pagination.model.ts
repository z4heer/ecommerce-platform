/**
 * ============================================================
 * Enterprise E-Commerce Platform
 * Pagination Models
 * ============================================================
 */

/**
 * Request parameters used when querying paginated resources.
 */
export interface PageRequest {
  /**
   * Zero-based page index.
   */
  page: number;

  /**
   * Number of records per page.
   */
  size: number;

  /**
   * Optional sort field.
   */
  sortBy?: string;

  /**
   * Sort direction.
   */
  sortDirection?: 'asc' | 'desc';

  /**
   * Optional search text.
   */
  search?: string;
}

/**
 * Pagination metadata returned by the backend.
 */
export interface PaginationMetadata {
  /**
   * Current page number.
   */
  page: number;

  /**
   * Requested page size.
   */
  pageSize: number;

  /**
   * Total records.
   */
  totalItems: number;

  /**
   * Total number of pages.
   */
  totalPages: number;

  /**
   * Indicates if a previous page exists.
   */
  hasPrevious: boolean;

  /**
   * Indicates if a next page exists.
   */
  hasNext: boolean;
}
