export interface EnvironmentStatus {
    api: 'UP' | 'DOWN';
    postgres: 'UP' | 'DOWN';
    redis: 'UP' | 'DOWN';
}
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EnvironmentStatus {
    api: 'UP' | 'DOWN';
    postgres: 'UP' | 'DOWN';
    redis: 'UP' | 'DOWN';
}

@Injectable({
    providedIn: 'root'
})
export class EnvironmentService {

    private readonly http = inject(HttpClient);

    check(): Observable<EnvironmentStatus> {
        return this.http.get<EnvironmentStatus>('/health');
    }
}