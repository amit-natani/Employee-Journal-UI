import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { DateService } from 'src/app/_services/date.service';

@Component({
  selector: 'app-worklog-colleague-support',
  templateUrl: './worklog-colleague-support.component.html',
  styleUrls: ['./worklog-colleague-support.component.scss']
})
export class WorklogColleagueSupportComponent implements OnInit {

  users: object[]
  @Input() data: any;

  constructor(
    private userService: UserService,
    private dateService: DateService
  ) { }

  ngOnInit() {
    // this.userService.getUsers()
    // .subscribe(users => {
    //   this.users = users;
    // })
    this.data.worklog_date = this.dateService.getCurrentDate();
  }

  getUsers(query): void {
    this.userService.getUsersByName(query)
    .subscribe(users => {
      // this.users = users;
      this.users = users.employees
    })
  }

}
