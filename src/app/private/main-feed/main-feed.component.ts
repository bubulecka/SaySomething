import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SearchUsersService } from '../../services/search-users-service/search-users.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.css']
})
export class MainFeedComponent implements OnInit {

  searchResults = [];
  partial = "";

  constructor(private searchService: SearchUsersService, private authService: AuthService) { }

  ngOnInit() {
  }

  check(event) {
    //only allow a-Z characters for now
    return (/[a-z]/i.test(event.key));
  }

  search() {
    if (this.partial.length<2) return;
    //if (/^[a-z]+$/i.test(this.partial))
    this.searchService.getUsernames(this.partial)
    .then((response) => {
      this.searchResults = response.data;
      console.log(JSON.stringify(response));
      //$('#searchinput').click();
    })
  }

  DoTheLogout() {
    this.authService.autoLogout();
  }
}
