import { Injectable, inject, isDevMode } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class SecurityAuditService {

    private readonly storage = inject(StorageService);

    logTokenStatus(): void {

        if (!isDevMode()) {
            return;
        }

        console.groupCollapsed('[Security Audit]');

        console.table({
            accessToken: this.storage.getAccessToken() ? 'Present' : 'Missing',
            refreshToken: this.storage.getRefreshToken() ? 'Present' : 'Missing'
        });

        console.groupEnd();
    }
}