import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private router: Router,
  ) { }

  login(username: string, password: string) {
    console.log('usr: ', username, 'pwd: ', password);
    this.router.navigateByUrl('/home');
    // http to backend to login
  }
}
