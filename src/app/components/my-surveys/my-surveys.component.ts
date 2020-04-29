import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ClassRoster } from '../../common.types';

@Component({
  selector: 'app-my-surveys',
  templateUrl: './my-surveys.component.html',
  styleUrls: ['./my-surveys.component.css']
})
export class MySurveysComponent implements OnInit {
surveyIds = [];
selectedValue: string;
selectedRoster: string;

rosters: ClassRoster[] = [];
  constructor() { }

  ngOnInit(): void {
    this.getClassRosters();
  }
/*==============================================================================
=========================== GET SURVEY NAMES ===================================
==============================================================================*/
// =======
// ====================== GET CLASS ROSTERS =======================================
// ==============================================================================*/
getClassRosters() {
  this.rosters.push(ClassRoster.fromJson({
    className: 'test name',
    students: ['name', 'name2', 'name3']
  }
  ));
  }// end of get class rosters
/*==============================================================================
====================== DELETE ROSTER ===========================================
==============================================================================*/
deleteRoster(index) {
  console.log('DELETE');
  this.rosters.splice(index, 1);
  }// end of delete roster
}
