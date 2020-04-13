import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-three-button-question',
  templateUrl: './three-button-question.component.html',
  styleUrls: ['./three-button-question.component.css']
})
export class ThreeButtonQuestionComponent implements OnInit {
  @Input() public i: number;

  @Output() delete = new EventEmitter<number>();

  constructor() { }

  threeButtonForm = new FormGroup({question: new FormControl('', Validators.required), answer: new FormControl(''), });

  ngOnInit(): void {
  }

  deleteMe(i) {
    this.delete.emit(i);
  }

}
