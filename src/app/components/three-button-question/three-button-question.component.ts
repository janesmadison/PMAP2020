import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-three-button-question',
  templateUrl: './three-button-question.component.html',
  styleUrls: ['./three-button-question.component.css']
})
export class ThreeButtonQuestionComponent implements OnInit {

  constructor() { }

  threeButtonForm = new FormGroup({question: new FormControl('', Validators.required), answer: new FormControl(''), });

  ngOnInit(): void {
  }

}
