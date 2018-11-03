
import { Component } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { DataService } from './_services/data.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Employee-Journal';
  current_user: {} = {}

  constructor(
    private userService: UserService,
    private dataService: DataService,
    private cookieService: CookieService) {}

  ngOnInit() {
    if(this.cookieService.get('wrs_session') != undefined && this.cookieService.get('wrs_session') != null && this.cookieService.get('wrs_session') != "") {
      this.getCurrentUser();
    }
  }

  getCurrentUser(): void {
    this.userService.getCurrentUser()
    .subscribe(user => {
      this.current_user = user;
      this.dataService.current_user = user;
    })
  }
}