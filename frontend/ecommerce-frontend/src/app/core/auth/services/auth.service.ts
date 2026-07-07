import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, tap } from 'rxjs';

import { RegisterRequest } from '../models/register-request.model';
import { AuthResponse } from '../models/auth.model';

import { API_ENDPOINTS } from '../../../core/constants/api-endpoints.constants';
import { LoginRequest } from '../models/auth.model';
import { StorageService } from '../../services/storage.service';
import { LoggerService } from '../../../core/services/logger.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly storage = inject(StorageService);

  private readonly logger = inject(LoggerService);

  /**
   * ===================================================
   * Authentication State
   * ===================================================
   */

  private readonly authenticatedSubject = new BehaviorSubject<boolean>(
    this.storage.isAuthenticated(),
  );

  readonly isAuthenticated$ = this.authenticatedSubject.asObservable();

  /**
   * ===================================================
   * Register
   * ===================================================
   */

  register(request: RegisterRequest): Observable<AuthResponse> {
    this.logger.info('Register request started.');

    return this.http.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, request);
  }

  /**
   * ===================================================
   * Login
   * ===================================================
   */

  login(request: LoginRequest): Observable<AuthResponse> {
    this.logger.info('Login request started.');

    return this.http.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, request).pipe(
      tap(response => {
        this.storage.setAccessToken(response.access_token);

        if (response.refresh_token) {
          this.storage.setRefreshToken(response.refresh_token);
        }

        this.authenticatedSubject.next(true);

        this.logger.info('Login successful.');
      }),
    );
  }

  /**
   * ===================================================
   * Logout
   * ===================================================
   */

  logout(): void {
    this.logger.info('Storage before logout', {
      accessToken: this.storage.getAccessToken(),
      refreshToken: this.storage.getRefreshToken(),
      user: this.storage.getUser(),
    });
    this.storage.clearAuthentication();
    this.authenticatedSubject.next(false);
    this.logger.info('User logged out..');
    this.logger.info('Storage After logout', {
      accessToken: this.storage.getAccessToken(),
      refreshToken: this.storage.getRefreshToken(),
      user: this.storage.getUser(),
    });
  }

  /**
   * ===================================================
   * Access Token
   * ===================================================
   */

  getAccessToken(): string | null {
    return this.storage.getAccessToken();
  }

  /**
   * ===================================================
   * Current Authentication State
   * ===================================================
   */

  isAuthenticated(): boolean {
    return this.storage.isAuthenticated();
  }
}
