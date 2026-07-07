import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoggerService } from './logger.service';

/**
 * ============================================================
 * Enterprise E-Commerce Platform
 * Loading Service
 * ============================================================
 *
 * Tracks active HTTP requests and exposes a global loading state.
 */
@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  /**
   * Number of active HTTP requests.
   */
  private activeRequests = 0;
  private readonly logger = inject(LoggerService);

  /**
   * Internal loading state.
   */
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);

  /**
   * Public loading stream.
   */
  readonly loading$: Observable<boolean> = this.loadingSubject.asObservable();

  /**
   * Increments active request count.
   */
  show(): void {
    this.activeRequests++;

    if (this.activeRequests === 1) {
      this.logger.info('Loading started');
      this.loadingSubject.next(true);
    }
  }

  /**
   * Decrements active request count.
   */
  hide(): void {
    if (this.activeRequests > 0) {
      this.activeRequests--;
    }

    if (this.activeRequests === 0) {
      this.logger.info('Loading completed');

      this.loadingSubject.next(false);
    }
  }

  /**
   * Resets loading state.
   */
  reset(): void {
    this.activeRequests = 0;

    this.loadingSubject.next(false);
  }

  /**
   * Current loading state.
   */
  get isLoading(): boolean {
    return this.loadingSubject.value;
  }
}
