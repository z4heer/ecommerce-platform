import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../core/services/loading.service';
import { LoggerService } from '../../core/services/logger.service';
import { PageContainerComponent } from '../../layout/page-container/page-container.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PageContainerComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
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