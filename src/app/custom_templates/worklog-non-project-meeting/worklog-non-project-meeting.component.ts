import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-worklog-non-project-meeting',
  templateUrl: './worklog-non-project-meeting.component.html',
  styleUrls: ['./worklog-non-project-meeting.component.scss']
})
export class WorklogNonProjectMeetingComponent implements OnInit {

  @Input() data: any;
  
  constructor() { }

  ngOnInit() {
  }

}
