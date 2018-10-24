import { Component, OnInit, Input } from '@angular/core';
import { TagService } from 'src/app/_services/tag.service';

@Component({
  selector: 'app-worklog-project-meeting',
  templateUrl: './worklog-project-meeting.component.html',
  styleUrls: ['./worklog-project-meeting.component.css']
})
export class WorklogProjectMeetingComponent implements OnInit {

  billingHeads: object[]
  @Input() data: any;

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.tagService.getBillingHeadList()
    .subscribe(billingHeads => {
      this.billingHeads = billingHeads;
    })
  }

}
