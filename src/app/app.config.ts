import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { JwtService } from './users/jwt.service';
import { AuthService } from './users/auth.service';
import { provideHttpClient } from '@angular/common/http';

export function initAuth(){
  const jwtService = inject(JwtService);
  const  authService = inject(AuthService);
  return () => (jwtService.getToken())
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ]
};

export const environment = {
  apiUrl: 'https://localhost:7033/api/v1/'
};
