import { Routes } from '@angular/router';
import { ProfileDashboardComponent } from './pages/profile-dashboard/profile-dashboard.component';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    component: ProfileDashboardComponent,
    title: 'User Profile - E-Commerce',
  },
];
