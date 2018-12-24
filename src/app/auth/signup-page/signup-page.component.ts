import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  error_message: string = "";
  button_message: string = "Next";
  ready: boolean = false;
  username: string = "";
  password: string = "";
  show: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // if logged in, skip this page
    if (this.authService.getLoggedInState()) this.router.navigate(['']);
  }

  check() {
      // for now only accept usernames in [a-zA-Z] range
      if (this.username=="" || /\s/.test(this.username) || this.username.length<4 || this.username.length>12) {
        this.error_message = "Invalid username";
      }
      else {
        // always check the username first
        this.authService.checkAvailableUsername(this.username)
        .then((value) => {
            this.error_message = "";
            this.button_message = "Register";
            //clear password for re-appearance
            if (this.ready == false)
            {
              this.password = "";
              this.ready = true;
            }

            //ready to register?
            if (this.password!=="")
            {
              //attempt to register
              this.authService.doRegister(this.username, this.password)
              .then((token) => {
                if (token.auth == true) {
                  //success
                  this.password = "";
                  this.router.navigate(['']);
                }
                else {
                  this.error_message = token.message;
                }
              }, (error) => {
                this.error_message = "Something went wrong, try again?"
              });
            }
        }, (error) => {
          console.log("hit the error");
            this.ready = false;
            this.button_message = "Next";
            this.error_message = error;
        });
      }
  }
}
