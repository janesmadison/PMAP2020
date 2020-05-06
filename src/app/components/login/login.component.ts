/*
Author: Madison Janes and Faith Hough
Description:
This component uses Login Service to check if email and password
exists in DB.
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private fb: FormBuilder) { }

  ngOnInit() {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
  });
}

/* Calls login service to check if that email and password is
registered in the system. If the service returns an error, the error is
displayed in html. */
  doLogin() {
      const obj = this.loginForm.value;
      this.loginService.login(obj.username, obj.password).subscribe(
    (str: string) => {
      if (str !== 'admin' && str !== 'standard') {
        this.errorMessage = str ? str : 'unknown login error';
      }
    }
  );
   }
}
