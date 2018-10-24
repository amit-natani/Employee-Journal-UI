import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-worklog-mentoring',
  templateUrl: './worklog-mentoring.component.html',
  styleUrls: ['./worklog-mentoring.component.css']
})
export class WorklogMentoringComponent implements OnInit {

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
