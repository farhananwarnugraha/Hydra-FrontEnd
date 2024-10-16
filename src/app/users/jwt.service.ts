import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  getToken():string | null{
    return window.localStorage['token_access'];
  }

  setToken(token:string):void{
    localStorage.setItem('token_access', token);
  }

  isAuthenticated():boolean{
    return !!this.getToken();
  }

  removeToken():void{
    window.localStorage.removeItem('token_access');
  }
}
