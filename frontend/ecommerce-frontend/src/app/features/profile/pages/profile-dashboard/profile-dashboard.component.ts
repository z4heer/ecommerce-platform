import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-profile-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileDashboardComponent {
  private readonly authService = inject(AuthService);
  readonly user$ = this.authService.currentUser$;
}
