import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklogCsrComponent } from './worklog-csr.component';

describe('WorklogCsrComponent', () => {
  let component: WorklogCsrComponent;
  let fixture: ComponentFixture<WorklogCsrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorklogCsrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorklogCsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
