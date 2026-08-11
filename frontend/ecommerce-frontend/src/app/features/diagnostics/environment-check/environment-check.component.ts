import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
  computed
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import {
  EnvironmentService,
  EnvironmentStatus
} from '../../../core/services/environment.service';
import { MatCardModule } from '@angular/material/card';
import { LoadingSkeletonComponent } from '../../../shared/components/loading-skeleton/loading-skeleton.component';

@Component({
  selector: 'app-environment-check',
  standalone: true,
  imports: [
    MatCardModule, LoadingSkeletonComponent
  ],
  templateUrl: './environment-check.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnvironmentCheckComponent implements OnInit {

  private readonly environmentService = inject(EnvironmentService);

  readonly loading = signal(true);

  readonly environment = signal<EnvironmentStatus | null>(null);

  readonly error = signal<string | null>(null);

  readonly isHealthy = computed(() => {

    const env = this.environment();

    return !!env &&
      env.api === 'UP' &&
      env.postgres === 'UP' &&
      env.redis === 'UP';

  });

  ngOnInit(): void {
    this.loadEnvironmentStatus();
  }

  private loadEnvironmentStatus(): void {

    this.loading.set(true);

    this.environmentService
      .check()
      .pipe(
        finalize(() => this.loading.set(false))
      )
      .subscribe({

        next: response => {

          this.environment.set(response);

          this.error.set(null);

        },

        error: () => {

          this.environment.set(null);

          this.error.set(
            'Unable to connect to backend services.'
          );

        }

      });

  }

}