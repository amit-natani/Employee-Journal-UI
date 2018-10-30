
import { Component } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Employee-Journal';
  current_location = "worklogs"

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
  }

  changeRoute(loc): void {
    this.current_location = loc;
  }
 
  logout(): void {
    this.authenticationService.logout();
  }
}