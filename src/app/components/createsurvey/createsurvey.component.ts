import { Component, OnInit } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { Survey, Question } from '../../services/survey'

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-createsurvey',
  templateUrl: './createsurvey.component.html',
  styleUrls: ['./createsurvey.component.css']
})
export class CreatesurveyComponent implements OnInit {
  // form = new FormGroup({
    // question: new FormControl(''),
    // answer: new FormControl('')'

  constructor(private fb: FormBuilder) {}

  questionForm: FormGroup;
  public count: number=1;

  optionForm: FormGroup;
  public opCount: number=2;

// Outline question form to be used multiple times
  ngOnInit() {
    // a reactive form for the questions under a certain title/survey name
    this.questionForm = this.fb.group({
      title: [],
      questions: this.fb.array([this.fb.group({point:''})])
    })
    // a reactive form for the user specified answer bubbles
    this.optionForm = this.fb.group({
      // titleQuestion: [],
      options: this.fb.array([this.fb.group({point:''})])
    })
  }

  get questionsArr(){
    return this.questionForm.get('questions') as FormArray;
  }

  // this function will push another question that the user inputs into the array
  addQuestion() {
    this.count += 1;
    this.questionsArr.push(this.fb.group({point:''}));
  }

// this function will take the most recently added question and delete it
  deleteQuestion(index) {
    this.count -= 1;
    this.questionsArr.removeAt(index);
  }

  get optionsArr(){
    return this.optionForm.get('options') as FormArray;
  }

  addRadioButton(){
    this.opCount +=1;
    this.optionsArr.push(this.fb.group({point:''}))
  }

  deleteRadioButton(index){
    this.opCount -+ 1;
    this.optionsArr.removeAt(index);
  }

  // export class RadioNgModelExample {
  // answer: string;
  // options: string[] = ['Agree', 'Slightly Agree', 'Slightly Disagree', 'Disagree'];
// }


}
