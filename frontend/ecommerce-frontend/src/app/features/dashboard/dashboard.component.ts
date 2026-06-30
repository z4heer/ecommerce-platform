import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../core/services/loading.service';
import { LoggerService } from '../../core/services/logger.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <h1>Authentication Successful</h1>
    <h2>Login Successful</h2>
    <p>Authentication Phase Complete</p>
    <p>JWT Login Working</p>
    <button (click)="logout()">
      Logout
    </button>
  `
})
export class DashboardComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  protected loadingService: LoadingService = new LoadingService();
  private readonly logger = inject(LoggerService);
  logout() {

    this.authService.logout();
    this.logger.info('User logged out successfully');
    this.router.navigate(['/login']);

  }
}