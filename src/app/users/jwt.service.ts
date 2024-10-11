import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  getToken():void{
    return window.localStorage['token_access'];
  }

  setToken(token:string):void{
    window.localStorage['token_access'] = token;
  }
}
