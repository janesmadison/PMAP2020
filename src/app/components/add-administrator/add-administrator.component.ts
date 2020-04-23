import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';
import { Admin } from './admin';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-administrator',
  templateUrl: './add-administrator.component.html',
  styleUrls: ['./add-administrator.component.css']
})
// ===========================================================================================================================
export class AddAdministratorComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);         // Creates the form control to validate email input
  baseUrl = 'http://localhost/backendAdminMailer.php';                          // URL of where the php script is running

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
// ============================================ CONSTRUCTOR =================================================================
  constructor(private route: ActivatedRoute, private breakpointObserver: BreakpointObserver, private http: HttpClient) {}
  ngOnInit(): void {
  }
/*===========================================================================================================================
============================================= GET ERROR MESSAGE =============================================================
===========================================================================================================================*/
getErrorMessage() {
// error message for invalid formatted input
if (this.email.hasError('required')) {
  return 'You must enter a value';
  }
return this.email.hasError('email') ? 'Not a valid email' : '';
}

/*===========================================================================================================================
============================================= RESET FORM ====================================================================
===========================================================================================================================*/
resetForm() {                                                                   // clears the email input field only if the
  if (!this.email.invalid) {                                                    // field has a valid email entered
  this.email.reset();
    }
  }
/*============================================================================================================================
========================================== SEND ADMINISTRATION INVITE ========================================================
============================================================================================================================*/
sendAdministrationInvite() {
  console.log(this.email.value);

  let postVars = {                                                              // this is created to have the email data in JSON format
  AdminEmail : this.email.value                                                 // to be posted to the php script
  };

  if (!this.email.invalid) {
    this.http.post(this.baseUrl, postVars).subscribe((data) => {                // posts the data to the url which the php app is hosted
      console.log('Got data from backend', data);                               // subscribing allows for data to be passed from php to this
    }, (error) => {                                                             // gets the errors from the php app
      console.log('Error! ', error);
    });
    this.resetForm();                                                           // resets the email form
  }
  }// end of Send Administration Invite
} // end of Add Administration
