import { Injectable } from '@angular/core';

import { ConfigService } from './config.service';

/**
 * ============================================================
 * Enterprise E-Commerce Platform
 * Logger Service
 * ============================================================
 *
 * Centralized application logging service.
 * All application logging should go through this service.
 */
@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Logs informational messages.
   */
  info(message: string, data?: unknown): void {
    if (!this.configService.enableConsoleLogging) {
      return;
    }

    console.info(`[INFO] ${message}`, data ?? '');
  }

  /**
   * Logs warning messages.
   */
  warn(message: string, data?: unknown): void {
    if (!this.configService.enableConsoleLogging) {
      return;
    }

    console.warn(`[WARN] ${message}`, data ?? '');
  }

  /**
   * Logs error messages.
   */
  error(message: string, error?: unknown): void {
    if (!this.configService.enableConsoleLogging) {
      return;
    }

    console.error(`[ERROR] ${message}`, error ?? '');
  }

  /**
   * Logs debug messages.
   * Visible only in development mode.
   */
  debug(message: string, data?: unknown): void {
    if (!this.configService.enableConsoleLogging) {
      return;
    }

    if (this.configService.isProduction) {
      return;
    }

    console.debug(`[DEBUG] ${message}`, data ?? '');
  }
}
