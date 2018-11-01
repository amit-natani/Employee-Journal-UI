import { Component, OnInit, Input } from '@angular/core';
import { DynamicComponent } from 'src/app/dynamic-component';

@Component({
  selector: 'app-worklog-interview',
  templateUrl: './worklog-interview.component.html',
  styleUrls: ['./worklog-interview.component.scss']
})
export class WorklogInterviewComponent implements OnInit, DynamicComponent {

  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
