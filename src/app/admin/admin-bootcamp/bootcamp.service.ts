import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../app.config';
import { Params } from '@angular/router';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { PageResponse, PageResponseDinamis } from '../../shared/page-response';
import { BootcampActiveList, BootcampClass, bootcampClasses, BootcampCompleted, BootcampForm, BootcampPlanedList, ScheduleBootcampActive } from './bootcamp.model';

@Injectable({
  providedIn: 'root'
})
export class BootcampService {
  private _http = inject(HttpClient)
  private _apiBootcamp = `${environment.apiUrl}bootcamp`
  private _apiBootcampCalass = `${environment.apiUrl}bootcampclass`
  private _apiScheduleBootcamp = `${this._apiBootcampCalass}/course/schedule`
  // batchBootcamp!: string;
  private _batchBootcampSubject = new BehaviorSubject<number | null>(null);
  currentBatch$ = this._batchBootcampSubject.asObservable();

  // get Getbatch(): string{
  //   return this.batchBootcamp;
  // }

  // getBatch(): number{
  //   return this._batchBootcampSubject.subscribe((val) => val)
  // }
  setBatch(value : number){
    this._batchBootcampSubject.next(value);
  }

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

  // get get detail active bootcamp

  // get schedule bootcamp active by bootcamp id
  getScheduleCourseBootcamp(bootcampId: number): Observable<PageResponseDinamis<ScheduleBootcampActive[]>>{
    return this._http.get<PageResponseDinamis<ScheduleBootcampActive[]>>(`${this._apiScheduleBootcamp}/${bootcampId}`);
  }

  activetedBootcamp(bootcampId: number): Observable<PageResponseDinamis<string>>{
    return this._http.put<PageResponseDinamis<string>>(`${this._apiBootcamp}/activate/${bootcampId}`, {});
  }

  deadActiveBootcamp(bootcampId: number): Observable<PageResponseDinamis<string>>{
    return this._http.put<PageResponseDinamis<string>>(`${this._apiBootcamp}/deactivate/${bootcampId}`, {});
  }
}
