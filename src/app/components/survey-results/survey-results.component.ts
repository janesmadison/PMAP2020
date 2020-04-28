import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Survey } from '../../common.types';

@Component({
  selector: 'app-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.css']
})
export class SurveyResultsComponent implements OnInit {

surveys: Survey;

  constructor() { }

  ngOnInit(): void {
    this.getSurveyData();
  }
/*==============================================================================
======================== GET SURVEY DATA =======================================
==============================================================================*/
getSurveyData() {
  }// end of get survey data
}
