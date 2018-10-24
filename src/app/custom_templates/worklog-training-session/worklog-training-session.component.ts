import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-worklog-training-session',
  templateUrl: './worklog-training-session.component.html',
  styleUrls: ['./worklog-training-session.component.css']
})
export class WorklogTrainingSessionComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
