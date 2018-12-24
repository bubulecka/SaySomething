import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.css']
})
export class LogoutPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.doLogout().then((response) => {
      console.log("logged out. redirecting to login");
      this.router.navigate(['login']);
    }, (error) => {
      console.log("error while logging out");
      this.router.navigate(['']);
    });
  }

}
