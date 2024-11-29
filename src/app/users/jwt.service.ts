import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  setToken(token:string):void{
    localStorage.setItem('token_access', token);
  }
  getToken():string | null {
    // var token = localStorage.getItem('token_access');
    // return token;
  //  return window.localStorage['token_access'];
    return window.localStorage['token_access'];
  }

  isAuthenticated():boolean{
    return !!this.getToken();
  }

  removeToken():void{
    window.localStorage.removeItem('token_access');
  }
}
