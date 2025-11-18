import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  const userRole = auth.getUserRole();
  const allowedRoles = (route.data?.['roles'] || []) as string[];

  if (!userRole) {
    router.navigate(['/login']);
    return false;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
