import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackSelfComponent } from './feedback-self.component';

describe('FeedbackSelfComponent', () => {
  let component: FeedbackSelfComponent;
  let fixture: ComponentFixture<FeedbackSelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackSelfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackSelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
