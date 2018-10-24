import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklogProjectTaskComponent } from './worklog-project-task.component';

describe('WorklogProjectTaskComponent', () => {
  let component: WorklogProjectTaskComponent;
  let fixture: ComponentFixture<WorklogProjectTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorklogProjectTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorklogProjectTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
