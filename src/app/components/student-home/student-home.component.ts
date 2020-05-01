import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from '../../common.types';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {
surveys: Survey[];
isDisplayingSurvey = false;
currentlyDisplayedSurvey: Survey;
  constructor() {
  }// end of constructor

  ngOnInit(): void {
    this.isDisplayingSurvey = false;
  }
/*==============================================================================
================================================================================
==============================================================================*/
getSurveyData() {
  // should get survey data from database and store in a data structure
  }
/*==============================================================================
================================================================================
==============================================================================*/
displaySurvey(surveyIndex) {
  this.currentlyDisplayedSurvey = this.surveys[surveyIndex];
  this.isDisplayingSurvey = true;
  } // end of display survey
/*==============================================================================
================================================================================
==============================================================================*/
submitSurvey() {
  // sends survey Data to database
  }
/*==============================================================================
================================================================================
==============================================================================*/
cancelSurvey() {
  this.currentlyDisplayedSurvey = null;
  this.isDisplayingSurvey = false;
}
}// end of component
