import { Component, OnInit } from '@angular/core';
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
/* count = 1;
  sample: string; */
  questionArr: string[] = [];


  ngOnInit() {
    // a reactive form for the questions under a certain title/survey name
  /*  this.questionForm = this.fb.group({
      title: [],
      questions: this.fb.array([this.fb.group({point: ''})])
    }); */
    this.surveyForm = this.fb.group({
      title: []
    });
  }

/*  get questionsArr() {
    return this.questionForm.get('questions') as FormArray;
  } */

  // this function will push another question that the user inputs into the array
  addQuestion(questionType) {
  this.questionArr.push(questionType);
  console.log(questionType);
  /*  this.count += 1;
    this.questionsArr.push(this.fb.group({point: ''})); // ask about the {{point: ''}} */
  }

// this function will take the most recently added question and delete it
  deleteQuestion(index) {
  /*  this.count -= 1;
    this.questionsArr.removeAt(index); */
  }

  isTextFieldQuestion(index) {
  if (this.questionArr[index] === 'textFieldQuestion') {
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
