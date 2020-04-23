import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-slider-question',
  templateUrl: './slider-question.component.html',
  styleUrls: ['./slider-question.component.css']
})
export class SliderQuestionComponent implements OnInit {
  @Input() public i: number;

  @Output() delete = new EventEmitter<number>();

  constructor() { }

  sliderForm = new FormGroup({question: new FormControl('', Validators.required), });

  ngOnInit(): void {
  }

  deleteMe(i) {
    // this.delete.emit(i);
  }

}
