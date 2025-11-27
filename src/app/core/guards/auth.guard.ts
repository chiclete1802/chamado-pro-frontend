import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

export const authGuard: CanActivateFn = (route?: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  const userRole = auth.getUserRole();

  if (!userRole) {
    router.navigate(['/login']);
    return false;
  }

  if (route?.routeConfig?.path === '') {
    if (userRole === 'ADMIN') {
      router.navigate(['/chamados']);
    } else if (userRole === 'CLIENTE' || userRole === 'TECNICO') {
      router.navigate(['/meus-chamados']);
    } else {
      router.navigate(['/login']);
    }
    return false;
  }

  const allowedRoles = (route?.data?.['roles'] || []) as string[];

  if (allowedRoles.length && !allowedRoles.includes(userRole)) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
