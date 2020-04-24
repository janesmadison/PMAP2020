import { Component, OnInit, EventEmitter } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Survey, Question, Answer } from '../../common.types';
import { EventEmitterService } from '../../services/event-emitter.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})

export class CreateSurveyComponent implements OnInit {

  constructor(private fb: FormBuilder, private eventEmitterService: EventEmitterService) {}

  surveyForm: FormGroup;
  questionArr: Question[];


  ngOnInit() {
    this.surveyForm = this.fb.group({
      title: []
    });
  }

  saveSurvey(questionArr: Question[]) {
    // alert( 'Hello "' + questionArr + '"\nWelcome to C# Corner \nFunction in First Component');
    this.eventEmitterService.onSurveySaveButtonClick(questionArr);
  }

  // this function will push another question that the user inputs into the array
  addQuestion(questionType: string, numOfAnswers: number) {
  let answerArray: Answer[] = [];
  for (let i = 0; i < numOfAnswers; i++) {
    answerArray.push({type: questionType, answer: 'value'});
  }
  const question = {
    type: questionType,
    answers: answerArray,
    question: 'value'
  };
  this.questionArr.push(question);
  }

  deleteQuestion(i: number) {
  this.questionArr.splice(i, 1);
  }

  isTextboxQuestion(index) {
  if (this.questionArr[index].type === 'textbox') {
    return true;
    } else {
    return false;
    }
  }

  isRadioQuestion(index) {
  if (this.questionArr[index].type === 'radio') {
    return true;
    } else {
    return false;
    }
  }

  isSliderQuestion(index) {
  if (this.questionArr[index].type === 'slider') {
    return true;
    } else {
    return false;
    }
  }

// =======================================================================================================
}// end of class
