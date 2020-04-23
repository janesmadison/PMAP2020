import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})

export class CreateSurveyComponent implements OnInit {

// ============= DATA MEMBERS ============================================================================
   @ViewChild('studentList') studentList: MatSelectionList;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private http: HttpClient) {}// end of constructor

  ngOnInit(): void {
  }// end of ngOnInit
}// end of class
