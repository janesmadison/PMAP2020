import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';


@Component({
  selector: 'app-two-button-question',
  templateUrl: './two-button-question.component.html',
  styleUrls: ['./two-button-question.component.css']
})
export class TwoButtonQuestionComponent implements OnInit {

  constructor() { }

  twoButtonForm = new FormGroup({question: new FormControl('', Validators.required), answer: new FormControl(''), });

  ngOnInit(): void {
  }

}
