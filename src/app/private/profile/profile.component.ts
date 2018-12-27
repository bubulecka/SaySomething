import { Component, OnInit } from '@angular/core';

import { ProfileToken } from './profile-token'
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  private profile: ProfileToken;
  
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.profile = this.authService.getCachedProfile();
  }

}
