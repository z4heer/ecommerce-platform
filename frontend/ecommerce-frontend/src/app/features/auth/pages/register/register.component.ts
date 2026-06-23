import { Component } from '@angular/core';

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
  MatCardModule
} from '@angular/material/card';

import {
  MatInputModule
} from '@angular/material/input';

import {
  MatButtonModule
} from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],

  templateUrl: './register.component.html'
})
export class RegisterComponent {

  registerForm!: FormGroup;

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
      return;
    }

    this.authService
      .register(
        {
          ...this.registerForm.getRawValue(),
          role_id: environment.customerRoleId
        } as any
      )
      .subscribe({

        next: () => {
          this.router.navigate(['/login']);
        },

        error: err => {
          console.error(err);
        }
      });
  }
}