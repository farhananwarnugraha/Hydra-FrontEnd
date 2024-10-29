import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../app.config';
import { Params } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { PageResponse, PageResponseDinamis } from '../../shared/page-response';
import { BootcampClass, bootcampClasses, BootcampForm } from './bootcamp.model';

@Injectable({
  providedIn: 'root'
})
export class BootcampService {
  private _http = inject(HttpClient)
  private _apiBootcamp = `${environment.apiUrl}bootcamp`
  private _apiBootcampCalass = `${environment.apiUrl}bootcampclass`

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

  getBootcampId(batchbootcamp: number): Observable<bootcampClasses>{
    return this._http.get<bootcampClasses>(`${this._apiBootcamp}/${batchbootcamp}`)
  }

  addNewBootcamp(bootcampData: BootcampForm):Observable<bootcampClasses>{
    console.log(bootcampData)
    return this._http.post<bootcampClasses>(this._apiBootcampCalass, bootcampData).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => 'TerJADI eRROR');
      })
    );
  }
}
