import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';

import { authGuard } from './auth.guard';
import { AuthService } from '../auth/services/auth.service';
import { LoggerService } from '../services/logger.service';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

const route = {} as ActivatedRouteSnapshot;
const state = {} as RouterStateSnapshot;

describe('AuthGuard', () => {

    let authService: jasmine.SpyObj<AuthService>;
    let router: jasmine.SpyObj<Router>;
    let logger: jasmine.SpyObj<LoggerService>;
    authGuard
    beforeEach(() => {

        authService = jasmine.createSpyObj<AuthService>(
            'AuthService',
            ['isAuthenticated']
        );

        router = jasmine.createSpyObj<Router>(
            'Router',
            ['createUrlTree']
        );

        logger = jasmine.createSpyObj<LoggerService>(
            'LoggerService',
            ['debug', 'warn']
        );

        TestBed.configureTestingModule({
            providers: [
                {
                    provide: AuthService,
                    useValue: authService
                },
                {
                    provide: Router,
                    useValue: router
                },
                {
                    provide: LoggerService,
                    useValue: logger
                }
            ]
        });

    });

    it('should allow authenticated users', () => {

        authService.isAuthenticated.and.returnValue(true);

        const result = TestBed.runInInjectionContext(() => authGuard(route, state));

        expect(result).toBeTrue();
        expect(logger.debug).toHaveBeenCalledWith('Authentication successful.');

    });

    it('should redirect unauthenticated users to login', () => {

        const urlTree = {} as UrlTree;

        authService.isAuthenticated.and.returnValue(false);

        router.createUrlTree.and.returnValue(urlTree);

        const result = TestBed.runInInjectionContext(() => authGuard(route, state));

        expect(router.createUrlTree)
            .toHaveBeenCalledWith(['/login']);

        expect(result).toBe(urlTree);

        expect(logger.warn)
            .toHaveBeenCalledWith('Unauthorized access. Redirecting to login.');

    });

});