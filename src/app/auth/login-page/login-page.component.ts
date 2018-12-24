import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  username: string = "";
  password: string = "";
  show: boolean = false; 
  message: string = "";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // if logged in, skip this page
    if (this.authService.getLoggedInState()) this.router.navigate(['']);
  }

  check() {
    // for now only accept usernames in [a-zA-Z] range
    if (this.username=="" || /\s/.test(this.username) || this.username.length<4 || this.username.length>12) {
      this.message = "Invalid username";
    }
    else if (this.password=="" || this.password.length<4 || this.password.length>12) {
      this.message = "Invalid password";
    }
    else {
      $('#login-btn').prop("disabled",true);
      this.attemptLogin();
    }
  }

  attemptLogin() {
    this.message = "Logging in...";
    this.authService.doLogin(this.username, this.password)
    .then((response) => {
            $('#login-btn').prop("disabled",false);
            if (response.auth == true) this.router.navigate(['']);
            else this.message = response.message; 
    }, (error) => {
            $('#login-btn').prop("disabled",false);
            this.message = "Something went wrong, try again.";
    });
  }
}
