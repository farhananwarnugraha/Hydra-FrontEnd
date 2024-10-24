import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../app.config';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { PageResponse, PageResponseDinamis } from '../../shared/page-response';
import { BootcampClass } from './bootcamp.model';

@Injectable({
  providedIn: 'root'
})
export class BootcampService {
  private _http = inject(HttpClient)
  private _apiBootcamp = `${environment.apiUrl}bootcamp`

  getAllBootcampClass(params: Params): Observable<PageResponseDinamis<BootcampClass>>{
    const activedParams = Object.keys(params)
    .filter((key) => params[key] !== null)
    .reduce<Params>((activeParams, paramName) => {
      activeParams[paramName] = params[paramName];
      return activeParams;
    }, {});

    return this._http.get<PageResponseDinamis<BootcampClass>>(this._apiBootcamp, {
      params: activedParams
    })
  }
}
