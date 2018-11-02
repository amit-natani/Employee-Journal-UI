import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: String = null;

  redirect_uri = environment.REDIRECT_URI;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  login(): void {
    // window.location.href = "http://localhost:8080/login?email=amit.natani%40metacube.com&client_id=222"
    window.location.href = `http://dev-accounts.agilestructure.in/sessions/new?state=${this.redirect_uri}&email=${this.email}`;
  }

}
