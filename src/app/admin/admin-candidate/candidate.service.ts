import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../app.config';
import { Params } from '@angular/router';
import { PageResponse, PageResponseDinamis } from '../../shared/page-response';
import { catchError, Observable, throwError } from 'rxjs';
import { AddCandaidateForm, Candidate, CandidateForm, Candidates } from './admin.candidate.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private _http = inject(HttpClient);
  private _apiCandidate = `${environment.apiUrl}candidate`

  getAllCandidate(params: Params): Observable<PageResponseDinamis<Candidates>>{
    const activedParams = Object.keys(params)
    .filter((key) => params[key] !== null)
    .reduce<Params>((activeParams, paramName) => {
      activeParams[paramName] = params[paramName];
      return activeParams;
    }, {});

    return this._http.get<PageResponseDinamis<Candidates>>(this._apiCandidate, {
      params: activedParams
    });
  }

  getCandidateId(candidateId: number): Observable<PageResponseDinamis<AddCandaidateForm>>{
    return this._http.get<PageResponseDinamis<AddCandaidateForm>>(`${this._apiCandidate}/${candidateId}`);
  }

  addNewCandidate(candidateData: AddCandaidateForm):Observable<Candidate>{
    return this._http.post<Candidate>(this._apiCandidate, candidateData).pipe(
      catchError((error) => {
        return throwError(() => 'Kelasalahan System ' + `${error.message}`);
      })
    );
  }

  updateCandidate(candidateData: CandidateForm): Observable<Candidate>{
    return this._http.put<Candidate>(`${this._apiCandidate}/${candidateData.candidateId}`, candidateData).pipe(
      catchError((error) => {
        return throwError(() => 'Kelasalahan System ' + `${error.message}`);
      })
    )
  }
}
