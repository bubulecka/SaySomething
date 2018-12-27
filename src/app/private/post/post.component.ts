import { Component, OnInit } from '@angular/core';
import { PostsControlService } from '../../services/posts-control-service/posts-control.service';
import { PostsToken } from '../../services/posts-control-service/posts-token';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts = [];
  endmessage: string;
  message: string;
  lastpost: number;

  constructor(private postsService: PostsControlService) { }

  ngOnInit() {
    this.message = "";
    this.endmessage = "Load more...";
    this.lastpost = -1;
    this.postsService.addedPostObject.subscribe( (post) => {  let p = post as PostsToken; this.posts.unshift(p.data[0]); });
    this.getPublicPosts();
  }

  getPublicPosts() {
    this.postsService.getPublicPosts().then(
      (response) => {
        this.posts = response.data;
        if (response.data.length > 0) this.lastpost = response.data[response.data.length-1].post_id;
      }, (error) => { console.log("getPublicPosts problem " + error.statusText)})
  }

  loadMore() {
    if (this.lastpost < 1) return;

    this.postsService.getMorePublicPosts(this.lastpost).then(
      (response) => {
        //this.posts = this.posts.concat(response.data);
        Array.prototype.push.apply(this.posts, response.data);
        if (response.data.length > 0) {
          this.lastpost = response.data[response.data.length-1].post_id;
        }
        else { 
          this.lastpost = -1; // prevents fetching
          this.endmessage = "That's all folks!";
        }
      }, (error) => { console.log("getMorePublicPosts problem " + error.statusText)})
  }
}
