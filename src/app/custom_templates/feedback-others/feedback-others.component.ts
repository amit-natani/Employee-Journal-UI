import { Component, OnInit, Input } from '@angular/core';
import { TagService } from 'src/app/_services/tag.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-feedback-others',
  templateUrl: './feedback-others.component.html',
  styleUrls: ['./feedback-others.component.scss']
})
export class FeedbackOthersComponent implements OnInit {

  users: object[];
  billingHeads: object[];
  @Input() data: any;

  constructor(private userService: UserService, private tagService: TagService) { }

  ngOnInit() {
    this.userService.getUsers()
    .subscribe(users => {
      this.users = users;
    })
    this.tagService.getBillingHeadList()
    .subscribe(billingHeads => {
      this.billingHeads = billingHeads;
    })
  }

}
