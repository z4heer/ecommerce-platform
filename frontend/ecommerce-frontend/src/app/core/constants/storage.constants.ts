/**
 * ============================================================
 * Enterprise E-Commerce Platform
 * Storage Constants
 * ============================================================
 * Centralized browser storage keys.
 *
 * Used by:
 * - Authentication
 * - User Profile
 * - Preferences
 * - Theme
 * - Cache
 */

export const STORAGE_KEYS = {
  AUTH: {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    TOKEN_EXPIRY: 'token_expiry',
  },

  USER: {
    PROFILE: 'user_profile',
    PERMISSIONS: 'user_permissions',
    ROLE: 'user_role',
  },

  APP: {
    THEME: 'app_theme',
    LANGUAGE: 'app_language',
    SIDEBAR_STATE: 'sidebar_state',
  },

  CACHE: {
    PRODUCTS: 'products_cache',
    CATEGORIES: 'categories_cache',
  },
} as const;
