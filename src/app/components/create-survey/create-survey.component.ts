import { Component, OnInit, EventEmitter } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Student } from './student';
import { Survey, Question } from '../../services/survey';
import * as XLSX from 'xlsx';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit {

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  surveyForm: FormGroup;
  questionArr: string[] = [];


  ngOnInit() {
    this.surveyForm = this.fb.group({
      title: []
    });
  }

  // this function will push another question that the user inputs into the array
  addQuestion(questionType) {
  this.questionArr.push(questionType);
  console.log(questionType);
  }

  deleteQuestion(i: number) {
  this.questionArr.splice(i);
  }

  isTextFieldQuestion(index) {
  if (this.questionArr[index].includes('textFieldQuestion')) {
    return true;
    } else {
    return false;
    }
  }

  isTwoButtonQuestion(index) {
  if (this.questionArr[index] === 'twoButtonQuestion') {
    return true;
    } else {
    return false;
    }
  }

  isThreeButtonQuestion(index) {
  if (this.questionArr[index] === 'threeButtonQuestion') {
    return true;
    } else {
    return false;
    }
  }

  isFourButtonQuestion(index) {
  if (this.questionArr[index] === 'fourButtonQuestion') {
    return true;
    } else {
    return false;
    }
  }

  isFiveButtonQuestion(index) {
  if (this.questionArr[index] === 'fiveButtonQuestion') {
    return true;
    } else {
    return false;
    }
  }

  isSliderQuestion(index) {
  if (this.questionArr[index] === 'sliderQuestion') {
    return true;
    } else {
    return false;
    }
  }

  onFileChange(ev) {
  let workBook = null;
  let jsonData = null;

  const reader = new FileReader();
  const file = ev.target.files[0];

  reader.onload = (event) => {
    const data = reader.result;
    workBook = XLSX.read(data, { type: 'binary' });
    jsonData = workBook.SheetNames.reduce((initial, name) => {
      const sheet = workBook.Sheets[name];
      this.workSheet = workBook.Sheets[name];
      initial[name] = XLSX.utils.sheet_to_json(sheet);
      return initial;
    }, {}); // end of .reduce

    const dataString = JSON.stringify(jsonData);
    // document.getElementById('output').innerHTML = dataString.slice(0, 30000).concat('...');


    // this.IncrementCellRow(this.cellIndex);
    // console.log(this.cellIndex);
    this.parseNameColumn();
    this.ParseEmailCell();
    this.FillClassRoster();

    if (this.workSheet['C12'] === undefined) { console.log('undef'); }
    this.ParseEmailCell();
  }; // end of onload
  reader.readAsBinaryString(file);
  }// end of onFileChange

  IncrementCellColumn(cellIndex) {
}// end of Incrememnt Cell Column

IncrementCellRow(cellIndex) {
console.log(this.cellIndex);
const count = cellIndex.match(/\d*$/);

this.cellIndex = this.cellIndex.substr(0, count.index) + (++count[0]);
console.log(this.cellIndex);
}// end of Increment Cell Row

parseNameColumn() {
var numBlankSpaces = 0;

while (numBlankSpaces < 8) {
  console.log(this.workSheet[this.cellIndex]);
  if (this.workSheet[this.cellIndex] === undefined) {
    numBlankSpaces++;
  } else {
    var cell = this.workSheet[this.cellIndex];
    var cellData = (cell ? cell.v : undefined);
    console.log('place the names in the queue ' + cellData );
    console.log(cellData);
    this.nameArr = this.nameArr + '*' + cellData; // gives a separator for the names
    console.log(this.nameArr);
    numBlankSpaces = 0;
  }
  this.IncrementCellRow(this.cellIndex);
}

this.nameArr = this.nameArr.split('*'); // splits by the separator to get an array of the names
this.nameArr.splice(0, 1);
console.log(this.nameArr);
}

ParseEmailCell() {
var cell = this.workSheet['L1'];
var cellData = (cell ? cell.v : undefined);
this.emailArr = cellData;
this.emailArr = this.emailArr.split(',');
console.log(this.emailArr);
// now add these to a class that has names and emails and concatenate them to display in the list card
}// Parse Email Cell

FillClassRoster() {
  for (let i in this.nameArr) {
  this.students.push(new Student(this.nameArr[i], this.emailArr[i]));
  }
}


}
