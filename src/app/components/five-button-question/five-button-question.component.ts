import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-five-button-question',
  templateUrl: './five-button-question.component.html',
  styleUrls: ['./five-button-question.component.css']
})
export class FiveButtonQuestionComponent implements OnInit {

  constructor() { }

  fiveButtonForm = new FormGroup({question: new FormControl('', Validators.required), answer: new FormControl(''), });
  ngOnInit(): void {
  }

}
