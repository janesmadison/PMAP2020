import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-four-button-question',
  templateUrl: './four-button-question.component.html',
  styleUrls: ['./four-button-question.component.css']
})
export class FourButtonQuestionComponent implements OnInit {

  constructor() { }

  fourButtonForm = new FormGroup({question: new FormControl('', Validators.required), answer: new FormControl(''), });
  ngOnInit(): void {
  }

}
