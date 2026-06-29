/**
 * ============================================================
 * Enterprise E-Commerce Platform
 * Generic API Response Models
 * ============================================================
 */
import { PaginationMetadata } from './pagination.model';
/**
 * Generic wrapper for successful API responses.
 */
export interface ApiResponse<T> {

    /**
     * Indicates whether the request was successful.
     */
    success: boolean;

    /**
     * Human-readable message returned by the API.
     */
    message: string;

    /**
     * Payload returned by the server.
     */
    data: T;

    pagination: PaginationMetadata;

    /**
     * Optional server timestamp.
     */
    timestamp?: string;
}


/**
 * Generic paginated response.
 */
export interface PaginatedResponse<T> {

    success: boolean;

    message: string;

    data: T[];

    pagination: PaginationMetadata;

    timestamp?: string;
}