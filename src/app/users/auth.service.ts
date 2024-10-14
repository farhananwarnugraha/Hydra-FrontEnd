import { inject, Injectable } from '@angular/core';
import { environment } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { BehaviorSubject, map } from 'rxjs';
import { InfoUser } from './users.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _apiUrl  = `${environment.apiUrl}/auth`;
  private http = inject(HttpClient);
  private jwtService = inject(JwtService);
  private _loggedinUserSubject = new BehaviorSubject<InfoUser | null>(null);
  currentUser$ = this._loggedinUserSubject.asObservable();
  isLoggedIn$ = this.currentUser$.pipe(map(user => user !== null));
  constructor() { }
}
