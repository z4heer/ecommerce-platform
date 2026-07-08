import { Injectable } from '@angular/core';

import { STORAGE_KEYS } from '../constants/storage.constants';

/**
 * ============================================================
 * Enterprise E-Commerce Platform
 * Storage Service
 * ============================================================
 *
 * Provides a centralized abstraction over browser storage.
 */
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly storage = window.localStorage;
  /**
   * Stores any serializable value.
   */
  setItem<T>(key: string, value: T): void {
    this.storage.setItem(key, JSON.stringify(value));
  }
  /**
   * Retrieves a value from storage.
   */
  getItem<T>(key: string): T | null {
    const item = this.storage.getItem(key);

    if (!item) {
      return null;
    }

    return JSON.parse(item) as T;
  }

  /**
   * Removes a storage item.
   */
  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  /**
   * Clears browser storage.
   */
  clear(): void {
    this.storage.clear();
  }

  /**
   * Stores JWT Access Token.
   */
  setAccessToken(token: string): void {
    this.storage.setItem(STORAGE_KEYS.AUTH.ACCESS_TOKEN, token);
  }

  /**
   * Returns JWT Access Token.
   */
  getAccessToken(): string | null {
    return this.storage.getItem(STORAGE_KEYS.AUTH.ACCESS_TOKEN);
  }

  /**
   * Stores Refresh Token.
   */
  setRefreshToken(token: string): void {
    this.storage.setItem(STORAGE_KEYS.AUTH.REFRESH_TOKEN, token);
  }

  /**
   * Returns Refresh Token.
   */
  getRefreshToken(): string | null {
    return this.storage.getItem(STORAGE_KEYS.AUTH.REFRESH_TOKEN);
  }

  /**
   * Removes authentication information.
   */
  clearAuthentication(): void {
    this.removeAccessToken();
    this.removeRefreshToken();
    this.clearUser();
    this.clearRole();
  }

  /**
   * Stores authenticated user.
   */
  setUser<T>(user: T): void {
    this.setItem(STORAGE_KEYS.USER.PROFILE, user);
  }

  /**
   * Returns authenticated user.
   */
  getUser<T>(): T | null {
    return this.getItem<T>(STORAGE_KEYS.USER.PROFILE);
  }

  /**
   * Returns true if user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
  setRole(role: string): void {
    this.setItem(STORAGE_KEYS.USER.ROLE, role);
  }

  getRole(): string | null {
    return this.getItem<string>(STORAGE_KEYS.USER.ROLE);
  }

  clearRole(): void {
    this.removeItem(STORAGE_KEYS.USER.ROLE);
  }
  /**
   * Returns true if Access Token exists.
   */
  hasAccessToken(): boolean {
    return !!this.getAccessToken();
  }

  /**
   * Removes Access Token.
   */
  removeAccessToken(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH.ACCESS_TOKEN);
  }

  /**
   * Removes Refresh Token.
   */
  removeRefreshToken(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH.REFRESH_TOKEN);
  }

  /**
   * Removes User Profile.
   */
  clearUser(): void {
    localStorage.removeItem(STORAGE_KEYS.USER.PROFILE);
  }
}
