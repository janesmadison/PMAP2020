import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ClassRoster, Survey , User, Results} from '../common.types';

@Injectable({
  providedIn: 'root'
})
export class ResultsserviceService {
  baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }
  modifiedText: string;


  submitStudent(val: any) {
    this.modifiedText = val;
    console.log(JSON.stringify(this.modifiedText));
    return this.http.post(`${this.baseUrl}/backend/api/getResults.php`, this.modifiedText)
    .pipe(tap((response) => {console.log(response); }));
  }

  getRosters(): Observable<ClassRoster[]> {
    return this.http.get(`${this.baseUrl}/backend/api/getRoster.php`).pipe(
      map((res: any[]) => res.map(c => ClassRoster.fromJson(c))));
  }
}
