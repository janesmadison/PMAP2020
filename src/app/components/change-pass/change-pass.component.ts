import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable, throwError } from 'rxjs';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent {

  changePassForm: FormGroup;
  oldPass = new FormControl('', [Validators.required, Validators.minLength(6),
    Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9]*')]);
  newPass = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confirmPass = new FormControl('', [Validators.required, Validators.minLength(6)]);

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

        passwordMatchValidator(g: FormGroup) {
         return g.get('newPass').value === g.get('confirmPass').value
            ? null : { mismatch: true };
            // throwError('Passwords do not match!');
        }
        setOldPass() {
          return { 'has-danger': !this.oldPass.pristine && !this.oldPass.valid };
        }
        setNewPass() {
          return { 'has-danger': !this.newPass.pristine && !this.newPass.valid };
        }
        setConfirmPass() {
          return { 'has-danger': !this.confirmPass.pristine && !this.confirmPass.valid ||
           !this.confirmPass.pristine && this.changePassForm.errors && this.changePassForm.errors.mismatch};
        }

        changePass() {
          // database stuff and error handling
        }
      }
