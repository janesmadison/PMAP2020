import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { tap, map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Survey } from '../../common.types';
import { ClassRoster } from '../../common.types';
import { User } from '../../common.types';
import { Results } from '../../common.types';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { Observable, throwError, Subscription } from 'rxjs';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.css']
})
export class SurveyResultsComponent implements OnInit {
  baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }
  selectedStudent: string;
  // this.getRosters();
  class: User[] = [
    {email: 'bob@email.com', name:'bob', group:'', type: ''},
    {email: 'matt@email.com', name:'matt', group:'', type: ''}
  ];

surveys: Survey;
modifiedText: string;


  ngOnInit(): void {
  }


  onStudentSelected(val:any){
    this.onSubmit(val);
  }

  onSubmit(val:any){
    this.modifiedText=val;
    console.log(JSON.stringify(this.modifiedText));
    return this.http.post(`${this.baseUrl}/backend/api/getResults.php`, this.modifiedText).pipe(tap((response) => {console.log(response);}));
  }

  getResults(): Observable<Results[]> {
    return this.http.get(`${this.baseUrl}/backend/api/getResults.php`).pipe(
      map((res: any[]) => res.map(s => Results.fromJson(s))));
  }

   }
