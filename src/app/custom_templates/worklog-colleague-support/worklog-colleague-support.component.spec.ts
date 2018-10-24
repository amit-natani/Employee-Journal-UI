import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklogColleagueSupportComponent } from './worklog-colleague-support.component';

describe('WorklogColleagueSupportComponent', () => {
  let component: WorklogColleagueSupportComponent;
  let fixture: ComponentFixture<WorklogColleagueSupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorklogColleagueSupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorklogColleagueSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
