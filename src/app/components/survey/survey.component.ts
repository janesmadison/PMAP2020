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
loaded = false;
count = 0;
resultForm: FormGroup;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private surveyService: SurveyService) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.surveyID = params['id'];
      const surveyObj = {surveyID: this.surveyID};
      this.surveyService.getSurvey(surveyObj).subscribe(
        survey => {
        if (survey) {
          this.survey = Survey.fromJson(survey);
          this.loaded = true;
        }
      });
    });

    this.resultForm = this.fb.group({
      answers: this.fb.array([this.createAnswer()]),
      surveyID: this.surveyID
    });

  }

  get answers(): FormArray {
    return this.resultForm.get('answers') as FormArray;
  }

  createAnswer(): FormGroup {
    return this.fb.group ({
      questionID: '',
      answerText: ''
    });
  }

  addAnswer(id) {
    const temp = this.fb.group ({
      questionID: id,
      answerText: ''
    });
    if (this.count < this.survey.questions.length - 1) {
      this.answers.push(this.createAnswer());
      this.count++;
    }
  }

  onSubmit() {
    console.log(this.resultForm.getRawValue());
  }

}
