import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-worklog-self-learning',
  templateUrl: './worklog-self-learning.component.html',
  styleUrls: ['./worklog-self-learning.component.css']
})
export class WorklogSelfLearningComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
