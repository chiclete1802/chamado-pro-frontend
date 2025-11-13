import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { jwtDecode } from 'jwt-decode';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const token = auth.getToken();

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    const decoded: any = jwtDecode(token);
    const userRole = decoded.role;
    const allowedRoles = (route.data?.['roles'] || []) as string[];

    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
      router.navigate(['/']);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Erro ao decodificar token:', err);
    router.navigate(['/login']);
    return false;
  }
};
