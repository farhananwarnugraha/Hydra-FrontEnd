import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../app.config';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { PageResponseDinamis } from '../../shared/page-response';
import { EvaluationResults } from './evaluation-result.model';

@Injectable({
  providedIn: 'root'
})
export class EvaluationResultService {
  private _http = inject(HttpClient);
  private _apiUrl = `${environment.apiUrl}evaluation-result`
  constructor() { }

  getAllEvaluationResult(params: Params):Observable<PageResponseDinamis<EvaluationResults>>{
    const activedParams = Object.keys(params)
    .filter((key) => params[key] !== null)
    .reduce<Params>((activeParams, paramName)=> {
      activeParams[paramName] = params[paramName];
      return activeParams;
    }, {});
    return this._http.get<PageResponseDinamis<EvaluationResults>>(this._apiUrl, {
      params: activedParams
    });
  }

}
