import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { Observable, throwError, Subscription } from 'rxjs';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';

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
export class ChangePassComponent implements OnDestroy {

  private subscription = new Subscription();

  changePassForm: FormGroup;
  oldPass = new FormControl('', [Validators.required, Validators.minLength(6)]);
  newPass = new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('[a-zA-Z0-9]*')]);
  confirmPass = new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('[a-zA-Z0-9]*')]);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    public snackBar: MatSnackBar) {

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

        ngOnDestroy() {
          this.subscription.unsubscribe();
        }

        changePass() {
          const newPassword = this.changePassForm.get('newPass').value;
          const oldPassword = this.changePassForm.get('oldPass').value;
          this.loginService.changePass(newPassword, oldPassword).subscribe(
        (str: string) => {
          if (str === 'success') {
            this.snackBar.open('Password Changed', 'Okay', {
              duration: 3000
            });
          } else if (str !== 'success') {
            this.snackBar.open('Password Change Failed', 'Okay', {
              duration: 3000
            });
          }
        }
      );
          this.changePassForm.reset();
        }

      }
