
import { Component } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { DataService } from './_services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Employee-Journal';
  current_location = "worklogs";
  current_user: {} = {}

  constructor(private authenticationService: AuthenticationService,
    private userService: UserService,
    private dataService: DataService) {}

  ngOnInit() {
    this.getCurrentUser();
  }

  changeRoute(loc): void {
    this.current_location = loc;
  }
 
  logout(): void {
    this.authenticationService.logout();
  }

  getCurrentUser(): void {
    this.userService.getCurrentUser()
    .subscribe(user => {
      this.current_user = user;
      this.dataService.current_user = user;
    })
  }
}