import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-text-field-question',
  templateUrl: './text-field-question.component.html',
  styleUrls: ['./text-field-question.component.css']
})
export class TextFieldQuestionComponent implements OnInit {
  @Input() public i: number;

  @Output() delete = new EventEmitter<number>();

  textFieldForm = new FormGroup({question: new FormControl('', Validators.required), });
  isValid = this.textFieldForm.valid;
  constructor() { }

  ngOnInit(): void {
  }
 checkValidity() {
   console.log(this.textFieldForm.valid);
 }

 deleteMe(i) {
   this.delete.emit(i);
 }
}
