import { inject } from '@angular/core';

import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const adminGuard: CanActivateFn = () => {
  //const role = localStorage.getItem('role');
  const storage = inject(StorageService);
  const role = storage.getRole();
  const router = inject(Router);

  if (role === 'ADMIN') {
    return true;
  }

  return router.createUrlTree(['/']);
};
