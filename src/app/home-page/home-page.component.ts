import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { SpaceService } from "../services/space-service/space.service";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  media: string = "";
  mediaUrl: SafeResourceUrl = "";
  mediaTitle: string = "";

  constructor(
    private authService: AuthService, 
    private spaceService: SpaceService,
    private domSanitizer: DomSanitizer,
    private router: Router
    ) { }

  ngOnInit() {
    if (this.authService.getLoggedInState()) this.router.navigate([''], {replaceUrl:true});
    else this.setUpSpace();
  }
  
  setUpSpace() {
    this.spaceService.getSpaceData()
    .then((token) => {
      this.media = token.media_type;
      this.mediaUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(token.url);
      this.mediaTitle = token.title;
    })
  }

}
