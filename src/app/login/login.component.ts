import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private email: String = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  login(): void {
    window.location.href = `http://dev-accounts.agilestructure.in/sessions/new?state=eyAnc2l0ZV91cmwnOiAnaHR0cDovL2xvY2FsaG9zdD-o0MjAwL2Rhc2hib2FyZCd9&email=${this.email}`;
  }

}
