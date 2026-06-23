import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { LoginRequest, AuthResponse } from '../models/auth.model';
import { RegisterRequest } from '../models/register-request.model';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly API_URL =
        'http://localhost:8000/api/v1/auth';

    private currentUserSubject =
        new BehaviorSubject<boolean>(this.hasToken());

    isAuthenticated$ =
        this.currentUserSubject.asObservable();

    constructor(
        private http: HttpClient
    ) { }

    register(
        payload: RegisterRequest
    ): Observable<any> {

        return this.http.post(
            `${this.API_URL}/register`,
            payload
        );
    }

    login(
        payload: LoginRequest
    ): Observable<AuthResponse> {

        return this.http
            .post<AuthResponse>(
                `${this.API_URL}/login`,
                payload
            )
            .pipe(
                tap(response => {

                    localStorage.setItem(
                        'access_token',
                        response.access_token
                    );

                    this.currentUserSubject.next(true);
                })
            );
    }

    logout(): void {

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        this.currentUserSubject.next(false);
    }

    getToken(): string | null {

        return localStorage.getItem(
            'access_token'
        );
    }

    isLoggedIn(): boolean {

        return !!this.getToken();
    }

    private hasToken(): boolean {

        return !!localStorage.getItem(
            'access_token'
        );
    }
}