import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = 'http://localhost:8080';
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  login(username: string, password: string) {
    const credentials = JSON.stringify({ username, password });
    console.log('usr: ', username, 'pwd: ', password);
    return this.http
    .post(`${this.baseUrl}/api/login`, credentials).pipe(
      tap(
        (response: any) => {
          // authorize then
          this.router.navigateByUrl('/home');
        }
      )
    );
  }
}
