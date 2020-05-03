import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ClassRoster } from '../common.types';

@Injectable({
  providedIn: 'root'
})

export class EmailService {
  baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }
/*==============================================================================
================= HANDLE ERROR =================================================
==============================================================================*/
private handleError(error: HttpErrorResponse) {
  console.log(error);
  return throwError('Error! Something went wrong. ');
  }// end of handle error
/*==============================================================================
================= GET ADMINS ===================================================
==============================================================================*/

/*==============================================================================
================= SEND EMAIl ===================================================
==============================================================================*/
sendEmail(data) {
  return this.http.post(`${this.baseUrl}/backend/api/backendMailer.php`, data).pipe(
    tap(                                            // posts the data to the url which the php app is hosted
    (response) => {                                                             // gets the errors from the php app
    console.log(response);
  }));                                                          // resets the email form
}

sendRoster(data) {
  return this.http.post(`${this.baseUrl}/backend/api/backendRosterMailer.php`, data).pipe(
    tap(                                            // posts the data to the url which the php app is hosted
    (response) => {                                                             // gets the errors from the php app
    console.log(response);
  }));
}

getRosters(): Observable<ClassRoster[]> {
  return this.http.get(`${this.baseUrl}/backend/api/getRoster.php`).pipe(
    map((res: any[]) => res.map(c => ClassRoster.fromJson(c))));
}

}// end of email service
