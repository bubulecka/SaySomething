import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsByToken } from './posts-by-token';
import { PostsControlService } from '../../services/posts-control-service/posts-control.service';

@Component({
  selector: 'app-posts-by',
  templateUrl: './posts-by.component.html',
  styleUrls: ['./posts-by.component.css']
})
export class PostsByComponent implements OnInit {
  
  posts: PostsByToken;

  constructor(
    private postsService: PostsControlService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((ps) => { this.getPostsBy(ps['id']) });
  }

  getPostsBy(id: string) {
    this.postsService.getPostsBy(id).then((results) => { 
      // username exists (posts may not) so show feed
      if (results.response==true) {
        this.posts = results;
      }
      // bad request or no such username
      // enables the Back button to (un)load empty view
      else {
        this.router.navigate([''], {replaceUrl: true});
      }
    }, (error)=>{console.log("getPostsBy: "+error.getText)});
  }
}
