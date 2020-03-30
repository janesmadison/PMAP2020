import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-add-administrator',
  templateUrl: './add-administrator.component.html',
  styleUrls: ['./add-administrator.component.css']
})
// ===========================================================================================================================
export class AddAdministratorComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
// ============================================ CONSTRUCTOR =================================================================
  constructor(private route: ActivatedRoute, private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
  }
/*===========================================================================================================================
============================================= GET ERROR MESSAGE =============================================================
===========================================================================================================================*/
getErrorMessage() {
if (this.email.hasError('required')) {
  return 'You must enter a value';
  }
return this.email.hasError('email') ? 'Not a valid email' : '';
}

/*===========================================================================================================================
============================================= RESET FORM ====================================================================
===========================================================================================================================*/
resetForm() {
  if (!this.email.invalid) {
  this.email.reset();
    }
  }
}
