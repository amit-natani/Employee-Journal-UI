import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-worklog-mentoring',
  templateUrl: './worklog-mentoring.component.html',
  styleUrls: ['./worklog-mentoring.component.scss']
})
export class WorklogMentoringComponent implements OnInit {

  users: Observable<any>[];
  @Input() data: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    // this.userService.getUsers()
    // .subscribe(users => {
    //   this.users = users;
    // })
  }

  getUsers(query): void {
    this.userService.getUsersByName(query)
    .subscribe(users => {
      // this.users = users;
      this.users = users['employees']
    })
  }

}
