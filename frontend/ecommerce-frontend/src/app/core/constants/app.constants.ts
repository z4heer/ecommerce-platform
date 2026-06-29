/**
 * ============================================================
 * Enterprise E-Commerce Platform
 * Application Constants
 * ============================================================
 * Centralized application-wide constants.
 * Avoid hard-coded values throughout the application.
 */

export const APP_CONSTANTS = {

    APP_NAME: 'Enterprise E-Commerce Platform',

    APP_VERSION: '1.0.0',

    COMPANY_NAME: 'Enterprise Solutions',

    DEFAULT_LANGUAGE: 'en',

    DEFAULT_CURRENCY: 'INR',

    DEFAULT_DATE_FORMAT: 'dd/MM/yyyy',

    DEFAULT_PAGE_SIZE: 10,

    MAX_PAGE_SIZE: 100,

    REQUEST_TIMEOUT: 30000,

    DEBOUNCE_TIME: 400,

    SNACKBAR_DURATION: 3000,

    CACHE_DURATION: 300000,

    IMAGE_PLACEHOLDER: 'assets/images/image-placeholder.png',

    USER_AVATAR: 'assets/images/default-avatar.png'

} as const;