import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklogMentoringComponent } from './worklog-mentoring.component';

describe('WorklogMentoringComponent', () => {
  let component: WorklogMentoringComponent;
  let fixture: ComponentFixture<WorklogMentoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorklogMentoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorklogMentoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
