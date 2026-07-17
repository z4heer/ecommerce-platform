/**
 * ============================================================
 * Enterprise E-Commerce Platform
 * Development Environment
 * ============================================================
 *
 * Used only during development.
 */

export const environment = {
  production: false,

  app: {
    name: 'Enterprise E-Commerce Platform',
    version: '1.0.0',
  },

  api: {
    baseUrl: 'http://localhost:8000/api/v1',
    timeout: 30000,
  },
  customerRoleId: 'feb417c8-eb19-41e9-9ac9-f0ee08246ad2',

  http: {
    timeout: 30000,
  },

  logging: {
    enableConsole: true,
    enableHttpLogs: true,
  },

  features: {
    enableCaching: true,
    enableNotifications: true,
    enableDarkTheme: true,
  },
} as const;
