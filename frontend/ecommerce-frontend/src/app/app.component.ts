import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from './core/services/loading.service';
import { LoggerService } from './core/services/logger.service';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecommerce-frontend';
  protected readonly loadingService = inject(LoadingService);
  protected readonly logger = inject(LoggerService);

  ngOnInit(): void {

    this.loadingService.show();

    setTimeout(() => {

      this.loadingService.hide();

    }, 3000);

  }
  constructor() {
  }
}
