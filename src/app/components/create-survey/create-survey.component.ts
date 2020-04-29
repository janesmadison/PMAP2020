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

  choices: string[] = ['textbox', 'radio', 'slider'];

  ngOnInit() {
    this.surveyForm = this.fb.group({
      name: '',
      classID: '',
      questions: this.fb.array([])
    });
  }

  get questions(): FormArray {
    return this.surveyForm.get('questions') as FormArray;
  }

  getOptions(question): FormArray {
    return question.get('options') as FormArray;
  }

  addQuestion() {
    const group = this.fb.group ({
      question: '',
      type: '',
      options: this.fb.array([])
    });
    this.questions.push(group);
  }

  removeQuestion(i: number) {
  if (this.questions.length > 0) {
    this.questions.removeAt(i);
  } else {
    this.questions.reset();
  }
}

  addOption(question) {
    const option = this.fb.group ({
      option: ''
    });
    this.getOptions(question).push(option);
  }

  onSubmit() {
    console.log(JSON.stringify(this.surveyForm.getRawValue()));
  }

}// end of class
