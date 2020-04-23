import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-four-button-question',
  templateUrl: './four-button-question.component.html',
  styleUrls: ['./four-button-question.component.css']
})
export class FourButtonQuestionComponent implements OnInit {
  @Input() public i: number;

  @Output() delete = new EventEmitter<number>();

  constructor() { }

  fourButtonForm = new FormGroup({question: new FormControl('', Validators.required), answer: new FormControl(''), });
  ngOnInit(): void {
  }

  deleteMe(i) {
    this.delete.emit(i);
  }

}
