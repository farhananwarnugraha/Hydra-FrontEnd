import { APP_INITIALIZER, ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { JwtService } from './users/jwt.service';
import { AuthService } from './users/auth.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './users/jwt.interceptor';
import { EMPTY } from 'rxjs';

export function initAuth(){
  const jwtService = inject(JwtService);
  const  authService = inject(AuthService);
  return () => (jwtService.getToken() ? authService.getCurentUser() : EMPTY);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      multi: true
    }
  ]
};

export const environment = {
  apiUrl: 'https://localhost:7033/api/v1/'
};
