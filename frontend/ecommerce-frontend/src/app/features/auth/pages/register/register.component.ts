import { Component, signal } from '@angular/core';

import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup
} from '@angular/forms';

import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';

import { AuthService } from '../../../../core/auth/services/auth.service';
import { environment } from '../../../../../environments/environment';

import {
  MatInputModule
} from '@angular/material/input';

import {
  MatButtonModule
} from '@angular/material/button';

// Enterprise Design System components
import { PageContainerComponent } from '../../../../layout/page-container/page-container.component';
import { PageHeaderComponent } from '../../../../layout/page-header/page-header.component';
import { AppCardComponent } from '../../../../shared/components/app-card/app-card.component';
import { LoadingSkeletonComponent } from '../../../../shared/components/loading-skeleton/loading-skeleton.component';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,

    // Design System
    PageContainerComponent,
    PageHeaderComponent,
    AppCardComponent,
    LoadingSkeletonComponent,
    ErrorStateComponent
  ],

  templateUrl: './register.component.html'
})
export class RegisterComponent {

  registerForm!: FormGroup;

  // Presentation only
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm =
      this.fb.group({

        //        first_name: ['', Validators.required],

        //        last_name: ['', Validators.required],

        email: [
          '',
          [Validators.required, Validators.email]
        ],

        password: [
          '',
          [Validators.required]
        ]
      });

  }

  onSubmit(): void {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.error.set(null);
    this.loading.set(true);

    this.authService
      .register(
        {
          ...this.registerForm.getRawValue(),
          role_id: environment.customerRoleId
        } as any
      )
      .subscribe({

        next: () => {
          this.loading.set(false);
          this.router.navigate(['/login']);
        },

        error: err => {
          console.error(err);
          const message = (err && (err.message || err.error?.message)) || 'Registration failed. Please try again.';
          this.error.set(message);
          this.loading.set(false);
        }
      });
  }
}