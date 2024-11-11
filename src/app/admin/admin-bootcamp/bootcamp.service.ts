import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../app.config';
import { Params } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { PageResponse, PageResponseDinamis } from '../../shared/page-response';
import { BootcampActiveList, BootcampClass, bootcampClasses, BootcampCompleted, BootcampForm, BootcampPlanedList } from './bootcamp.model';

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

  getBootcampId(bootcampId: number): Observable<PageResponseDinamis<bootcampClasses>>{
    return this._http.get<PageResponseDinamis<bootcampClasses>>(`${this._apiBootcamp}/${bootcampId}`)
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

  updateBootcamp(bootcampData: BootcampForm):Observable<bootcampClasses>{
    return this._http.put<bootcampClasses>(`${this._apiBootcamp}`, bootcampData).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => 'Kelasalahan System ' + `${error.message}`);
      })
    )
  }

  getBootcampAll():Observable<PageResponseDinamis<bootcampClasses[]>>{
    return this._http.get<PageResponseDinamis<bootcampClasses[]>>(`${this._apiBootcamp}All`);
  }

  getBootcampPlaned(params: Params):Observable<PageResponseDinamis<BootcampPlanedList>>{
    const activedParams = Object.keys({}).reduce<Params>((activeParams, paramName) => {
      activeParams[paramName] = params[paramName];
      return activeParams
    }, {});

    return this._http.get<PageResponseDinamis<BootcampPlanedList>>(this._apiBootcamp+"/planed", {params: activedParams});
  }

  getBootcampActive(params: Params): Observable<PageResponseDinamis<BootcampActiveList>>{
    const activedParams = Object.keys({})
    .reduce<Params>((activeParams, ParamsName) => {
      activeParams[ParamsName] = params[ParamsName];
      return activeParams;
    }, {});

    return this._http.get<PageResponseDinamis<BootcampActiveList>>(this._apiBootcamp+"/active", {
      params: activedParams
    });
  }

  getBootcampCompleted(params: Params):Observable<PageResponseDinamis<BootcampCompleted>>{
    const activedParams = Object.keys({})
    .reduce<Params>((activeParams, paramsName) => {
      activeParams[paramsName] = params[paramsName];
      return activeParams;
    }, {});

    return this._http.get<PageResponseDinamis<BootcampCompleted>>(this._apiBootcamp+"/completed", {params: activedParams});
  }
}
