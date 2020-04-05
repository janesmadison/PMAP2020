import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-slider-question',
  templateUrl: './slider-question.component.html',
  styleUrls: ['./slider-question.component.css']
})
export class SliderQuestionComponent implements OnInit {

  constructor() { }

  sliderForm = new FormGroup({question: new FormControl('', Validators.required), });

  ngOnInit(): void {
  }

}
