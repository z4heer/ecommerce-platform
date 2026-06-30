import { environment } from '../../../environments/environment';

/**
 * ============================================================
 * Enterprise E-Commerce Platform
 * API Endpoint Constants
 * ============================================================
 * Centralized API endpoint definitions.
 * All HTTP services should use these constants instead of
 * hard-coded URLs.
 */

const BASE_API_URL = environment.api.baseUrl;

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: `${BASE_API_URL}/auth/login`,
        REGISTER: `${BASE_API_URL}/auth/register`,
        REFRESH_TOKEN: `${BASE_API_URL}/auth/refresh`,
        LOGOUT: `${BASE_API_URL}/auth/logout`,
        PROFILE: `${BASE_API_URL}/auth/me`
    },

    PRODUCTS: {
        BASE: `${BASE_API_URL}/products`,
        BY_ID: (id: string) => `${BASE_API_URL}/products/${id}`,
        SEARCH: `${BASE_API_URL}/products/search`,
        CATEGORY: (category: string) =>
            `${BASE_API_URL}/products/category/${category}`
    },

    ORDERS: {
        BASE: `${BASE_API_URL}/orders`,
        BY_ID: (id: string) => `${BASE_API_URL}/orders/${id}`,
        USER_ORDERS: `${BASE_API_URL}/orders/user`
    },

    CART: {
        BASE: `${BASE_API_URL}/cart`,
        ITEM: (productId: string) =>
            `${BASE_API_URL}/cart/${productId}`
    },

    ADMIN: {
        DASHBOARD: `${BASE_API_URL}/admin/dashboard`,
        USERS: `${BASE_API_URL}/admin/users`,
        PRODUCTS: `${BASE_API_URL}/admin/products`,
        ORDERS: `${BASE_API_URL}/admin/orders`
    }
} as const;