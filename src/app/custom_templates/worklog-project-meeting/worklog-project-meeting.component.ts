import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TagService } from 'src/app/_services/tag.service';

@Component({
  selector: 'app-worklog-project-meeting',
  templateUrl: './worklog-project-meeting.component.html',
  styleUrls: ['./worklog-project-meeting.component.scss']
})
export class WorklogProjectMeetingComponent implements OnInit {

  billingHeads: object[]
  @Input() data: any;
  @Output() valueChange = new EventEmitter();

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.tagService.getBillingHeadList()
    .subscribe(billingHeads => {
      this.billingHeads = billingHeads;
    })
  }

  onSelect() {
    this.valueChange.emit(this.data.billing_head);
  }

}
