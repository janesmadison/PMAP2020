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

  questionForm: FormGroup;
  count = 1;
  sample: string;

//initializes a reactive form for the questions under a user specified title(survey name) it has a title and a question array
  ngOnInit() {
    this.questionForm = this.fb.group({
      title: [],
      questions: this.fb.array([this.fb.group({point: ''})])
    });
  }

//returns all of the questions that are in the current array
  get questionsArr() {
    return this.questionForm.get('questions') as FormArray;
  }

  // this function will push another question that the user inputs into the array
  addQuestion() {
    this.count += 1;
    this.questionsArr.push(this.fb.group({point: ''}));
  }

// this function will take the most recently added question and delete it
  deleteQuestion(index) {
    this.count -= 1;
    this.questionsArr.removeAt(index);
  }


}
