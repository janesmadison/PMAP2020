import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { Student } from './student';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})

export class CreateSurveyComponent implements OnInit {
  emailList = 'Before';
  testNum = 0;
  emailArr = null;
  cellIndex = 'C2';
  workSheet = null;
  nameArr = null;
  students = [];
  constructor(private route: ActivatedRoute) {}// end of constructor

  ngOnInit(): void {}// end of ngOnInit
/*========================================================================================================
===================== ON FILE CHANGE =====================================================================
========================================================================================================*/
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
/*========================================================================================================
===================== INCREMENT CELL COLUMN  =============================================================
========================================================================================================*/
IncrementCellColumn(cellIndex) {
}// end of Incrememnt Cell Column
/*========================================================================================================
===================== INCREMENT CELL ROW  ================================================================
========================================================================================================*/
IncrementCellRow(cellIndex) {
console.log(this.cellIndex);
const count = cellIndex.match(/\d*$/);

this.cellIndex = this.cellIndex.substr(0, count.index) + (++count[0]);
console.log(this.cellIndex);
}// end of Increment Cell Row
/*========================================================================================================
===================== PARSE NAME COLUMN ==================================================================
========================================================================================================*/
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
/*========================================================================================================
===================== PARSE EMAIL CELL ===================================================================
========================================================================================================*/
ParseEmailCell() {
var cell = this.workSheet['L1'];
var cellData = (cell ? cell.v : undefined);
this.emailArr = cellData;
this.emailArr = this.emailArr.split(',');
console.log(this.emailArr);
// now add these to a class that has names and emails and concatenate them to display in the list card
}// Parse Email Cell
/*========================================================================================================
===================== FILL CLASS ROSTER ==================================================================
========================================================================================================*/
FillClassRoster() {
  for (let i in this.nameArr) {
  this.students.push(new Student(this.nameArr[i], this.emailArr[i]));
  }
}
}// end of class
