import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../app.config';
import { catchError, Observable, throwError } from 'rxjs';
import { PageResponseDinamis } from '../../../shared/page-response';
import { CandidateCourseBootcamp, CandidateEvaluationForm, CourseForm, EndBootcampClass, Skill, Trainer } from './sub-bootcamp.mode';

@Injectable({
  providedIn: 'root'
})
export class SubBootcampService {
  private _http = inject(HttpClient);
  private _apiUrl = `${environment.apiUrl}`;

  getAllTrainer():Observable<PageResponseDinamis<Trainer[]>>{
    return this._http.get<PageResponseDinamis<Trainer[]>>(`${this._apiUrl}trainer`);
  }

  getTrainer(skillId: string | null):Observable<PageResponseDinamis<Trainer[]>>{
    return this._http.get<PageResponseDinamis<Trainer[]>>(`${this._apiUrl}trainer/${skillId}`);
  }

  getSkills():Observable<PageResponseDinamis<Skill[]>>{
    return this._http.get<PageResponseDinamis<Skill[]>>(`${this._apiUrl}skills`);
  }

  addCourseBootcamp(bootcampId: number, data: CourseForm):Observable<PageResponseDinamis<string>>{
    return this._http.post<PageResponseDinamis<string>>(`${this._apiUrl}bootcampclass/course/${bootcampId}`, data).pipe(
      catchError((err)=> {
        return throwError(() => err);
      })
    );
  }

  getBootcampActive(bootcampId: number):Observable<PageResponseDinamis<EndBootcampClass>>{
    return this._http.get<PageResponseDinamis<EndBootcampClass>>(`${this._apiUrl}bootcamp/${bootcampId}/detail`)
  }

  updateProggesBootcamp(bootcampId: number, data: EndBootcampClass):Observable<PageResponseDinamis<string>>{
    return this._http.put<PageResponseDinamis<string>>(`${this._apiUrl}bootcamp/end/${bootcampId}`, data);
  }

  updateProgrresCourse(courseId: string):Observable<PageResponseDinamis<string>>{
    return this._http.put<PageResponseDinamis<string>>(`${this._apiUrl}bootcampclass/course/${courseId}`, {});
  }

  updateCourseEvaluationDate(courseId: string):Observable<PageResponseDinamis<string>>{
    return this._http.put<PageResponseDinamis<string>>(`${this._apiUrl}bootcampclass/course-evaluation/${courseId}`, {});
  }

  getCandidateByCourseBootcamp(courseId: string, bootcampId: number):Observable<PageResponseDinamis<CandidateCourseBootcamp[]>>{
    return this._http.get<PageResponseDinamis<CandidateCourseBootcamp[]>>(`${this._apiUrl}candidates/${courseId}/${bootcampId}`);
  }

  addCandidateEvaluation(evaluationData: CandidateEvaluationForm):Observable<PageResponseDinamis<string>>{
    return this._http.post<PageResponseDinamis<string>>(`${this._apiUrl}add-evaluation`, evaluationData);
  }
}
