import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from './core/services/loading.service';
import { LoggerService } from './core/services/logger.service';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import {
  Router,
  NavigationStart
} from '@angular/router';

import { filter } from 'rxjs/operators';

import { SecurityAuditService } from './core/security/SecurityAuditService';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ecommerce-frontend';
  protected readonly loadingService = inject(LoadingService);
  protected readonly logger = inject(LoggerService);
  protected readonly securityAudit = inject(SecurityAuditService);
  protected readonly router = inject(Router);

  ngOnInit(): void {
    this.loadingService.show();
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationStart)
      )
      .subscribe(() => {

        this.securityAudit.logTokenStatus();

      });
    setTimeout(() => {
      this.loadingService.hide();
    }, 3000);
  }

  constructor() { }
}
