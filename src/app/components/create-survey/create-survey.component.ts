import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { Student } from './student';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ClassRoster } from './ClassRoster';
import { MatListOption } from '@angular/material/list';
import { MatSelectionListChange } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSelectionList } from '@angular/material/list';




@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})

export class CreateSurveyComponent implements OnInit {

  emailArr = null;
  workSheet = null;
  nameArr = null;
  students = [];
  classForm = this.fb.group({ classRosterName: ['', Validators.required], });
  rosters: ClassRoster[] = [];
  inputValue;
// ============= DATA MEMBERS ============================================================================
   @ViewChild('studentList') studentList: MatSelectionList;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {}// end of constructor

  ngOnInit(): void {}// end of ngOnInit

/*========================================================================================================
===================== ON FILE CHANGE =====================================================================
========================================================================================================*/
onFileChange(ev) {
  const cellIndex = 'C2'; // this begins at cell C2 because that is the starting row of the students names
                        // the excel sheet is going to be in a desired format
  let workBook = null;

  const reader = new FileReader();
  const file = ev.target.files[0];

  reader.onload = (event) => {
    const data = reader.result;
    workBook = XLSX.read(data, { type: 'binary' });

    const firstSheetName = workBook.SheetNames[0];
    this.workSheet = workBook.Sheets[firstSheetName];
    console.log(this.workSheet);

    this.parseNameColumn(cellIndex);
    this.ParseEmailCell();
    this.FillClassRoster();

    }; // end of onload
  reader.readAsBinaryString(file);
  }// end of onFileChange

/*========================================================================================================
===================== INCREMENT CELL ROW  ================================================================
========================================================================================================*/
IncrementCellRow(cellIndex) {
  const count = cellIndex.match(/\d*$/);

  cellIndex = cellIndex.substr(0, count.index) + (++count[0]);
  return cellIndex;
  }// end of Increment Cell Row

/*========================================================================================================
===================== PARSE NAME COLUMN ==================================================================
========================================================================================================*/
parseNameColumn(cellIndex) {
  let numBlankSpaces = 0;
  let nameString;

  while (numBlankSpaces < 8) {
    if (this.workSheet[cellIndex] === undefined) {
      numBlankSpaces++;
    } else {
      const cell = this.workSheet[cellIndex];
      const cellData = (cell ? cell.v : undefined);

      nameString = nameString + '*' + cellData; // gives a separator for the names
      numBlankSpaces = 0;
    }
    cellIndex = this.IncrementCellRow(cellIndex);
  }

  this.nameArr = nameString.split('*'); // splits by the separator to get an array of the names
  this.nameArr.splice(0, 1); // removes the null element from the beginning
} // end of parse name column

/*========================================================================================================
===================== PARSE EMAIL CELL ===================================================================
========================================================================================================*/
ParseEmailCell() {
  const cell = this.workSheet['L1']; // the cell that the emails will be placed in
  const cellData = (cell ? cell.v : undefined); // gets the text data of the cell
  this.emailArr = cellData;
  this.emailArr = this.emailArr.split(',');
}// end of Parse Email Cell

/*========================================================================================================
===================== FILL CLASS ROSTER ==================================================================
========================================================================================================*/
FillClassRoster() {
  for (const i in this.emailArr) {
  this.students.push( (new Student(this.nameArr[i], this.emailArr[i])) );
    }
  }// end of fill class roster

/*========================================================================================================
===================== GET INPUT ==========================================================================
========================================================================================================*/
onKey(value: string) {
  this.inputValue = value;
}

/*========================================================================================================
==================== ON SUBMIT ===========================================================================
========================================================================================================*/
onSubmit() {
  console.log('submit');
  const nameAndEmailArr: string[] = [];

  for(const i in this.emailArr) {
    nameAndEmailArr.push(this.nameArr[i] + ':' + this.emailArr[i]);
    }

  this.rosters.push(new ClassRoster(this.inputValue, nameAndEmailArr));
  this.students = [];
  this.classForm.reset();
  }// end of on submit
/*========================================================================================================
==================== ON SUBMIT ===========================================================================
========================================================================================================*/
onGroupsChange(options: MatListOption[]) {
  console.log(options.map(o => o.value));
}// end of on groups CHANGE
/*========================================================================================================
==================== SELECT ALL ==========================================================================
========================================================================================================*/
selectAll() {
  this.studentList.selectAll();
}// end of select all
// =======================================================================================================
}// end of class
