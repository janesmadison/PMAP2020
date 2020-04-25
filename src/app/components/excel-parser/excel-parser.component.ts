import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatListOption } from '@angular/material/list';
import { MatSelectionListChange } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSelectionList } from '@angular/material/list';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailService } from '../../services/email.service';
import { User, ClassRoster } from '../../common.types';


@Component({
  selector: 'app-excel-parser',
  templateUrl: './excel-parser.component.html',
  styleUrls: ['./excel-parser.component.css']
})
export class ExcelParserComponent implements OnInit {

  emailArr = [];
  workSheet = null;
  nameArr = [];
  students = [];
  classForm = this.fb.group({ classRosterName: ['', Validators.required], });
  rosters: ClassRoster[] = [];
  inputValue;
  cellIndexNumber = 1;
  groupArr = [];
  baseUrl = 'http://localhost:8080';                                                // base URL of the php script

  email: string;
  name: string;
// ============= DATA MEMBERS ============================================================================
   @ViewChild('studentList') studentList: MatSelectionList;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private http: HttpClient,
              private emailService: EmailService) {}// end of constructor

  ngOnInit(): void {
  }// end of ngOnInit
/*========================================================================================================
===================== ON FILE CHANGE =====================================================================
========================================================================================================*/
onFileChange(ev) {
  const cellIndex = 'A1';
                                                                                // the excel sheet is going to be in a desired format
  let workBook = null;

  const reader = new FileReader();
  const file = ev.target.files[0];

  reader.onload = (event) => {
    const data = reader.result;                                                 // gets the raw data from the excel file
    workBook = XLSX.read(data, { type: 'binary' });

    const firstSheetName = workBook.SheetNames[0];                              // gets the first sheets name from the workbook
    this.workSheet = workBook.Sheets[firstSheetName];                           // gets the workSheet data from the sheet studentName

    this.parseExcelFile(cellIndex);
    this.fillClassRoster();
    this.cellIndexNumber = 1;
    }; // end of onload
  reader.readAsBinaryString(file);
  }// end of onFileChange
/*========================================================================================================
===================== INCREMENT CELL ROW  ================================================================
========================================================================================================*/
incrementCellRow(cellIndex) {
  const cellIndexLetter = cellIndex.charAt(0);
  this.cellIndexNumber = this.cellIndexNumber + 1;
  cellIndex = cellIndexLetter + this.cellIndexNumber;
  return cellIndex;
  }// end of Increment Cell Row
/*========================================================================================================
===================== INCREMENT CELL COLUMN ==============================================================
========================================================================================================*/
incrementCellColumn(cellIndex) {
  return cellIndex = (String.fromCharCode(cellIndex.charCodeAt(0) + 1) + this.cellIndexNumber);
  }// end of Increment cell column
/*========================================================================================================
===================================== DECREMENT CELL COLUMN ==============================================
========================================================================================================*/
decrementCellColumn(cellIndex) {
  return cellIndex = (String.fromCharCode(cellIndex.charCodeAt(0) - 1) + this.cellIndexNumber);
} // end of decrement cell column
/*========================================================================================================
===================== FILL CLASS ROSTER ==================================================================
========================================================================================================*/
fillClassRoster() {
  for (const i in this.emailArr) {
    if (this.nameArr[i]) {
      this.students.push( (User.fromJson({
        name: this.nameArr[i],
        email: this.emailArr[i],
        type: 'standard'}
      ))
    );
    } else {
      this.students.push( (User.fromJson({
        name: 'Student',
        email: this.emailArr[i],
        type: 'standard'}
      ))
    );
    }
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
    if (i) {
      this.students.push(User.fromJson({
       name:  options.map(o => o.value.name)[i],
       email: options.map(o => o.value.email)[i],
       type: 'standard'
     }));
      this.postClassRoster(options.map(o => o.value.name)[i], options.map(o => o.value.email)[i], 'standard');
    }
  }
                                                                                /* NOTE: options.map(o => o.value)
                                                                                gets the value from the selected options
                                                                                of the mat selection list
                                                                                */
  this.rosters.push(ClassRoster.fromJson({
    className: this.inputValue,
    students: this.students
  }
  ));


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
postClassRoster(studentEmail: string, studentName: string, accType: string) {

  const postVars = {                                                            // places name and email values in JSON format for the post
    email : studentEmail,
    name : studentName,
    type : accType
  };

  this.emailService.sendEmail(postVars).subscribe(
  (str: string) => {
    if (str === 'error') {
      console.log('email failed to send');
    }
  });

}// end of post class roster

/*========================================================================================================
==================================== PARSE ROW ===========================================================
========================================================================================================*/
parseExcelFile(cellIndex) {
  let blankSpaceEncountered = false;
  let name;
  let cell;
  let cellData;
  cellIndex = this.locateEmailColumn(cellIndex);
  while (!blankSpaceEncountered) {

    if (this.workSheet[cellIndex] === undefined) {
      blankSpaceEncountered = true;
      } else {

      cell = this.workSheet[cellIndex];
      cellData = (cell ? cell.v : undefined);
      this.emailArr.push(cellData);                                             // gets the email from the cell

      cellIndex = this.decrementCellColumn(cellIndex);
      cellIndex = this.decrementCellColumn(cellIndex);                          // decrements to the first name column

      cell = this.workSheet[cellIndex];
      cellData = (cell ? cell.v : undefined);
      name = cellData;                                                          // name contains first name

      cellIndex = this.incrementCellColumn(cellIndex);                          // decrements to the last name column

      cell = this.workSheet[cellIndex];
      cellData = (cell ? cell.v : undefined);
      name = name + ' ' + cellData;
      this.nameArr.push(name);

      for (let i = 0; i < 5; i++) {                                             // moves to the column containing the groups
      cellIndex = this.incrementCellColumn(cellIndex);
      }

      cell = this.workSheet[cellIndex];
      cellData = (cell ? cell.v : undefined);
      this.groupArr.push(cellData);

      for (let i = 0; i < 4; i++) {                                             // resets the column position back to email column
      cellIndex  = this.decrementCellColumn(cellIndex);
      }
      cellIndex = this.incrementCellRow(cellIndex);                             // moves to the next row
      }// end of else
    }// end of while(!blankSpaceEncountered)
  }// end of parse Excel file
/*========================================================================================================
================================= LOCATE EMAIL COLUMN ====================================================
========================================================================================================*/
locateEmailColumn(cellIndex) {
  let emailFound = false;
  let cell;
  let cellData;
  const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  // regular expression for emails
  while (!emailFound) {
    cell = this.workSheet[cellIndex];
    cellData = (cell ? cell.v : undefined);
    if (regexp.test(cellData) ) {                                               // checks to see if the data in the cell is an email
      emailFound = true;
    } else {
      cellIndex = this.incrementCellColumn(cellIndex);
      }
    }// end of while
  return cellIndex;
  } // end of Locate email column
// =======================================================================================================
}// end of class
