import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private email: string;
  baseUrl = 'http://localhost:8080';


  constructor( private router: Router,
               private http: HttpClient) { }

  getEmail(): string {
    return this.email;
  }

  login(email: string, password: string) {
    const credentials = JSON.stringify({ email, password });
    return this.http
    .post(`${this.baseUrl}/backend/api/login.php`, credentials).pipe(
      tap(
        (response: string) => {
          // authorize then
          if (response === 'admin') {
            this.email = email;
            this.router.navigateByUrl('/home');
          } else if (response === 'standard') {
            this.router.navigateByUrl('/student-home');
            this.email = email;
          }
        }
      )
    );
  }

  changePass(newPassword: string, oldPassword: string) {
    const e = this.email;
    const credentials = JSON.stringify({ e, oldPassword, newPassword });
    return this.http
    .post(`${this.baseUrl}/backend/api/changePass.php`, credentials).pipe(
      tap()
    );
  }
}
