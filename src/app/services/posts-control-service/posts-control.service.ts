import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { PostsToken } from "./posts-token";
import { PostsByToken } from '../../private/posts-by/posts-by-token';
import { AuthService } from '../../auth/auth.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsControlService {

  addedPostObject = new Subject();

  constructor(private http: HttpClient, private authService: AuthService) { }

  emitNewPost(post: PostsToken) {
    if (post.response==true) this.addedPostObject.next(post);
  }

  getPublicPosts() : Promise<PostsToken> {

    let promise = new Promise<PostsToken>( (resolve,  reject) => 
    {
        this.http.get('http://localhost/backend-demo/posts_view.php', {withCredentials: true})
        .toPromise()
        .then( (response) => {
          resolve(response as PostsToken)
        }, (error) => { reject(error); })
        .catch((e: HttpErrorResponse) => {reject("Something went wrong")})
    })

    return promise;
  }

  getMorePublicPosts(from: number) : Promise<PostsToken> {

    let promise = new Promise<PostsToken>( (resolve,  reject) => 
    {
        this.http.get('http://localhost/backend-demo/posts_view.php?from='+from, {withCredentials: true})
        .toPromise()
        .then( (response) => {
          resolve(response as PostsToken)
        }, (error) => { reject(error); })
        .catch((e: HttpErrorResponse) => {reject("Something went wrong")})
    })

    return promise;
  }

  getPostsBy(query: string) : Promise<PostsByToken> {
    
    let promise = new Promise<PostsByToken>( (resolve,  reject) => 
    {
        this.http.get('http://localhost/backend-demo/posts_view_by.php?u='+query, {withCredentials: true})
        .toPromise()
        .then( (response) => {
          resolve(response as PostsByToken)
        }, (error) => { reject(error); })
        .catch((e: HttpErrorResponse) => {reject("Something went wrong")})
    })

    return promise;
  }
  
  createNewPost(content: string) {

    // prep request
    let body = new FormData();
    body.append("username", this.authService.getUsername());
    body.append("content", content);

    this.http.post('http://localhost/backend-demo/posts_add.php', body, {withCredentials: true})
    .toPromise()
    .then(
      (response) => {
        this.emitNewPost(response as PostsToken);
      }, (error) => {})
      .catch((e: HttpErrorResponse) => {})
  }

}
