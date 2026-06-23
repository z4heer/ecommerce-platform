import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Router } from '@angular/router';

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

  logout() {

    this.authService.logout();
    console.log('Logged out successfully');

    this.router.navigate(['/login']);

  }
}