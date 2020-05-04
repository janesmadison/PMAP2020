import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ClassRoster, Survey } from '../common.types';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  sendSurvey(data) {
    return this.http.post(`${this.baseUrl}/backend/api/saveSurvey.php`, data).pipe(
      tap(                                            // posts the data to the url which the php app is hosted
      (response) => {                                                             // gets the errors from the php app
      console.log(response);
    }));                                                          // resets the email form
  }

  getSurveys(): Observable<Survey[]> {
    return this.http.get(`${this.baseUrl}/backend/api/getSurveys.php`).pipe(
      map((res: any[]) => res.map(s => Survey.fromJson(s))));
  }

  getSurveyNames(): Observable<Survey[]> {
    return this.http.get(`${this.baseUrl}/backend/api/getSurveyNames.php`).pipe(
      map((res: any[]) => res.map(s => Survey.fromJson(s))));
  }

  getSurvey(id) {
    return this.http.post(`${this.baseUrl}/backend/api/getSurvey.php`, id);
  }
}
