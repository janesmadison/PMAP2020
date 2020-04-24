import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFieldQuestionComponent } from './text-field-question.component';

describe('TextFieldQuestionComponent', () => {
  let component: TextFieldQuestionComponent;
  let fixture: ComponentFixture<TextFieldQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextFieldQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFieldQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
