import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../../common.types';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-add-administrator',
  templateUrl: './add-administrator.component.html',
  styleUrls: ['./add-administrator.component.css']
})
// ===========================================================================================================================
export class AddAdministratorComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);         // Creates the form control to validate email input
  baseUrl = 'http://localhost:8080';                                            // URL of where the php script is running

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
// ============================================ CONSTRUCTOR =================================================================
  constructor(private route: ActivatedRoute,
              private breakpointObserver: BreakpointObserver,
              private http: HttpClient,
              private emailService: EmailService) {}
  ngOnInit(): void {}
/*===========================================================================================================================
============================================= GET ERROR MESSAGE =============================================================
===========================================================================================================================*/
getErrorMessage() {
// error message for invalid formatted input
if (this.email.hasError('required')) {
  return 'You must enter a value';
  }
return this.email.hasError('email') ? 'Not a valid email' : '';
} // end of get error message
/*===========================================================================================================================
============================================= RESET FORM ====================================================================
===========================================================================================================================*/
resetForm() {                                                                   // clears the email input field only if the
  if (!this.email.invalid) {                                                    // field has a valid email entered
    this.email.reset();
    }
  } // end of reset form
/*============================================================================================================================
========================================== SEND ADMINISTRATION INVITE ========================================================
============================================================================================================================*/
sendAdministrationInvite() {
  console.log(this.email.value);

  const postVars = {                                                            // this is created to have the email data in JSON format
   email : this.email.value,
   name: 'Administrator',
   type: 'Admin'                                                                // data to be posted to the php script
  };

  if (!this.email.invalid) {
    this.emailService.sendEmail(postVars).subscribe(                            // calls the service to send the admin invite email
    (str: string) => {
      if (str === 'error') {
        console.log('email failed to send');
      }
      this.resetForm();
    });
 }
  }// end of Send Administration Invite
} // end of Add Administration
