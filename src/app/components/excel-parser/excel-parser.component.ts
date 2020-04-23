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
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-excel-parser',
  templateUrl: './excel-parser.component.html',
  styleUrls: ['./excel-parser.component.css']
})
export class ExcelParserComponent implements OnInit {

  emailArr = null;
  workSheet = null;
  nameArr = null;
  students = [];
  classForm = this.fb.group({ classRosterName: ['', Validators.required], });
  rosters: ClassRoster[] = [];
  inputValue;
  baseUrl = 'http://localhost/';                                                // base URL of the php script

  email: string;
  name: string;
// ============= DATA MEMBERS ============================================================================
   @ViewChild('studentList') studentList: MatSelectionList;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private http: HttpClient) {}// end of constructor

  ngOnInit(): void {
  }// end of ngOnInit
/*========================================================================================================
===================== ON FILE CHANGE =====================================================================
========================================================================================================*/
onFileChange(ev) {
  const cellIndex = 'C2'; // this begins at cell C2 because that is the starting row of the student name
                                                                                // the excel sheet is going to be in a desired format
  let workBook = null;

  const reader = new FileReader();
  const file = ev.target.files[0];

  reader.onload = (event) => {
    const data = reader.result;                                                 // gets the raw data from the excel file
    workBook = XLSX.read(data, { type: 'binary' });

    const firstSheetName = workBook.SheetNames[0];                              // gets the first sheets name from the workbook
    this.workSheet = workBook.Sheets[firstSheetName];                           // gets the workSheet data from the sheet studentName

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
// increments the cellIndex by it's row value
  const count = cellIndex.match(/\d*$/);                                        // finds the first numeric value in the string

  cellIndex = cellIndex.substr(0, count.index) + (++count[0]);                  // incremnts new value and replaces old value
  return cellIndex;
  }// end of Increment Cell Row
/*========================================================================================================
===================== PARSE NAME COLUMN ==================================================================
========================================================================================================*/
parseNameColumn(cellIndex) {
  let numBlankSpaces = 0;
  let nameString;

  while (numBlankSpaces < 8) {                                                  // if you run into 8 or more blanks in a row
                                                                                // then there's no more data to parse
    if (this.workSheet[cellIndex] === undefined) {                              // checks if the cells are empty
      numBlankSpaces++;
    } else {
      const cell = this.workSheet[cellIndex];
      const cellData = (cell ? cell.v : undefined);

      nameString = nameString + '*' + cellData;                                 // gives a separator for the names
      numBlankSpaces = 0;
    }
    cellIndex = this.IncrementCellRow(cellIndex);
  }

  this.nameArr = nameString.split('*');                                         // splits by the separator to get an array of the names
  this.nameArr.splice(0, 1);                                                    // removes the null element from the beginning
} // end of parse name column
/*========================================================================================================
===================== PARSE EMAIL CELL ===================================================================
========================================================================================================*/
ParseEmailCell() {
  const cell = this.workSheet['L1'];                                            // the cell that the emails will be placed in
  const cellData = (cell ? cell.v : undefined);                                 // gets the text data of the cell
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
  this.inputValue = value;                                                      // keeps the input value of class name updated
}
/*========================================================================================================
==================== ON SUBMIT ===========================================================================
========================================================================================================*/
onSubmit(options: MatListOption[]) {
  this.students = [];

// sets the students array based off of the selected values in the list
  for (const i in options.map(o => o.value)) {
  this.students.push(new Student( options.map(o => o.value.name)[i], options.map(o => o.value.email)[i] ) );

  this.postClassRoster(options.map(o => o.value.name)[i], options.map(o => o.value.email)[i]);
  }
                                                                                /* NOTE: options.map(o => o.value)
                                                                                gets the value from the selected options
                                                                                of the mat selection list
                                                                                */
  this.rosters.push(new ClassRoster(this.inputValue, this.students));


  this.students = [];                                                           // resets array of students and class form
  this.classForm.reset();
  }// end of on submit
/*========================================================================================================
==================== SELECT ALL ==========================================================================
========================================================================================================*/
selectAll() {
  this.studentList.selectAll();                                                 // sets all options in the mat selection list to selected
}// end of select all
/*========================================================================================================
==================== POST CLASS ROSTER ===================================================================
========================================================================================================*/
postClassRoster(studentEmail: string, studentName: string) {

  let postVars = {                                                              // places name and email values in JSON format for the post
    email : studentEmail,
    name : studentName
  };

  this.http.post(this.baseUrl + 'backendMailer.php', postVars).subscribe((data) => {
                                                                                // posts the data to the url which the php app is hosted
    console.log('Got some data from backend', data);
  }, (error) => {                                                               // gets the errors from the php app
    console.log('Error! ', error);
  });
}// end of post class roster
/*========================================================================================================
==================== POST CLASS ROSTER ===================================================================
========================================================================================================*/
readClassRoster(): Observable<Student[]> {
  return this.http.get<Student[]>(this.baseUrl + 'backendRosterRetriever.php');
  // calls the php app that gets and returns all of the rosters from the database
}
// =======================================================================================================
}// end of class