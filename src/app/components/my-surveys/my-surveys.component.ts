import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ClassRoster, Survey } from '../../common.types';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-my-surveys',
  templateUrl: './my-surveys.component.html',
  styleUrls: ['./my-surveys.component.css']
})
export class MySurveysComponent implements OnInit {
  surveys: Survey[];
  constructor(private surveyService: SurveyService) { }

  ngOnInit(): void {
    this.surveyService.getSurveys().subscribe(
      surveys => {
      if (surveys) {
        this.surveys = surveys;
      }
    });
  }

}
