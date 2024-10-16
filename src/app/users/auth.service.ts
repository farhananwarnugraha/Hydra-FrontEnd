import { Injectable } from '@angular/core';
import { environment } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { InfoUser, LoginCredential, Response } from './users.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _apiUrl = `${environment.apiUrl}`;
  private _loggedinUserSubject = new BehaviorSubject<InfoUser | null>(null);
  currentUser$ = this._loggedinUserSubject.asObservable();
  isLoggedIn$ = this.currentUser$.pipe(map(user => user !== null));

  constructor(private http: HttpClient,private jwtService: JwtService) { }
  login(credential: LoginCredential): Observable<Response<InfoUser>> {
    return this.http.post<Response<InfoUser>>(`${this._apiUrl}login`, credential).pipe(
      tap((user) => {
        this.setAuth(user.data);
        console.log(user)
        console.log(user.data.token);
      })
    );
  }

  setAuth(user: InfoUser) {
    if (!user) return;
    this._loggedinUserSubject.next(user);
    this.jwtService.setToken(user.token);
  }

  purgeAuth() {
    this.jwtService.removeToken();
    this._loggedinUserSubject.next(null);
  }
}
