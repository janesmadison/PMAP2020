import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})



export class CreateSurveyComponent implements OnInit
{
  emailList = "Before"
  testNum = 0;
  regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  emailArr = null;

  constructor(private route: ActivatedRoute) {}//end of constructor

  ngOnInit(): void {}//end of ngOnInit
/*========================================================================================================
===================== ON FILE CHANGE =====================================================================
========================================================================================================*/
onFileChange(ev)
  {
  let workBook = null;
  let jsonData = null;
  const reader = new FileReader();
  const file = ev.target.files[0];
  reader.onload = (event) =>
  {
    const data = reader.result;
    workBook = XLSX.read(data, { type: 'binary' });
    jsonData = workBook.SheetNames.reduce((initial, name) =>
    {
      const sheet = workBook.Sheets[name];
      initial[name] = XLSX.utils.sheet_to_json(sheet);
      return initial;
    }, {});//end of .reduce
    const dataString = JSON.stringify(jsonData);
    document.getElementById('output').innerHTML = dataString.slice(0, 30000).concat("...");
    this.emailList = dataString;

    this.emailArr = this.emailList.split("\""); //splits the array into pieces


    this.testNum = this.emailArr.length;


  }//end of onload
  reader.readAsBinaryString(file);
  }//end of onFileChange

}//end of class
