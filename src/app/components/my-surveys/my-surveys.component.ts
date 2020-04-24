import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-surveys',
  templateUrl: './my-surveys.component.html',
  styleUrls: ['./my-surveys.component.css']
})
export class MySurveysComponent implements OnInit {
surveyIds = [];
rosters = [];
selectedValue: string;
selectedRoster: string;

// ========================== DATA MEMBERS =====================================
  constructor(private http: HttpClient) {
  this.surveyIds.push('TestSurveyID');
  this.surveyIds.push('TestSurveyID2');

  this.rosters.push('TestRoster');
 }

  ngOnInit(): void {
  }
/*==============================================================================
=========================== GET SURVEY NAMES ===================================
==============================================================================*/
getSurveyNames() {
  }// end of get survey names
/*==============================================================================
=========================== GET ROSTER NAMES ===================================
==============================================================================*/
getRosterNames() {
  }// end of get roster names
/*==============================================================================
=========================== SEND SURVEYS =======================================
==============================================================================*/
sendSurveys() {
  console.log(this.selectedValue);
  console.log(this.selectedRoster);
  }// end of send surveys
}// end of component
