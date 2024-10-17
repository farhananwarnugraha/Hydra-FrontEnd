import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../app.config';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { PageResponse } from '../shared/page-response';
import { Candidate } from './candidates.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {
  private _http = inject(HttpClient);
  private _apiCandidate = `${environment.apiUrl}candidate`

  getAllCandidate(params: Params): Observable<PageResponse<Candidate>>{
    const activedParams = Object.keys(params)
    .filter((key) => params[key] !== null)
    .reduce<Params>((activeParams, paramName) => {
      activeParams[paramName] = params[paramName];
      return activeParams;
    }, {});

    return this._http.get<PageResponse<Candidate>>(this._apiCandidate, {
      params: activedParams
    });
  }
}
