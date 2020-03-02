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

// Outline question form to be used multiple times
  ngOnInit() {
    this.questionForm = this.fb.group({
      title: [],
      questions: this.fb.array([this.fb.group({point:''})])
    })
  }

  get questionsArr(){
    return this.questionForm.get('questions') as FormArray;
  }

  // this function will push another question that the user inputs into the array
  addQuestion() {
    this.questionsArr.push(this.fb.group({point:''}));
  }

// this function will take the most recently added question and delete it
  deleteQuestion(index) {
    this.questionsArr.removeAt(index);
  }

  // export class RadioNgModelExample {
  // answer: string;
  // options: string[] = ['Agree', 'Slightly Agree', 'Slightly Disagree', 'Disagree'];
// }


}
