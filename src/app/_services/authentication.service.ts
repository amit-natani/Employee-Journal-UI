import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private cookieService: CookieService,
    private router: Router) { }

  login(access_token): void {
    this.cookieService.set('wrs_session', access_token)
  }

  logout(): void {
    this.cookieService.delete('wrs_session');
    this.router.navigate(['']);
  }
}
