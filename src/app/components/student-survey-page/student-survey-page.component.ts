import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-survey-page',
  templateUrl: './student-survey-page.component.html',
  styleUrls: ['./student-survey-page.component.css']
})
export class StudentSurveyPageComponent implements OnInit {
baseUrl = 'http://localhost/';
surveyArray: Observable<any>;
// ============================= DATA MEMBERS ==================================
  constructor(private http: HttpClient) { } // end of constructor
// =============================================================================
  ngOnInit(): void {
  } // end of On Init
/*==============================================================================
============================= GET SURVEY =======================================
==============================================================================*/
getSurvey() {
  this.surveyArray = this.http.get(this.baseUrl + 'getSurvey.php'); // gets survey questions from database
  } // end of get survey
}// end of component
