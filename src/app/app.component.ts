
import { Component } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { DataService } from './_services/data.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './_config/auth.config';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Employee-Journal';
  current_location = "worklogs";
  current_user: {} = {}

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private dataService: DataService,
    private oauthService: OAuthService) {
      this.configureWithNewConfigApi();
      // this.oauthService.loadDiscoveryDocument(this.oauthService.issuer).then(() => {

      //   // This method just tries to parse the token(s) within the url when
      //   // the auth-server redirects the user back to the web-app
      //   // It dosn't send the user the the login page
      //   this.oauthService.tryLogin({});
  
      // });
    }

  ngOnInit() {
    this.getCurrentUser();
  }

  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    // this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    // this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  changeRoute(loc): void {
    this.current_location = loc;
  }
 
  logout(): void {
    this.oauthService.logOut();
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