import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Admin } from 'src/app/components/add-administrator/admin';


@Injectable({
  providedIn: 'root'
})

export class EmailService {
  baseUrl = 'http://localhost/backendMailer.php';
  admins: Admin[];

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
  }
}// end of email service
