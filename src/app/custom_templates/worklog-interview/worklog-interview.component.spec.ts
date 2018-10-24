import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklogInterviewComponent } from './worklog-interview.component';

describe('WorklogInterviewComponentComponent', () => {
  let component: WorklogInterviewComponent;
  let fixture: ComponentFixture<WorklogInterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorklogInterviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorklogInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
