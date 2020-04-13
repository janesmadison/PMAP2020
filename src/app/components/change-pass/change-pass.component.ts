import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import {ErrorStateMatcher} from '@angular/material/core';

import { Subscription } from 'rxjs';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent {

  changePassForm: FormGroup;
  oldPass = new FormControl('', [Validators.required, Validators.minLength(6)]);
  newPass = new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('[a-zA-Z0-9]*')]);
  confirmPass = new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('[a-zA-Z0-9]*')]);

  constructor(
    private router: Router,
    private fb: FormBuilder) {

      this.changePassForm =
      this.fb.group({oldPass: this.oldPass,
          newPass: this.newPass,
          confirmPass: this.confirmPass},
          {
            validator: this.passwordMatchValidator
          });
        }

        matcher = new MyErrorStateMatcher();

        passwordMatchValidator(g: FormGroup) {
         return g.get('newPass').value === g.get('confirmPass').value
            ? null : { mismatch: true };
        }

        changePass() {
          // database stuff and error handling
        }
      }
