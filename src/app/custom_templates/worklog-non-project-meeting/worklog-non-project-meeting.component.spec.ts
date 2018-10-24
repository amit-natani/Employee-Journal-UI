import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklogNonProjectMeetingComponent } from './worklog-non-project-meeting.component';

describe('WorklogNonProjectMeetingComponent', () => {
  let component: WorklogNonProjectMeetingComponent;
  let fixture: ComponentFixture<WorklogNonProjectMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorklogNonProjectMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorklogNonProjectMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
