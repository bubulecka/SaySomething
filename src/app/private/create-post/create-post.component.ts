import { Component, OnInit } from '@angular/core';
import { PostsControlService } from '../../services/posts-control-service/posts-control.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  newpost: string = "";

  constructor(private postsService: PostsControlService) { }

  ngOnInit() {
  }

  check() {
    if (this.newpost.length<1 && this.newpost.length>255) return;
    this.postsService.createNewPost(this.newpost);
    this.newpost="";
  }

}
