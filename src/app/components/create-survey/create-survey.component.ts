import { Component, OnInit } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { Survey, Question } from '../../services/survey';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-createsurvey',
  templateUrl: './createsurvey.component.html',
  styleUrls: ['./createsurvey.component.css']
})
export class CreateSurveyComponent implements OnInit {
  // form = new FormGroup({
    // question: new FormControl(''),
    // answer: new FormControl('')'

  constructor(private fb: FormBuilder) {}

  questionForm: FormGroup;
  count = 1;
  sample: string;


  // optionForm: FormGroup;
  // public opCount: number=2;

// Outline question form to be used multiple times
  ngOnInit() {
    // a reactive form for the questions under a certain title/survey name
    this.questionForm = this.fb.group({
      title: [],
      questions: this.fb.array([this.fb.group({point: ''})])
    });
    // optionForm: this.fb.group({
      // options: this.fb.array([this.fb.group({point:''})])
    // })
     // let sampleQuestions: Array<string> = ["Overall, how would you rate this course?",
                                          // "How usefull were the course materials?",
                                          // "How clearly did your instructor explain the course material?",
                                          // "Was the speed with which your instructor presented the course
                                          // material too fast, too slow, or about right?",
                                          // "How well did your instructor answer students' questions?",
                                          // "How comfortable did you feel voicing your opinions in class?",
                                          // "How helpful were the homework assignments to your understanding of the material?"
                                          // ]
  }

  get questionsArr() {
    return this.questionForm.get('questions') as FormArray;
  }

  // this function will push another question that the user inputs into the array
  addQuestion() {
    this.count += 1;
    this.questionsArr.push(this.fb.group({point: ''}));
    // this.sample = " ";
  }

// this function will take the most recently added question and delete it
  deleteQuestion(index) {
    this.count -= 1;
    this.questionsArr.removeAt(index);
  }

  // addSample(item: sampleQuestions[]){
    // this.count += 1;
    // this.questionsArr.push(this.fb.group({point:''}));
    // this.sample = this.sampleQuestions(index);
  // }

  // get optionsArr(){
    // return this.optionForm.get('options') as FormArray;
  // }

  // addRadioButton(){
    // this.opCount +=1;
    // this.optionsArr.push(this.fb.group({point:''}))
  // }

  // deleteRadioButton(index){
    // this.opCount -+ 1;
    // this.optionsArr.removeAt(index);
  // }

  // export class RadioNgModelExample {
  // answer: string;
  // options: string[] = ['Agree', 'Slightly Agree', 'Slightly Disagree', 'Disagree'];
// }


}
