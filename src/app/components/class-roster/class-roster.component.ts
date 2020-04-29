import { Component, OnInit } from '@angular/core';
import { ClassRoster } from '../../common.types';

@Component({
  selector: 'app-class-roster',
  templateUrl: './class-roster.component.html',
  styleUrls: ['./class-roster.component.css']
})
export class ClassRosterComponent implements OnInit {

  rosters: ClassRoster[] = [];
  constructor() { }

  ngOnInit(): void {
  this.getClassRosters();
  }

/*==============================================================================
======================== GET CLASS ROSTERS =====================================
==============================================================================*/
getClassRosters() {
  console.log('YO');
  // should some how be called when a new roster is submitted
  // gets the class rosters to display in the list
  }// end of get class rosters
}
