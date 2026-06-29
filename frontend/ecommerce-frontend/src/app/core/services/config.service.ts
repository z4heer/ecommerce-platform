import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

/**
 * ============================================================
 * Enterprise E-Commerce Platform
 * Configuration Service
 * ============================================================
 *
 * Provides centralized access to application configuration.
 * Components and services should use this service instead of
 * importing the environment directly.
 */
@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    /**
     * Returns whether the application is running
     * in production mode.
     */
    get isProduction(): boolean {
        return environment.production;
    }

    /**
     * Application name.
     */
    get appName(): string {
        return environment.app.name;
    }

    /**
     * Application version.
     */
    get appVersion(): string {
        return environment.app.version;
    }

    /**
     * Base API URL.
     */
    get apiBaseUrl(): string {
        return environment.api.baseUrl;
    }

    /**
     * HTTP timeout.
     */
    get requestTimeout(): number {
        return environment.api.timeout;
    }

    /**
     * Console logging enabled.
     */
    get enableConsoleLogging(): boolean {
        return environment.logging.enableConsole;
    }

    /**
     * HTTP logging enabled.
     */
    get enableHttpLogging(): boolean {
        return environment.logging.enableHttpLogs;
    }

    /**
     * Browser cache enabled.
     */
    get enableCaching(): boolean {
        return environment.features.enableCaching;
    }

    /**
     * Snackbar notifications enabled.
     */
    get enableNotifications(): boolean {
        return environment.features.enableNotifications;
    }

    /**
     * Dark theme enabled.
     */
    get enableDarkTheme(): boolean {
        return environment.features.enableDarkTheme;
    }
}