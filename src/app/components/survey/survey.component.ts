/*
Author:
Madison Janes

Description:
Survey Component is only accessed student-user side (not admin).
It is opened by StudentSurveyPageComponent. The class uses
ActivatedRoute to get the URL to capture the ID of the survey.
URL may look like "IPADDRESS/dist/PMAP2020/student-home/survey/{id}".
The component takes the survey questions and options
from the backend and dispays it to the user.

Warning:
This component is not finished because onSubmit doesn't send the answers to the Backend.
Originally the goal was to use the surveyID, questionIDs, etc to save the answers to the
Result table in DB. The JSON object sent would look something like the results object
commented in the data members.
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { SurveyService } from '../../services/survey.service';
import { Survey, Question, Answer } from '../../common.types';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})

export class SurveyComponent implements OnInit {
surveyID: string;
survey: Survey;
surveyLoaded = false;
/*
 results is a JSON object meant to store the answers from the survey.
 This will probably need to be redone in the future. May be a good idea to create
 a Result class in common.types.ts */
results = {surveyID: this.surveyID,
           answers: [{
             questionID: '',
             answerText: ''
             }]
           };

  constructor(private route: ActivatedRoute,
              private surveyService: SurveyService) {}

/* On initialization of the page, surveyID is captured from URL, and
surveyID is used to get survey from the backend.
QuestionIDs not correctly being loaded from DB */
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.surveyID = params['id'];
      const surveyObj = {
        surveyID: this.surveyID
      };
      this.surveyService.getSurvey(surveyObj).subscribe(
        survey => {
        if (survey) {
          this.survey = Survey.fromJson(survey);
          this.surveyLoaded = true;
        }
      });
    });
  }

/* prints to console...
needs to call a service to POST the results object to DB */
  onSubmit() {
    console.log('onSubmit()');
  }

}
