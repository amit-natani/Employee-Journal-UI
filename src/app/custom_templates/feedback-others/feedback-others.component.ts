import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TagService } from 'src/app/_services/tag.service';
import { UserService } from 'src/app/_services/user.service';
import { DynamicComponent } from 'src/app/dynamic-component';

@Component({
  selector: 'app-feedback-others',
  templateUrl: './feedback-others.component.html',
  styleUrls: ['./feedback-others.component.scss']
})
export class FeedbackOthersComponent implements OnInit, DynamicComponent {

  users: object[];
  billingHeads: object[];
  @Input() data: any;

  constructor(
    private userService: UserService,
    private tagService: TagService
  ) { }

  ngOnInit() {
    if (this.data != undefined) {
      console.log(this.data)
      let data = this.data;
      this.data = {};
      this.data.billing_head = data.billing_head;
      this.data.related_to = data.taggedUsers;
      this.data.worklog_date = data.worklog_date;
    }
    this.tagService.getBillingHeadList()
    .subscribe(billingHeads => {
      this.billingHeads = billingHeads;
    })
  }

  getUsers(query): void {
    this.userService.getUsersByName(query)
    .subscribe(users => {
      this.users = users.employees
    })
  }
}
