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
  customerRoleId: 'ff7a5590-34d8-4574-81ff-3035d88443e1',
  auth: {
    accessTokenKey: 'access_token',

    refreshTokenKey: 'refresh_token',
  },

  logging: {
    enableConsole: true,
    enableHttpLogs: true,
  },

  features: {
    enableCaching: true,

    enableNotifications: true,

    enableDarkTheme: false,
  },
} as const;
