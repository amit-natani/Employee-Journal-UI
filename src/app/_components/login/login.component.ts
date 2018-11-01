import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: String = null;

  redirect_uri = environment.REDIRECT_URI;

  constructor(
    private http: HttpClient,
    private oauthService: OAuthService) { }

  ngOnInit() {
  }

  login(): void {
    console.log("-----", this.oauthService)
    this.oauthService.initImplicitFlow('',{'email': this.email});
    // this.oauthService.loadDiscoveryDocument(this.oauthService.issuer).then(() => {

    //   // This method just tries to parse the token(s) within the url when
    //   // the auth-server redirects the user back to the web-app
    //   // It dosn't send the user the the login page
    //   this.oauthService.tryLogin({});

    // });
    // window.location.href = `http://dev-accounts.agilestructure.in/sessions/new?state=${this.redirect_uri}&email=${this.email}`;
  }

}
