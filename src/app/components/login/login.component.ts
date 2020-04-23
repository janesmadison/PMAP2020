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
export class LoginComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();

  loginForm: FormGroup;

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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  doLogin() {
      const obj = this.loginForm.value;
      this.loginService.login(obj.username, obj.password).subscribe(
    (res: any) => {
      console.log(res);
    },
    (err: HttpErrorResponse) => {
      console.log('errrrrror component:' + err.message);
    }
  );
  }
}
