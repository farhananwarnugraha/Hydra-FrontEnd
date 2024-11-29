import { Injectable } from '@angular/core';
import { environment } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { InfoUser, LoginCredential, RegisterCredential, Response } from './users.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _apiUrl = `${environment.apiUrl}`;
  private _loggedinUserSubject = new BehaviorSubject<InfoUser | null>(null);
  currentUser$ = this._loggedinUserSubject.asObservable();
  isLoggedIn$ = this.currentUser$.pipe(map(user => user !== null));

  constructor(private http: HttpClient,private jwtService: JwtService) { }

  register(credential: RegisterCredential):Observable<Response<string>>{
    return this.http.post<Response<string>>(`${this._apiUrl}register`, credential);
  }

  login(credential: LoginCredential): Observable<Response<InfoUser>> {
    return this.http.post<Response<InfoUser>>(`${this._apiUrl}login`, credential).pipe(
      tap((user) => {
        this.setAuth(user.data);
        console.log(user)
        console.log(user.data.token);
      })
    );
  }

  logOut():void{
    this.purgeAuth();
  }

  setAuth(user: InfoUser) {
    if (!user) return;
    this._loggedinUserSubject.next(user);
    this.jwtService.setToken(user.token);
  }

  purgeAuth() {
    this.jwtService.removeToken()
    this._loggedinUserSubject.next(null);
  }

  getCurentUser(): Observable<Response<InfoUser>>{
    return this.http.get<Response<InfoUser>>(`${this._apiUrl}getCurrentUser`)
    .pipe(
      tap({
        next: (user) =>{
          this.setAuth(user.data);
          // console.log(user.token);
        },
        error: () => this.purgeAuth()
      })
    );
    // tap((user) => {
    //   console.log(user)
    //   this.setAuth(user)
    // })
  }
}
