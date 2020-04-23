import { Component, OnInit, EventEmitter } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { FiveButtonQuestionComponent } from '../five-button-question.component';


import { Survey, Question } from '../../services/survey';
import { EventEmitterService } from '../event-emitter.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit {

  constructor(private fb: FormBuilder, private eventEmitterService: EventEmitterService) {}

  surveyForm: FormGroup;
  questionArr: string[] = [];
  questionString: string;
  public fiveButtonQuestion: FiveButtonQuestionComponent;


  ngOnInit() {
    this.surveyForm = this.fb.group({
      title: []
    });
  }

  saveSurvey(questionString: string){
    this.eventEmitterService.onSurveySaveButtonClick(questionString);
    // alert( 'Hello "' + questionString + '"\nWelcome to C# Corner \nFunction in First Component');
  }

  recievedFiveButtonQuestion($event){
    // this.questionString = $event;
    this.fiveButtonQuestion = FiveButtonQuestionComponent;
    alert( 'Hello "' + this.questionString + '"\nWelcome to C# Corner \nFunction in First Component');

  }

  // this function will push another question that the user inputs into the array
  addQuestion(questionType) {
  this.questionArr.push(questionType);
  console.log(questionType);
  }

  deleteQuestion(i: number) {
  this.questionArr.splice(i, 1);
  }

  isTextFieldQuestion(index) {
  if (this.questionArr[index].includes('textFieldQuestion')) {
    return true;
    } else {
    return false;
    }
  }

  isTwoButtonQuestion(index) {
  if (this.questionArr[index].includes('twoButtonQuestion')) {
    return true;
    } else {
    return false;
    }
  }

  isThreeButtonQuestion(index) {
  if (this.questionArr[index].includes('threeButtonQuestion')) {
    return true;
    } else {
    return false;
    }
  }

  isFourButtonQuestion(index) {
  if (this.questionArr[index].includes('fourButtonQuestion')) {
    return true;
    } else {
    return false;
    }
  }

  isFiveButtonQuestion(index) {
  if (this.questionArr[index].includes('fiveButtonQuestion')) {
    return true;
    } else {
    return false;
    }
  }

  isSliderQuestion(index) {
  if (this.questionArr[index].includes('sliderQuestion')) {
    return true;
    } else {
    return false;
    }
  }

}
