import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);

  // Routes publiques : pas d'Authorization
  if (req.url.endsWith('/auth') || req.url.endsWith('/subscribe')) {
    return next(req);
  }

  // Pas de token : on n'envoie pas de header du tout
  if (!authService.token) {
    return next(req);
  }

  const request = req.clone({
    setHeaders: { Authorization: `Bearer ${authService.token}` }
  });

  return next(request);
};