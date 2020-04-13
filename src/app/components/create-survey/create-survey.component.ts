import { Component, OnInit, EventEmitter } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { Survey, Question } from '../../services/survey';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit {

  constructor(private fb: FormBuilder) {}

  surveyForm: FormGroup;
  questionArr: string[] = [];


  ngOnInit() {
    this.surveyForm = this.fb.group({
      title: []
    });
  }

  // this function will push another question that the user inputs into the array
  addQuestion(questionType) {
  this.questionArr.push(questionType);
  console.log(questionType);
  }

  deleteQuestion(i: number) {
  this.questionArr.splice(i);
  }

  isTextFieldQuestion(index) {
  if (this.questionArr[index].includes('textFieldQuestion')) {
    return true;
    } else {
    return false;
    }
  }

  isTwoButtonQuestion(index) {
  if (this.questionArr[index] === 'twoButtonQuestion') {
    return true;
    } else {
    return false;
    }
  }

  isThreeButtonQuestion(index) {
  if (this.questionArr[index] === 'threeButtonQuestion') {
    return true;
    } else {
    return false;
    }
  }

  isFourButtonQuestion(index) {
  if (this.questionArr[index] === 'fourButtonQuestion') {
    return true;
    } else {
    return false;
    }
  }

  isFiveButtonQuestion(index) {
  if (this.questionArr[index] === 'fiveButtonQuestion') {
    return true;
    } else {
    return false;
    }
  }

  isSliderQuestion(index) {
  if (this.questionArr[index] === 'sliderQuestion') {
    return true;
    } else {
    return false;
    }
  }


}
