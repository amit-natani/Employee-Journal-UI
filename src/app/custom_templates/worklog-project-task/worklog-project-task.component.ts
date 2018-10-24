import { Component, OnInit, Input } from '@angular/core';
import { TagService } from 'src/app/_services/tag.service';

@Component({
  selector: 'app-worklog-project-task',
  templateUrl: './worklog-project-task.component.html',
  styleUrls: ['./worklog-project-task.component.css']
})
export class WorklogProjectTaskComponent implements OnInit {
  
  @Input() data: any;

  billingHeads: object[];

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.tagService.getBillingHeadList()
    .subscribe(billingHeads => {
      this.billingHeads = billingHeads;
    })
  }

}
