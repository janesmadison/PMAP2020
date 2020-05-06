/*
Author:
Madison Janes

Description:
This component is a form which allows an admin to create a
survey. The survey allows you to add and delete questions,
edit question text and answers when applicable (radio buttons).
It then saves the survey object to the backend. Survey contains
questions and questions contain options.
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Survey, Question, Answer, ClassRoster } from '../../common.types';
import { EmailService } from '../../services/email.service';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})

export class CreateSurveyComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private emailService: EmailService,
              private surveyService: SurveyService,
              private snackBar: MatSnackBar) {}

  surveyForm: FormGroup;
  rosters: ClassRoster[];
  /* Types of questions */
  choices: string[] = ['textbox', 'radio', 'slider'];

/*
Automatically called, method sets up Form and gets a list
of classes the admin can send the survey to.
*/
  ngOnInit() {
    /* surveyForm contains the name of the survey, questions,
    and the class (not required) that the survey is to be sent to. */
    this.surveyForm = this.fb.group({
      name: '',
      classID: '',
      questions: this.fb.array([])
    });

    this.emailService.getRosters().subscribe(
      rosters => {
      if (rosters) {
        this.rosters = rosters;
      }
    });
  }

/*
"get" methods allow the component to reference a data member directly
without calling the legitimate function.
ex. question.get('options') will look at this function to return
the survey form's questions array since we don't otherwise have access to it.
*/
  get questions(): FormArray {
    return this.surveyForm.get('questions') as FormArray;
  }

/* gets options for a particular question */
  getOptions(question): FormArray {
    return question.get('options') as FormArray;
  }

/* adds an empty question form group containing the text for
the question, the type, and options (for radio buttons) */
  addQuestion() {
    const group = this.fb.group ({
      question: '',
      type: '',
      options: this.fb.array([])
    });
    this.questions.push(group);
  }

/* Allows an admin to delete a question during creation */
  removeQuestion(i: number) {
  if (this.questions.length > 0) {
    this.questions.removeAt(i);
  } else {
    this.questions.reset();
  }
}
/* adds an empty option to the question... Questions aren't
required to have options. Right now only radio button questions have options.
Options may be for example:
[ "not usually", "somewhat frequently", "frequently",
"most of the time", "always" ]*/
  addOption(question) {
    const option = this.fb.group ({
      option: ''
    });
    this.getOptions(question).push(option);
  }

/* On submit takes the values of surveyForm and saves to back end.
If success or fail, prints either at bottom of screen with a
MatSnackBar alert */
  onSubmit() {
    this.surveyService.sendSurvey(this.surveyForm.getRawValue()).subscribe(
  (str: string) => {
    if (str === 'success') {
      this.snackBar.open('Survey Saved', 'Okay', {
        duration: 3000
      });
      this.surveyForm.reset();
    } else if (str !== 'success') {
      this.snackBar.open('Survey Failed To Save', 'Okay', {
        duration: 3000
      });
    }
  }
);
  }

}// end of class
