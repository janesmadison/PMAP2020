import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {

  private subscription = new Subscription();

  changePassForm: FormGroup;

  constructor(
    private router: Router,
    // private loginService: LoginService,
    private fb: FormBuilder) { }

  ngOnInit() {
      this.changePassForm = this.fb.group({
        oldPass: ['', Validators.required],
        newPass: ['', Validators.required],
        confirmPass: ['', Validators.required]
  });
}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changePass() {
      const obj = this.changePassForm.value;
      // this.loginService.login(obj.username, obj.password);
  }

}
