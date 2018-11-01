import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-worklog-colleague-support',
  templateUrl: './worklog-colleague-support.component.html',
  styleUrls: ['./worklog-colleague-support.component.scss']
})
export class WorklogColleagueSupportComponent implements OnInit {

  users: object[]
  @Input() data: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers()
    .subscribe(users => {
      this.users = users;
    })
  }

}
